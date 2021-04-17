import { validURL } from "./validURL";

function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('name').value;
    if (!validURL(formText)) {
        alert("please enter valid URL");
        return;
    } else {
        const formdata = new FormData();
        formdata.append("key", "9d87555e8faa41de323561e444471bfb");
        formdata.append("url", formText);
        formdata.append("lang", "en");  // 2-letter code, like en es fr ...

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
            .then(response => ({
                status: response.status,
                body: response.json()
            }))
            .then(({ status, body }) => {
                // console.log(status, body)
                return body;
            }).then((response) => {
                document.getElementById('results').innerHTML =
                    (response.subjectivity ? 'Score Tag: ' + response.score_tag + '<br>' : '') +
                    (response.subjectivity ? 'Agreement: ' + response.agreement + '<br>' : '') +
                    (response.subjectivity ? 'Subjectivity: ' + response.subjectivity + '<br>' : '') +
                    (response.subjectivity ? 'Confidence: ' + response.confidence + '<br>' : '') +
                    (response.subjectivity ? 'Irony: ' + response.irony + '<br>' : '');
                // document.getElementById('results').innerHTML += JSON.stringify(response);
                // console.log(response)
            })
            .catch(error => console.log('error', error));
    }

}
export { handleSubmit }
