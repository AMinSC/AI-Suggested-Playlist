const axios = require('axios');
const querystring = require('querystring');

/**
 * youtubeDataV3 에서 제공받은 데이터를 기준으로 youtube api 요청
 * @returns youtube api로 부터 필요한 데이터(videoId) 값을 반환
 */
exports.handler = async function(event, context) {
    const API_KEY = process.env.API_KEY;
    // 쿼리 매개변수
    const q = event.queryStringParameters.q;
    const part = event.queryStringParameters.part;
    const type = event.queryStringParameters.type;
    const maxResults = event.queryStringParameters.maxResults;
    const order = event.queryStringParameters.order;
    const regionCode = event.queryStringParameters.regionCode;
    const videoDuration = event.queryStringParameters.videoDuration;
    const videoEmbeddable = event.queryStringParameters.videoEmbeddable;
    
    const url = `https://youtube.googleapis.com/youtube/v3/search?
                q=${q}&
                part=${part}&
                key=${API_KEY}&
                type=${type}&
                maxResults=${maxResults}&
                order=${order}&
                regionCode=${regionCode}&
                videoDuration=${videoDuration}&
                videoEmbeddable=${videoEmbeddable}`;

    try {
        const { data } = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching data from YouTube API:', error);
        return {  // Netlify log에서 error 체크
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from YouTube API' }),
        };
    }
    
}
