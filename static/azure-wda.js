function azureAiSearch(userMessage, indexName) {
    console.log("Azure AI Search");
    console.log(userMessage);
    console.log(indexName);
    $.ajax({
        url : "https://wda-azure-api.azurewebsites.net/trainingchat",
        crossDomain : true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        method : 'POST',
        contentType : 'application/json',
        data: JSON.stringify(
            {
                "userContent": userMessage,
                "indexName": indexName
            })
    }).done(function(response) {
        console.log(response)
        $(".chatbox li:contains('思考中...')").replaceWith(createChatLi(response, "incoming"));
        $(".chatbox").scrollTop($(".chatbox")[0].scrollHeight);
        $
    });
}