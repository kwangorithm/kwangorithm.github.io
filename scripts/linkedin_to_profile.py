#!/usr/bin/env python3
"""Generate the site data file from a LinkedIn-derived JSON source."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


REQUIRED_TOP_LEVEL_KEYS = [
    "site",
    "metrics",
    "highlights",
    "focusAreas",
    "roadmap",
    "projects",
    "research",
    "experience",
    "education",
    "awards",
    "publications",
]

REQUIRED_SITE_KEYS = ["title", "owner", "headline", "email", "github", "linkedin"]


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_language_payload(payload: dict, label: str = "root") -> None:
    missing = [key for key in REQUIRED_TOP_LEVEL_KEYS if key not in payload]
    if missing:
        raise ValueError(f"{label}: missing required keys: {', '.join(missing)}")

    site = payload["site"]
    for key in REQUIRED_SITE_KEYS:
        if not site.get(key):
            raise ValueError(f"{label}: site.{key} is required")


def validate_payload(payload: dict) -> None:
    """Validate either the legacy single-language schema or the bilingual schema."""
    languages = payload.get("languages")
    if languages:
        if not isinstance(languages, dict):
            raise ValueError("languages must be an object keyed by language code")

        default_language = payload.get("defaultLanguage")
        if default_language and default_language not in languages:
            raise ValueError("defaultLanguage must match one of the languages keys")

        for language_code, language_payload in languages.items():
            validate_language_payload(language_payload, f"languages.{language_code}")
        return

    validate_language_payload(payload)


def write_profile(payload: dict, path: Path) -> None:
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    output = f"window.PORTFOLIO_PROFILE = {body};\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        handle.write(output)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert LinkedIn-derived source JSON into the portfolio data file."
    )
    parser.add_argument(
        "--input",
        default="data/linkedin-source.json",
        help="Path to the editable source JSON file.",
    )
    parser.add_argument(
        "--output",
        default="data/profile.js",
        help="Path to the generated JavaScript data file.",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    payload = load_json(input_path)
    validate_payload(payload)
    write_profile(payload, output_path)
    print(f"Generated {output_path} from {input_path}")


if __name__ == "__main__":
    main()
