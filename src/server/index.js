const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your API key is ${process.env.API_KEY}`);
const fetch = require('node-fetch');
var cors = require('cors')
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
const app = express()
const PORT = 8081
const API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
app.use(cors())
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/add-url', function (req, res) {
    console.log('*********************')
    console.log(req.body)
    console.log('*********************')

    let apiWithUrl = `${API_URL}?key=${process.env.API_KEY}&url=${req.body.url}&lang=en`

    console.log(apiWithUrl);

    fetch(apiWithUrl)
        .then(response => {
            return response.json()
        })
        .then(data => {
            res.send(data)
        })

    // res.json(mockAPIResponse);
})


// app.post('/add-url', async (req, res) => {
//     // try {


//     const formdata = new FormData();
//     formdata.append("key", "9d87555e8faa41de323561e444471bfb");
//     formdata.append("url", formText);
//     formdata.append("lang", "en");  // 2-letter code, like en es fr ...

//     const requestOptions = {
//         method: 'POST',
//         body: formdata,
//         redirect: 'follow'
//     };

//     const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
//         .then(response => ({
//             status: response.status,
//             body: response.json()
//         }))
//         .then(({ status, body }) => {
//             // console.log(status, body)
//             return body;
//         }).then((response) => {
//             document.getElementById('results').innerHTML =
//                 (response.subjectivity ? 'Score Tag: ' + response.score_tag + '<br>' : '') +
//                 (response.subjectivity ? 'Agreement: ' + response.agreement + '<br>' : '') +
//                 (response.subjectivity ? 'Subjectivity: ' + response.subjectivity + '<br>' : '') +
//                 (response.subjectivity ? 'Confidence: ' + response.confidence + '<br>' : '') +
//                 (response.subjectivity ? 'Irony: ' + response.irony + '<br>' : '');
//             // document.getElementById('results').innerHTML += JSON.stringify(response);
//             // console.log(response)
//         })
//         .catch(error => console.log('error', error));

//     // } catch (error) {

//     // }
// })
// You could call it aylienapi, or anything else
// var textapi = new aylien({
//     application_id: process.env.API_ID,
//     application_key: process.env.API_KEY
//  });
 