/** 정해진 요소값 위치에 youtube player 생성 */
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

    /**
     * youtube player를 li 태그에 추가해주는 함수
     * @param {Element} $videoList - I Frame Player를 넣어줄 요소값
     * @param {Element} $li - 최소 2개 이상의 video를 등록해야하기 때문에, 유니크한 값을 요소값을 받습니다.
     * @param {string} videoId - 함수를 호출하는 곳에서 forof문을 사용하여 Array의 각 string(videoId)값을 받습니다.
     */
    printvideo ($videoList, $li, videoId) {
        $li.id = `player${this.videoIdCounter++}`;
        $videoList.appendChild($li);
    
        this.onYouTubeIframeAPIReady($li.id, videoId);
    };

    /**
     * 화면에 답변 youtube player 뿌려주는 함수
     * @param {string} liId - 유니크한 값을 받습니다.
     * @param {string} id - 호출한 함수에서 받은 값(videoId)을 그대로 받습니다.
     */
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
        if (this.videoIdCounter === 1) {  // 몇 번째 비디오를 실행시킬 것인지
            event.target.playVideo();
        }
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
