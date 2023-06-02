import Gpt from './components/chatGPT.js'
import Search from './components/youtubeDataV3.js'
import { config } from './apikey.js'
import VedioPring from './components/youtubeIFramePlayer.js';

async function main() {
    const gptInstance = new Gpt(
        document.querySelector("form"),
        document.querySelector("input"),
        document.querySelector("ul")
        );
    await gptInstance.getAnswer()
    await console.log(gptInstance.getAnswer())
}


// new Search(
//         config.apikey,
//         document.querySelector("#vedioList")
//         )

main()