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

        //한글을 검색어로 전달하기 위해선 url encoding 필요!
        this.optionParams.q = encodeURI(this.optionParams.q);
    }
    
    // Function that retrieves the video id after searching the list of songs recommended by ChatGPT
    async getVideoId(videoList) {
        this.videoIdList = []
        for (const i of videoList) {
            this.optionParams['q'] = i
            let url="/.netlify/functions/youtube?";
            for(let option in this.optionParams){
                url += option + "=" + this.optionParams[option] + "&";
            }

            //url의마지막에 붙어있는 & 정리
            url = url.substr(0, url.length - 1);

            try {
            let response = await fetch(url);
            let data = await response.json();
            console.log(`video id : ${data.items[0].id.videoId}`);
            this.videoIdList.push(data.items[0].id.videoId);
            } catch (error) {
            console.log(error);
            }
        }
        return this.videoIdList;
    }
}

export default Search;
