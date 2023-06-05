// Local Application Library
import Gpt from './components/chatGPT.js'
import Search from './components/youtubeDataV3.js'
import { config } from './apikey.js'
import videoPlayer from './components/youtubeIFramePlayer.js';


// youtube key
let videoIdKey = config.apikey;

let InstancePlayer = new videoPlayer()  // 전역 변수 테스트
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
    // DOM 요소를 변수에 지정
    let $input = document.querySelector("input")
    let $form = document.querySelector("form")
    let $videoList = document.querySelector("#videoList")

    let question;

    // 질문을 chatGPT api에 전달하기 위한 기능
    $input.addEventListener("input", (e) => {
        question = e.target.value;
    });

    // GPT 인스턴스 변수 생성
    let InstanceGpt = new Gpt(document.querySelector("ul"), question)

    // HTML 폼에서 submit 이벤트를 처리하는 코드
    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $input.value = null;
        let answer = await InstanceGpt.apiPost();
        console.log(answer);
        
        // 할당량 복구까지 아래 코드 주석
        let InstanceSearch = new Search(videoIdKey, answer)
        let videoId = await InstanceSearch.getVideoId();
        console.log(videoId)
        
        // videoId를 순회하며 플레이어 등록하기
        for (const i of videoId) {
            await ytReady;
            // InstancePlayer = new videoPlayer()  // 전역 변수로 이전 테스트
            let $li = document.createElement("li");
            InstancePlayer.printvideo($videoList, $li, i)
        }
    })
});
