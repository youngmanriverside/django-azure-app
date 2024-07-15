function getOpenAiChat(userMessage) {
    console.log("getOpenAiChat");
    var url = "https://openai-wenshin.openai.azure.com/openai/deployments/wenshin-gpt-4o/chat/completions?api-version=2024-02-15-preview";
    var parameter = {
        "messages":[
            {
                "role": "system",
                "content": "你是一個幫助人們就業的機器人，語言模式為繁體中文"
            },
            {
                "role": "user",
                "content": userMessage
            }
        ],
        "max_tokens": 500,
        "temperature": 0.2,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "top_p": 0.95,
        "stop": null
    };

    // Send a POST request to the OpenAI API
    $.ajax({
        url: url,
        headers: {
            "Content-Type": "application/json",
            "api-key": API_KEY,
        },
        type: "POST",
        data: JSON.stringify(parameter),
    })

    // if success, replace createChatLi with response message
    .done(function(data) {
        console.log(data);
        $(".chatbox li:contains('思考中...')").replaceWith(createChatLi(data.choices[0].message.content, "incoming"));
        $(".chatbox").scrollTop($(".chatbox")[0].scrollHeight);
    })

    // if failed, show error message in chatbox and append error class to p under chat incoming
    .fail(function() {
        // Append error message to chatbox
        $(".chatbox li:contains('思考中...')").replaceWith(createChatLi("Oops! 出事啦", "incoming"));
        $(".chatbox").scrollTop($(".chatbox")[0].scrollHeight);
    });   
}
