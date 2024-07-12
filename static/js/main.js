$(document).ready(function(){

    // All the radio buttons are unchecked by default
    $("input[name='optradio']").prop("checked", false);

    // Either one of input with name optradio is checked, buttons will be reloaded
    $("input[name='optradio']").change(function(){
        var buttons = [];
        if ($("#training").prop("checked")) {
            buttons = [
                "我想學AI",
                "我想學平面設計",
                "我想學照顧服務",
            ];
        } else if ($("#benefit").prop("checked")) {
            buttons = [
                "我是失業青年",
                "我是二度就業婦女",
            ];
        } else if ($("#qanda").prop("checked")) {
            buttons = [
                "外籍人士可參加職訓?",
            ];
        }
        // if buttons is not empty, remove all buttons and append new buttons but remain the following
        // <li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span>
        // <p>你好! 請問需要什麼協助?</p></li>
        $(".chatbox").children().not(":first").remove();        
        buttons.forEach(function(button) {
            var buttonElement = document.createElement("button");
            buttonElement.classList.add("btn-secondary");
            buttonElement.textContent = button;
            $(".chatbox").append(buttonElement);
        }
        );

        $(".btn-secondary").click(function() {
            var userMessage = $(this).text();
            $(".chat-input textarea").val(userMessage);
            handleChat();
        });
    });

    // if button with id "ask-benefit" is clicked, collect user information and send user input to chatbot with radio button "benefit" checked
    $("#ask-benefit").click(function() {
        // Get example info from table cell with id "example-name", "example-current" and "example-identity"
        var exampleCurrent = $("#example-current").text();
        exampleCurrent = choices_current_dict[exampleCurrent];
        var exampleIdentity = $("#example-identity").text();
        exampleIdentity = choices_identity_dict[exampleIdentity];
        // if exampleIdentity not in choices_identity_dict, exampleIdentity = choices_24_1_dict[exampleIdentity]
        if (exampleIdentity === undefined) {
            exampleIdentity = choices_24_1_dict[$("#example-identity").text()];
        }
        var userMessage = "我目前就業狀態為" + exampleCurrent + "，" + "同時是" + exampleIdentity + "，" + "請問我可以申請什麼補助?";
        console.log(userMessage);
        $(".chat-input textarea").val(userMessage);
        $("#benefit").prop("checked", true);
        handleChat();
    });

    // 聊天機器人頁面，送出訊息鍵
    $("#send-btn").click(function(){
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
    

    index_names = {
        "training": "training-courses",
        "benefit": "labor-plan-original-30",
        "qanda": "wda-qa",
    }

    // Decide which function to call based on which button with class 'nav-item' is active
    if ($("#training").prop("checked")) {
        indexName = index_names["training"];
        azureAiSearch(userMessage, indexName);
    } else if ($("#benefit").prop("checked")) {
        indexName = index_names["benefit"];
        azureAiSearch(userMessage, indexName);
    } else if ($("#qanda").prop("checked")) {
        indexName = index_names["qanda"];
        azureAiSearch(userMessage, indexName);
    } else {
        // Call the getOpenAiChat function
        getOpenAiChat(userMessage);
    }
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