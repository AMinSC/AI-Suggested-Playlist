import Gpt from './components/chatGPT.js'
import Search from './components/youtubeDataV3.js'
import { config } from './apikey.js'
import VedioPring from './components/youtubeIFramePlayer.js';

let $input;
let $form;
let InstanceGpt;
let answer;
let vedioId;
let vedioIdSearch;

let vedioIdKey = config.apikey;

window.addEventListener('DOMContentLoaded', (event) => {
    $input = document.querySelector("input")
    $form = document.querySelector("form")

    let question;

    $input.addEventListener("input", (e) => {
        question = e.target.value;
    });

    InstanceGpt = new Gpt(document.querySelector("ul"), question)

    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $input.value = null;
        answer = await InstanceGpt.apiPost();
        console.log(answer)
        
        vedioIdSearch = new Search(vedioIdKey, answer)
        vedioId = await vedioIdSearch.getVideoId();
        console.log(vedioId)
        
    })
});
