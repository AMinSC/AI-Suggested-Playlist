const axios = require('axios');
const querystring = require('querystring');

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
    
    const url = `https://youtube.googleapis.com/youtube/v3/search?q=${q}&part=${part}&key=${API_KEY}&type=${type}&maxResults=${maxResults}&order=${order}&regionCode=${regionCode}&videoDuration${videoDuration}&videoEmbeddable=${videoEmbeddable}`;

    try {
        const { data } = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching data from YouTube API:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from YouTube API' }),
        };
    }
    
}
