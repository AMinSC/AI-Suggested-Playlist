/** chatGPT에게 받은 노래 리스트를 기준으로 youtube video Id값을 제공. */
class Search {
    constructor() {
        this.videoIdList = []

        //YOUTUBE DATA API v3. Search
        //help for params : https://developers.google.com/youtube/v3/docs/search/list#--
        this.optionParams={
            q: '',
            part: "snippet",
            type: "video",
            maxResults: 1,
            order: "viewCount",
            regionCode: "KR",
            videoDuration: "medium",
            videoEmbeddable: "true",  // ture일 경우 퍼갈 수 있는 영상만 검색
        }
    }
    
    /**
     * 노래 리스트를 기준으로 youtubeDataV3 API를 활용하여, Search 후 video Id를 받아오는 함수
     * @param {Array} videoList - chatGPT에게 받은 질문중 노래 리스트만 받습니다.
     * @returns - youtubeDataV3 API를 활용하여, Search 후 video Id를 반환
     */
    async getVideoId(videoList) {
        this.videoIdList = []
        for (const i of videoList) {
            this.optionParams['q'] = i
            //한글을 검색어로 전달하기 위해선 url encoding 필요!
            this.optionParams.q = encodeURI(this.optionParams.q);
            let url="/.netlify/functions/youtube?";
            for(let option in this.optionParams){
                url += option + "=" + this.optionParams[option] + "&";
            }

            //url의마지막에 붙어있는 & 정리
            url = url.substr(0, url.length - 1);
            try {
                let response = await fetch(url);
                let data = await response.json();
                this.videoIdList.push(data.items[0].id.videoId);
            } catch (error) {
                console.log(error);
            }
        }
        return this.videoIdList;
    }
}

export default Search;
