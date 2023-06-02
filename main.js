import Gpt from './components/chatGPT.js'

new Gpt(
    document.querySelector("form"),
    document.querySelector("input"),
    document.querySelector("ul")
    );