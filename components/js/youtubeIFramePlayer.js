class videoPlayer {
    constructor() {
        // youtube video 가져오는 함수
        this.tag = document.createElement('script');
        this.tag.src = "https://www.youtube.com/iframe_api";
        this.firstScriptTag = document.getElementsByTagName('script')[0];
        this.firstScriptTag.parentNode.insertBefore(this.tag, this.firstScriptTag);

        this.videoIdCounter = 0;

        this.done = false

        this.onPlayerReady = this.onPlayerReady.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    // youtube player를 li 태그에 추가해주는 함수
    printvideo ($videoList, $li, videoId) {
        $li.id = "player" + this.videoIdCounter++;
        $videoList.appendChild($li);
    
        this.onYouTubeIframeAPIReady($li.id, videoId);
    };

    // 화면에 답변 youtube player 뿌려주는 함수
    onYouTubeIframeAPIReady(liId, id) {
        new YT.Player(liId, {
        height: '240',
        width: '360',
        videoId: id,
        events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange
        }
        });
    }

    onPlayerReady(event) {
        event.target.playVideo();
    }

    onPlayerStateChange(event) {
        if (event.data == this.YT.PlayerState.PLAYING && !this.done) {
            setTimeout(this.stopVideo, 6000);
            this.done = true;
        }
    }

    stopVideo() {
    }
}

export default videoPlayer
