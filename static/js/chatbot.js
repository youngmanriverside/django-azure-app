$(document).ready(function() {
    console.log("chatbot.js loaded");

    welcomeMessage();

    // Set chatbox url
    setChatMode();
    
    // If button with id "chat_welfare" is clicked, call function findWelfare
    $(".chatbox").on("click", "#chat_welfare", function() {
        findWelfare();
    });
    
});

function welcomeMessage() {
    // Welcome message "你好，請問需要什麼協助？"in chatbox
    var welcomeMessage = document.createElement("li");
    welcomeMessage.classList.add("chat");
    welcomeMessage.classList.add("incoming");
    var spanElement = document.createElement("span");
    spanElement.classList.add("material-symbols-outlined");
    spanElement.textContent = "robot_2";
    var pElement = document.createElement("p");
    pElement.textContent = "你好! 請問需要什麼協助?";

    welcomeMessage.appendChild(spanElement);
    welcomeMessage.appendChild(pElement);
    $(".chatbox").append(welcomeMessage);
}

function setChatMode(tab) {
    // Clear all buttons in chatbox
    $(".chatbox button").remove();

    // Clear all incoming and outgoing messages in chatbox
    $(".chatbox li").remove();

    welcomeMessage();

    // Defult tab for chatbox is "找補助" if no tab is given
    if (tab === undefined) {
        tab = "找補助";
    }
    var buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-secondary");
    buttonElement.id = "chat_welfare";
    buttonElement.textContent = "開始" + tab;
    $(".chatbox").append(buttonElement);
}

function findWelfare() {
    console.log("findWelfare called");
    // Clear all buttons in chatbox
    $(".chatbox button").remove();

    // Declare variables for finding welfare
    var user_info = {
        gender : "",
        age : "",
        current_status : "",
        unemployment_duration : "",
        identity : "",
    }

    // Create a list of questions to ask
    var questions = [
        "請問您的性別是?",
        "請問您的年齡是?",
        "請問您目前的狀況是?",
        "請問您待業多久了?",
        "請問您的身分是?"
    ];
    
    // Create a list of options for each question
    var options = [
        ["男", "女"],
        ["15-16", "16-18", "18-29", "30-44", "45-64", "65+"],
        ["失業尋職中", "參訓無工作", "自由工作者", "在職中", "已退休待業中", "學生"],
        ["0-14", "15-29", "30-89", "90-179", "180+"],
        ["無", "非自願離職", "中低收入戶", "身心障礙", "獨立負擔家計者", "原住民", "長期失業", "更生人", "家暴被害人", "二度就業婦女", "受災失業者", "性侵害被害人", "新住民"]
    ];

    // Ask questions and if options are clicked, assign the option value to user_info
    var questionIndex = 0;
    var optionIndex = 0;
    var questionElement = document.createElement("li");
    questionElement.classList.add("chat");
    questionElement.classList.add("incoming");
    var pElement = document.createElement("p");
    pElement.textContent = questions[questionIndex];
    questionElement.appendChild(pElement);
    $(".chatbox").append(questionElement);

    // Create options for each question
    for (var i = 0; i < options[questionIndex].length; i++) {
        var optionElement = document.createElement("li");
        optionElement.classList.add("chat");
        optionElement.classList.add("outgoing");
        var pElement = document.createElement("p");
        pElement.textContent = options[questionIndex][i];
        optionElement.appendChild(pElement);
        $(".chatbox").append(optionElement);
    }

    $(".chatbox").on("click", ".outgoing", function() {
        user_info[Object.keys(user_info)[questionIndex]] = $(this).text();
        questionIndex++;
        if (questionIndex < questions.length) {
            $(".chatbox li").remove();
            var questionElement = document.createElement("li");
            questionElement.classList.add("chat");
            questionElement.classList.add("incoming");
            var pElement = document.createElement("p");
            pElement.textContent = questions[questionIndex];
            questionElement.appendChild(pElement);
            $(".chatbox").append(questionElement);

            for (var i = 0; i < options[questionIndex].length; i++) {
                var optionElement = document.createElement("li");
                optionElement.classList.add("chat");
                optionElement.classList.add("outgoing");
                var pElement = document.createElement("p");
                pElement.textContent = options[questionIndex][i];
                optionElement.appendChild(pElement);
                $(".chatbox").append(optionElement);
            }
        } else {
            console.log(user_info);
            sendChatQuery(user_info, "welfare");
        }
    });

    

}