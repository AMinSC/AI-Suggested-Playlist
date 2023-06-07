class Search {
    constructor($videoList) {
        this.$videoList = $videoList;
        this.videoIdList = []
        }
    
        // Function that retrieves the video id after searching the list of songs recommended by ChatGPT
        async getVideoId($videoList) {
        for (const i of $videoList) {
            const url = `/.netlify/functions/youtube?q=${i}`;
    
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
