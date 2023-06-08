const querystring = require('querystring');

exports.handler = async function(event, context) {
    const API_KEY = process.env.API_KEY;
    let query = event.queryStringParameters;
    
    query.q = encodeURI(query.q)
    let queryString = querystring.stringify(query);
    const url = `https://youtube.googleapis.com/youtube/v3/search?${queryString}&key=${API_KEY}`;
    console.log(`youtube: ${url}`)

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
