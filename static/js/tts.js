function text_to_speech(text) {
    if (!text) {
        text = "Hello, there is no text to speech.";
    }

    console.log(text);

    url = "https://wda-gemini-api.azurewebsites.net/texttospeech"

    formData = new FormData();
    formData.append("text", text);

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        Headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
    .done(function(url) {
        console.log("tts done!");
        var audio = new Audio(url);
        audio.play();
    })

}