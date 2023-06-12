// Local Application Library
import Gpt from './chatGPT.js'
import Search from './youtubeDataV3.js'
import videoPlayer from './youtubeIFramePlayer.js';

// Loading Library
import { LoadingWithMask, closeLoadingWithMask } from './loading.js';


// DOM 요소(질문 가이드)
const $textField = document.querySelector(".place input[type='text']")
const $radioButtons = document.querySelectorAll("input[type='radio']")

// 인스턴스 변수 지정
const InstancePlayer = new videoPlayer()


// youtubeIFramePlayer에 YT가 완전히 호출되도록 해결하는 함수.
const ytReady = new Promise(function(resolve) {
    // 호출 시 Promise를 해결합니다.
    window.onYouTubeIframeAPIReady = function() {
        resolve();
    };
});

// HTML 문서가 전부 파싱되고, DOM 트리가 완성되었을 때 발생하는 이벤트
// 초기 스크립트 로딩에 주로 사용되며, 이 시점에서 DOM 요소에 접근하거나 이벤트 리스너를 등록하는 작업을 수행할 수 있음
window.addEventListener('DOMContentLoaded', (event) => {
    // DOM 요소를 변수에 지정
    const $input = document.querySelector("input")
    const $form = document.querySelector("form")
    const $videoList = document.querySelector("#videoList")


    // // GPT 질문 (목적)
    // if (!!$textField === flase) {
    //     $textField = '새벽에 듣기 좋은'
    // }
    

    // HTML 폼에서 submit 이벤트를 처리하는 코드
    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // 체크박스에서 선택된 값을 가져옵니다.
        const selectedYears = [];
        $radioButtons.forEach((radioButton) => {
            if (radioButton.checked) {
                selectedYears.push(radioButton.id);
            }
        });
        $input.value = null;
        LoadingWithMask('../asset/Infinity-0.8s-200px.gif');
        // GPT 질문 정의
        const question = `${selectedYears}에 인기있던 ${$textField}에 맞는 감성적인 팝송 리스트 추천 해줘`

        // GPT 인스턴스 변수 생성
        const InstanceGpt = new Gpt(document.querySelector("main > ul"), question)
        const answer = await InstanceGpt.apiPost();
        closeLoadingWithMask();
        console.log(answer);
        
        // 할당량 복구까지 아래 코드 주석, 로딩 체크(할당량)
        const InstanceSearch = new Search()
        const videoId = await InstanceSearch.getVideoId(answer);
        console.log(videoId)
        
        // videoId를 순회하며 플레이어 등록하기
        for (const i of videoId) {
            await ytReady;
            const $li = document.createElement("li");
            InstancePlayer.printvideo($videoList, $li, i)
        }
    })
});
