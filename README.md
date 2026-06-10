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
└── scripts/
    └── linkedin_to_profile.py
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
- 프로젝트: `data/linkedin-source.json > languages.[ko|en] > projects`
- 연구 주제: `data/linkedin-source.json > languages.[ko|en] > research`
- 경력/학력/수상: `data/linkedin-source.json > languages.[ko|en] > experience`, `education`, `awards`
- 논문/기술노트: `data/linkedin-source.json > languages.[ko|en] > publications`

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
