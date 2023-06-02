class VedioPring {
    constructor() {
        // youtube vedio 가져오는 함수
        this.tag = document.createElement('script');
        this.tag.src = "https://www.youtube.com/iframe_api";
        this.firstScriptTag = document.getElementsByTagName('script')[0];
        this.firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.done = false
    }

    // 화면에 답변 youtube player 뿌려주는 함수
    printVedio (vedioId) {
        let li = document.createElement("li");
        li.id = "player" + videoIdCounter++;
        $vedioList.appendChild(li);
    
        onYouTubeIframeAPIReady(li.id, vedioId);
    };

    onYouTubeIframeAPIReady(liId, id) {
        new YT.Player(liId, {
        height: '240',
        width: '360',
        videoId: id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
        });
    }

    onPlayerReady(event) {
        event.target.playVideo();
    }

    onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            this.done = true;
        }
    }

    stopVideo() {
    }
}

export default VedioPring
