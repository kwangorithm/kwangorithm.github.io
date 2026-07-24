# kwangorithm.github.io

GitHub Pages 기반 개인 기술 포트폴리오입니다.  
밝은 **GitHub Light** 톤의 UI로 레이다 시스템, Defense AI, Radar-EO/IR 센서 융합, 전략형 R&D 이력을 한국어와 영어 두 버전으로 보여줍니다.

## 구조

```text
.
├── index.html
├── css/styles.css
├── js/main.js
├── data/
│   ├── linkedin-source.json
│   └── profile.js
├── scripts/
│   └── linkedin_to_profile.py
└── .github/
    └── ISSUE_TEMPLATE/
        ├── roadmap-task.md
        ├── weekly-review.md
        └── config.yml
```

## 배포

1. 이 저장소를 `kwangorithm.github.io` 이름으로 GitHub에 push
2. GitHub Pages를 `main` 브랜치 / root 로 설정
3. 잠시 후 `https://kwangorithm.github.io` 에서 확인

정적 파일만 사용하므로 별도 빌드가 필요 없습니다.

## 이력 업데이트 방식

원본 데이터는 `data/linkedin-source.json` 입니다.  
현재 스키마는 `languages.ko`와 `languages.en` 아래에 같은 섹션 구조를 두는 방식입니다.

LinkedIn 내용을 기준으로 이 파일을 수정한 뒤, 아래 명령으로 사이트용 데이터 파일을 다시 생성하면 됩니다.

```bash
python3 scripts/linkedin_to_profile.py
```

그러면 `data/profile.js` 가 갱신되고, 사이트는 그 데이터를 읽어 한국어/영어 전환 UI로 렌더링합니다.

## 수정 포인트

- 메인 문구: `data/linkedin-source.json > languages.[ko|en] > site`
- 내비게이션/섹션 문구: `data/linkedin-source.json > languages.[ko|en] > ui`
- 전문 영역: `data/linkedin-source.json > languages.[ko|en] > focusAreas`
- 로드맵: `data/linkedin-source.json > languages.[ko|en] > roadmap`
- 프로젝트: `data/linkedin-source.json > languages.[ko|en] > projects`
- 연구 주제: `data/linkedin-source.json > languages.[ko|en] > research`
- 경력/학력/수상: `data/linkedin-source.json > languages.[ko|en] > experience`, `education`, `awards`
- 논문/기술노트: `data/linkedin-source.json > languages.[ko|en] > publications`

## Roadmap 데이터 구조

`roadmap` 항목은 Defense Sensor Foundation Framework 로드맵을 데이터로 관리합니다.

- `vision` / `mission` / `northStar`: 상단 배너에 표시되는 세 문장
- `phases`: Phase 1~5 배열. 각 phase는 `id`(`phase-1`~`phase-5`), `period`, `title`, `goal`, `deliverables`, `completionCriteria`, `status`, `progress`(0~100)를 가짐
- `priorities2026`: 올해 우선순위 목록. `rank`, `title`, `status`
- `stopList`: 하지 않을 일 목록

`status` 값은 `"done" | "in-progress" | "todo"` 세 가지만 사용합니다.

`projects` / `research` / `publications` 항목에는 선택적으로 `"phase": "phase-1"` 같은 필드를 추가해 해당 Phase와 연결된 배지를 표시할 수 있습니다.

이슈 작업이 진행되어 Phase나 우선순위 상태가 바뀌면, `linkedin-source.json`의 `status`/`progress` 값을 직접 갱신한 뒤 `scripts/linkedin_to_profile.py`를 다시 실행하세요. 사이트는 GitHub API를 실시간으로 호출하지 않고, 이 데이터를 기준으로만 렌더링합니다.

## 이슈 관리

`.github/ISSUE_TEMPLATE/`에 두 가지 템플릿이 있습니다.

- **Roadmap Task**: 로드맵을 진행시키는 구체적인 작업 단위. Phase, 관련 컴포넌트(Encoder/Fusion/EDL/Dataset/Docs), 산출물, 완료 기준을 기록합니다. `roadmap`, `phase-N` 라벨이 자동으로 붙습니다.
- **Weekly Review**: 매주 Mission Review, Progress Dashboard(%), Next 3 Tasks, Stop List Review를 기록하는 템플릿입니다. `weekly-review` 라벨이 자동으로 붙습니다.

라벨은 별도로 미리 만들어두지 않았습니다. 템플릿으로 이슈를 처음 등록하면 GitHub가 필요한 라벨을 자동으로 생성합니다.

## 로컬 확인

파일을 바로 열어도 되지만, 가장 안정적인 확인은 간단한 로컬 서버입니다.

```bash
python3 -m http.server 8000
```

그 뒤 `http://localhost:8000` 에서 확인하면 됩니다.

## 추천 운영 방식

- LinkedIn은 경력과 공식 이력의 기준점으로 유지
- 이 저장소는 프로젝트 기여도, 연구 방향, 검증 가능한 링크를 더해 개인 자산으로 관리
- 한국어/영어 문구는 같은 구조로 함께 업데이트하여 국내외 협업자 모두에게 동일한 메시지를 전달
- 논문, 발표 자료, GitHub 저장소가 생기면 `projects` 와 `publications` 에 계속 추가
