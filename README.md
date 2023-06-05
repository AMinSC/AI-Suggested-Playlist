# AI-Suggested-Playlist
ormi assignment

## 진행 사항
- chatGPT api를 활용, chatGPT답변에서 노래 리스트만 추출하여 변수에 지정
- google YouTube Data API v3를 활용하여, 노래 리스트를 search한 뒤, videoId값을 구함(추후 videoId를 활용하여 play_list에 추가할 예정)
- google YouTube IFrame Player API를 활용하여, 앞에서 구한 videoId값으로 영상을 가져와서 웹페이지 지정된 위치에 player 만들기

## 구현해야할 사항
- GitHub Pages를 활용하여 배포할 경우에 youtube key를 노출하지 않으면서 문제없이 구동될 수 있도록 개선(Netlify)
- 새로운 play list 생성 후 videoId를 활용해서 각 노래 리스트를 play list에 추가
  - play list를 화면에 출력
  - play list 생성 및 영상 추가가 된다면 기존 player는 제거
- 홈페이지 꾸미기, chatGPT 질문Guide
- 코드 리펙토링