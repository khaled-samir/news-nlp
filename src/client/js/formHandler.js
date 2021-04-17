import { validURL } from "./validURL";

function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('name').value;
    if (!validURL(formText)) {
        alert("Please enter valid URL");
        return;
    } else {
        // data to be sent to the POST request
        let _data = {
            url: formText
        }
        fetch('http://localhost:8081/add-url', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                if (data.status.msg !== "OK") {
                    alert(data.status.msg);
                }
                document.getElementById('results').innerHTML =
                    (data.subjectivity ? 'Score Tag: ' + data.score_tag + '<br>' : '') +
                    (data.subjectivity ? 'Agreement: ' + data.agreement + '<br>' : '') +
                    (data.subjectivity ? 'Subjectivity: ' + data.subjectivity + '<br>' : '') +
                    (data.subjectivity ? 'Confidence: ' + data.confidence + '<br>' : '') +
                    (data.subjectivity ? 'Irony: ' + data.irony + '<br>' : '');

            });


    }

}
export { handleSubmit }
