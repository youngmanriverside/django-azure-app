$(document).ready(function(){
    // if button with id openai-button is clicked, call sendrequest function
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

    $("#send-btn").click(function(){
        handleChat();
    });
});

function handleChat() {
    var userMessage = $(".chat-input textarea").val();
    // if userMessage is None, return
    if (!userMessage) {
        return;
    }
    // Append userMessage to chatbox
    $(".chatbox").append(createChatLi(userMessage, "outgoing"));
    
    // set timeout to display "Thinking..." message while waiting for the response
    setTimeout(function() {
        // Append "Thinking..." message to chatbox
        $(".chatbox").append(createChatLi("Thinking...", "incoming"));
    }, 500);
    // Execute a function when the user presses a key on the keyboard
    
    // Scroll to the bottom of the chatbox to show the latest message


    // Generate response from OpenAI
    generateResponse(userMessage);
}

function generateResponse(userMessage) {
    
    var url = "https://openai-wenshin.openai.azure.com/openai/deployments/wenshincompletion/chat/completions?api-version=2024-02-15-preview";
    var api = API_KEY;

    prompts_dict = {
        '公立就業服務機構': '請問公立就業服務機構是什麼？ 請列出幾個就業服務站',
        '婦女再就業計畫': '請問婦女再就業計畫是什麼？',
        '非自願離職': '請問非自願離職的定義是什麼？',
        '就業服務法24-1條': '就業服務法24-1條的內容是什麼？',
    }

    // if prompt is not in the prompts_dict, prompt will be the same as the input
    if (userMessage in prompts_dict) {
        userMessage = prompts_dict[userMessage];
    }   else {
        userMessage = userMessage;
    }

    var params = {
        "messages":[
            {
                "role": "system",
                "content": "你是一個熟悉臺灣法律規範的機器人，語言模式為繁體中文"
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
        // if success, show response message
        $(".chatbox").append(createChatLi(data.choices[0].message.content, "incoming"));
    })
    // if failed, show error message
    .fail(function() {
        $(".chatbox").append(createChatLi("Sorry, I couldn't get that. Please try again.", "incoming"));
    });
    
}

function createChatLi(message, className) {
    // Create a chat <li> element with passed message and className
    var chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    var chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

function sendrequest(prompt) {
    // set loader display to inline-block
    $(".loader").css("display", "inline-block");

    var url = "https://openai-wenshin.openai.azure.com/openai/deployments/wenshincompletion/chat/completions?api-version=2024-02-15-preview";
    var api = API_KEY;

    prompts_dict = {
        '公立就業服務機構': '請問公立就業服務機構是什麼？ 請列出幾個就業服務站',
        '婦女再就業計畫': '請問婦女再就業計畫是什麼？',
        '非自願離職': '請問非自願離職的定義是什麼？',
        '就業服務法24-1條': '就業服務法24-1條的內容是什麼？',
    }

    // if prompt is not in the prompts_dict, prompt will be the same as the input
    if (prompt in prompts_dict) {
        prompt = prompts_dict[prompt];
    }

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
        "max_tokens": 1000,
        "temperature": 0.2,
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