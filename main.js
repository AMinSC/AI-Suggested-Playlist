// Local Application Library
import Gpt from './components/chatGPT.js'
import Search from './components/youtubeDataV3.js'
import { config } from './apikey.js'
import videoPlayer from './components/youtubeIFramePlayer.js';

// DOM 요소를 변수에 지정
let $input;
let $form;
let $li
let $videoList

// 인터스턴스 변수
let InstanceGpt;
let InstanceSearch;
let InstancePlayer

// 각 인스턴스 변수에서 필요한 값을 지정할 변수
let answer;
let videoId;
let player;

// youtube key
let videoIdKey = config.apikey;

InstancePlayer = new videoPlayer()  // 전역 변수 테스트
// youtubeIFramePlayer에 YT가 완전히 호출되도록 해결하는 함수.
let ytReady = new Promise(function(resolve) {
    // 호출 시 Promise를 해결합니다.
    window.onYouTubeIframeAPIReady = function() {
        resolve();
    };
});

// HTML 문서가 전부 파싱되고, DOM 트리가 완성되었을 때 발생하는 이벤트
// 초기 스크립트 로딩에 주로 사용되며, 이 시점에서 DOM 요소에 접근하거나 이벤트 리스너를 등록하는 작업을 수행할 수 있음
window.addEventListener('DOMContentLoaded', (event) => {
    $input = document.querySelector("input")
    $form = document.querySelector("form")
    $videoList = document.querySelector("#videoList")
    $li = document.createElement("li")

    let question;

    // 질문을 chatGPT api에 전달하기 위한 기능
    $input.addEventListener("input", (e) => {
        question = e.target.value;
    });

    // GPT 인스턴스 변수 생성
    InstanceGpt = new Gpt(document.querySelector("ul"), question)

    // HTML 폼에서 submit 이벤트를 처리하는 코드
    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $input.value = null;
        answer = await InstanceGpt.apiPost();
        console.log(answer)
        
        InstanceSearch = new Search(videoIdKey, answer)
        videoId = await InstanceSearch.getVideoId();
        console.log(videoId)
        
        // videoId를 순회하며 플레이어 등록하기
        for (const i of videoId) {
            await ytReady;
            // InstancePlayer = new videoPlayer()  // 전역 변수로 이전 테스트
            let $li = document.createElement("li");
            player = InstancePlayer.printvideo($videoList, $li, i)
        }
    })
});
