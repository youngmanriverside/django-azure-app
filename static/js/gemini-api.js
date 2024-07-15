function sendChatQuery(userMessage, findType) {
    console.log("sendChatQuery called for " + findType);


    formData = new FormData();
    formData.append("user_question", userMessage);
    formData.append("db_index", "faiss_index");

    $.ajax({
        url : "https://gcp-api-rag.azurewebsites.net/find_courses",
        crossDomain : true,
        type : 'POST',
        data : formData,
        contentType : false,
        processData : false,
    })
    .done(function(data) {
        console.log(data);
    })
}
