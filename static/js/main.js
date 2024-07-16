$(document).ready(function(){

    // tab to determine the chat mode
    var tab = "";

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
    // else if userMessage is not None and tab is "找職訓", call sendChatQuery with userMessage and "courses"
    if (!userMessage) {
        return;
    } else if (tab === "找職訓") {
        sendChatQuery(userMessage, "courses");
    } else {
        getOpenAiChat(userMessage);
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