function getTrainingFinder(userMessage) {
    $.ajax({
        url : "https://wda-azure-api.azurewebsites.net/trainingfinder",
        crossDomain : true,
        method : 'POST',
        contentType : 'application/json',
        data: JSON.stringify(
            {
                'userContent': userMessage
            })
    }).done(function(response) {
        console.log(response["response"]);
        $(".chatbox li:contains('思考中...')").replaceWith(createChatLi(response["response"], "incoming"));
        $(".chatbox").scrollTop($(".chatbox")[0].scrollHeight);
        $
    });
}