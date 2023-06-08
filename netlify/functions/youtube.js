const axios = require('axios');
const querystring = require('querystring');

exports.handler = async function(event, context) {
    const API_KEY = process.env.API_KEY;
    let query = event.queryStringParameters;
    
    query.q = encodeURI(query.q);
    let queryString = querystring.stringify(query);
    const url = `https://youtube.googleapis.com/youtube/v3/search?${queryString}&key=${API_KEY}`;
    console.log(`youtube: ${url}`);

    try {
        console.log(`Requesting: ${url}`);
        const { data } = await axios.get(url);
        console.log(`Received data: ${JSON.stringify(data, null, 2)}`);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(`Error: ${error}`);
        return {
            statusCode: 500,
            body: error.toString(),
        };
    }
};
