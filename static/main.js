$(document).ready(function(){
    // 就促工具列表頁面, openai-button is clicked, call sendrequest function
    $("#openai-button").click(function(){
        var prompt = $("#openai-input").val();
        sendrequest(prompt);
    });

    // 聊天機器人頁面，機器人方的按鈕
    var buttons = [
        "我想找工作",
        "我想學AI",
    ];
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
    
    // Training keywords
    var training_keywords = ["訓練", "課程", "職訓", "我想學", "推薦我", "進修"];

    // Generate response from OpenAI
    // If userMessage contains a keyword from training_keywords, call getTrainingFinder function
    if (training_keywords.some(keyword => userMessage.includes(keyword))) {
        getTrainingFinder(userMessage);
    } else {
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