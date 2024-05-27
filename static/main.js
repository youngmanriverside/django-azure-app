$(document).ready(function(){
    $("#openai-button").click(function(){
        var prompt = $("#openai-input").val();
        sendrequest(prompt);
    });
    // if button with class btn-secondary is clicked, call sendrequest function
    $(".btn-secondary").click(function(){
        var prompt = $(this).text();
        sendrequest(prompt);
    });
    // if anchor with class wda-link is clicked, call sendrequest function
    $(".wda-link").click(function(){
        console.log("wda-link clicked");
        var prompt = $(this).text();
        sendrequest(prompt);
    });
});

function sendrequest(prompt) {
    // set loader display to inline-block
    $(".loader").css("display", "inline-block");

    var url = "https://openai-wenshin.openai.azure.com/openai/deployments/wenshincompletion/chat/completions?api-version=2024-02-15-preview";
    var api = API_KEY;

    prompts_dict = {
        '公立就業服務機構': '請問公立就業服務機構是什麼？ 請列出幾個就業服務站',
        '婦女再就業計畫': '請問婦女再就業計畫是什麼？',
        '非自願離職': '請問非自願離職的定義是什麼？',
    }

    prompt = prompts_dict[prompt];

    var params = {
        "messages":[
            {
                "role": "system",
                "content": "你是一個熟悉臺灣法律規範的機器人，語言模式為繁體中文"
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "max_tokens": 200,
        "temperature": 0.7,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "top_p": 0.95,
        "stop": null
    };
    $.ajax({
        url: url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("api-key", api);
        },
        type: "POST",
        data: JSON.stringify(params),
    })
    .done(function(data) {
        // show message content in the TextArea
        $("#openai-text").val(data.choices[0].message.content);
        // Let loader disappear
        $(".loader").css("display", "none");
    })
};