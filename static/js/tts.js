function text_to_speech(text) {
    console.log("text_to_speech")
    if (!text) {
        text = "Hello, azure app service!";
    }
    url = "https://wda-gemini-api.azurewebsites.net/texttospeech"

    formData = new FormData();
    formData.append("text", text);

    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        credentials: 'same-origin',

    })
    .done(function(data) {
        console.log(data);
        
        const blob = new Blob([data], { type: 'audio/mpeg' });
        const audioUrl = window.URL.createObjectURL(blob);
        
        console.log(audioUrl);

        const audio = new Audio(audioUrl);
        audio.play();
    })
}