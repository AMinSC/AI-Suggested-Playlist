const axios = require('axios');

exports.handler = async function(event, context) {
    const API_KEY = process.env.API_KEY;
    const query = event.queryStringParameters.q;
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;

    try {
        const { data } = await axios.get(url);
        return {
        statusCode: 200,
        body: JSON.stringify(data),
        };
    } catch (error) {
        return {
        statusCode: 500,
        body: error.toString(),
        };
    }
};
