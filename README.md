# AI-Suggested-Playlist

## 서비스 목적
- 무슨 노래를 들어야 될지 모를 때, AI가 추천해주는 노래를 간편하게 YouTube로 플레이 리스트 만들어 주는 서비스
- 최종 서비스는 개인 유튜브 계정에 플레이 리스트 생성하기
  - 위 서비스를 제공하기 위해선 Google OAuth 2.0을 접목해야되고, 접목하는 과정에서 Node.js 코드 필요
- 1차 제공 서비스는 AI가 추천해주는 노래 리스트를 유튜브 플레이어만 제공

## 서비스 웹 페이지 주소 및 연관 Repository
- ~[서비스이동](https://majestic-salamander-540c1f.netlify.app)~ GPT API 사용 중지
- YouTube API 할당량이 모두 소진되었을 경우, `매일 16:20 경 초기화`


- [Share-songs-suggested-by-AI](https://github.com/AMinSC/Share-songs-suggested-by-AI)
    - 서비스 배포 Frond-end
    - HTMl, CSS, JavaScript
- [S3A1](https://github.com/AMinSC/S3A1)
    - 서비스 배포 Back-end
    - Django
    - AWS Lightsail
        - Nginx
        - uWSGI



## 폴더 트리
```
├─asset
├─src
│  ├─css
│  └─js
└─netlify
    └─functions
```

## 진행 사항
- ChatGPT API를 활용, ChatGPT답변에서 노래 리스트만 추출하여 변수에 지정
- Google YouTube Data API v3를 활용하여, 노래 리스트를 Search한 뒤, videoId값을 구함(추후 videoId를 활용하여 Play list에 추가할 예정)
- Google YouTube IFrame Player API를 활용하여, 앞에서 구한 videoId값으로 영상을 가져와서 웹페이지 지정된 위치에 Player 만들기
- ChatGPT 비동기 통신중 로딩 화면 구현
- API key를 노출시키지 않고 안전하게 배포하기 위해 Netlify 서비스 활용

## 구현해야할 사항
- 새로운 Play list 생성 후 videoId를 활용해서 각 노래 리스트를 Play list에 추가
  - Play list를 화면에 출력
  - Play list 생성 및 영상 추가가 된다면 기존 player는 제거
- 홈페이지 꾸미기
- 로딩 화면 구현했으나, 질문을 2회 이상 할 경우, 기존 답변에서 지속 로딩 화면 노출 이슈
- 할당량 개선(할당량을 높이거나 최적화)
