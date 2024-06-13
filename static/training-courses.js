function find_training_courses() {
    var endpoint = "openai-wenshin.openai.azure.com";

    // curl 'https://${endpoint}/openai/assistants?api-version=2024-02-15-preview' \
    // -H 'api-key: YOUR_API_KEY' \
    // -H 'Content-Type: application/json' \
    // -d '{
    // "instructions": "請根據使用者的訊息，從training_courses.csv，找出相關的課程，介紹並提供連結",
    // "name": "training_courses_finder",
    // "tools": [
    //     {
    //     "type": "code_interpreter"
    //     }
    // ],
    // "model": "wenshin-gpt-4o"
    // }'

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
        })
    });
}