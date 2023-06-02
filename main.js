import Gpt from './components/chatGPT.js'
import Search from './components/youtubeDataV3.js'
import { config } from './apikey.js'
import VedioPring from './components/youtubeIFramePlayer.js';

function trigger() {
    e.preventDefault();
    const gptInstance = new Gpt(
        document.querySelector("form"),
        document.querySelector("input"),
        document.querySelector("ul")
        );
    };
