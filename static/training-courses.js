function find_training_courses() {
    var endpoint = "openai-wenshin.openai.azure.com";
    var thread_id = "";
    var message = "我想學烹飪";

    // First request to setup an assistant
    var url = `https://${endpoint}/openai/assistants?api-version=2024-02-15-preview`;
    var parameter = {
        "instructions": "請根據使用者的訊息，從training_courses.csv，找出相關的課程，介紹並提供連結",
        "name": "training_courses_finder",
        "tools": [
            {
            "type": "code_interpreter"
            }
        ],
        "model": "wenshin-gpt-4o"
    };

    $.ajax({
        url: url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("api-key", API_KEY);
        },
        type: "GET",
        data: JSON.stringify(parameter),
    })
    // if success, print response in json in textarea with id "test-textarea"
    .done(function(data) {
        $("#test-textarea").val(JSON.stringify(data, null, 2));
    })
    // Second request to run the assistant
    // Run the thread
    .done(function(data) {
        var url = `https://${endpoint}/openai/threads?api-version=2024-02-15-preview`;

        $.ajax({
            url: url,
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("api-key", API_KEY);
            },
            type: "POST",
        })
        // if success, print response in json in textarea with id "test-textarea"
        .done(function(data) {
            $("#test-textarea").val(JSON.stringify(data, null, 2));
            thread_id = data["id"];
            user_question(thread_id);
        })
    });
}

function user_question(thread_id) {
    const endpoint = "openai-wenshin.openai.azure.com";
    var url = `https://${endpoint}/openai/threads/${thread_id}/messages?api-version=2024-02-15-preview`;
    
    var message = "我想學烹飪";
    
    var parameter = {
        "role": "user",
        "content": message
    };

    $.ajax({
        url: url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("api-key", API_KEY);
        },
        type: "POST",
        data: JSON.stringify(parameter),
    })
    // if success, print response in json in textarea with id "test-textarea"
    .done(function(data) {
        console.log(data);
        $("#test-textarea").val(JSON.stringify(data, null, 2));
        answer_question(thread_id);
    })
}

function answer_question(thread_id) {
    const endpoint = "openai-wenshin.openai.azure.com";
    var url = `https://${endpoint}/openai/threads/${thread_id}/runs?api-version=2024-02-15-preview`;

    parameter = {
        "assistant_id": "asst_xdpLb6YW9y83IYN2vA9B0yLc",
    }

    $.ajax({
        url: url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("api-key", API_KEY);
        },
        type: "POST",
        data: JSON.stringify(parameter),
    })
    // if success, print response in json in textarea with id "test-textarea"
    .done(function(data) {
        console.log(data);
        $("#test-textarea").val(JSON.stringify(data, null, 2));
        assistant_response(thread_id);
    })
}

function assistant_response(thread_id) {
    const endpoint = "openai-wenshin.openai.azure.com";
    var url = `https://${endpoint}/openai/threads/${thread_id}/messages?api-version=2024-02-15-preview`;



    $.ajax({
        url: url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("api-key", API_KEY);
        },
        type: "GET",
    })
    // if success, print response in json in textarea with id "test-textarea"
    .done(function(data) {
        console.log(data);
        $("#test-textarea").val(JSON.stringify(data, null, 2));
    })
}