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

    // Put some buttons inside chatbox at the bottom
    var buttons = [
        "我想找工作",
        "我想找職訓課程",
    ];
    buttons.forEach(function(button) {
        var buttonElement = document.createElement("button");
        buttonElement.classList.add("btn-secondary");
        buttonElement.textContent = button;
        $(".chatbox").append(buttonElement);
    }
    );
    
    // Mimic user chat-input when buttons with class btn-secondary are clicked
    $(".btn-secondary").click(function() {
        var userMessage = $(this).text();
        $(".chat-input textarea").val(userMessage);
        handleChat();
    });

    // Enable TextArea to re-size automatically
    $(".chat-input textarea").on("input", function() {
        // this.style.height = "auto";
        // this.style.height = (this.scrollHeight) + "px";
    });

    // Execute a function when the user presses a key on the keyboard
    $(".chat-input textarea").keydown(function(e) {
        // if the key is Enter, call handleChat function
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });
});

function handleChat() {
    var userMessage = $(".chat-input textarea").val();
    // if userMessage is None, return
    if (!userMessage) {
        return;
    }    

    // Clear the textarea after sending the message
    $(".chat-input textarea").val("");

    // Resize the chat input textarea to its original height
    // $(".chat-input textarea").css("height", "auto");

    // Append userMessage to chatbox
    $(".chatbox").append(createChatLi(userMessage, "outgoing"));
    
    // Auto scroll to the bottom of the chatbox if the chatbox is overflowed
    $(".chatbox").scrollTop($(".chatbox")[0].scrollHeight);

    // set timeout to display "思考中..." message while waiting for the response
    setTimeout(function() {
        // Append "思考中..." message to chatbox
        $(".chatbox").append(createChatLi("思考中...", "incoming"));
        $(".chatbox").scrollTop($(".chatbox")[0].scrollHeight);
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
    $.ajax({
        url: url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("api-key", api);
        },
        type: "POST",
        data: JSON.stringify(params),
    })
    // if success, replace createChatLi with response message
    .done(function(data) {
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

function createChatLi(message, className) {
    // Create a chat <li> element with passed message and className
    var chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    var chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;

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
                "content": "你是一個幫助人們就業的機器人，語言模式為繁體中文"
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