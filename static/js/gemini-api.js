function sendChatQuery(userMessage, findType) {
    console.log("sendChatQuery called for " + findType);
    console.log(userMessage)

    var db_index = "";

    if (findType === "welfare") {
        db_index = "laborBenefit_index";
    } else if (findType === "courses") {
        db_index = "faiss_index";
    } else {
        console.log("Invalid findType");
        return;
    }

    formData = new FormData();
    formData.append("user_question", userMessage);
    formData.append("db_index", db_index);


    console.log(formData);

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
        
        // Display the result of welfare in div with id "ai-response-area" directly
        // if data["output_text"] is a string, if "\n" is in the string, split the string by "\n" and display each element in a new line
        if (findType === "welfare") {
            if (data["output_text"].includes("\n")) {
                var outputTexts = data["output_text"].split("\n");
                for (var i = 0; i < outputTexts.length; i++) {
                    var pElement = document.createElement("p");
                    pElement.textContent = outputTexts[i];
                    $("#ai-response-area").append(pElement);
                }
            } else {
                var pElement = document.createElement("p");
                pElement.textContent = data["output_text"];
                $("#ai-response-area").append(pElement);
            }
        } else if (findType === "courses") {
            // Display the result of courses in div with id "ai-response-area" directly
            // if data["output_text"] is a string, if "\n" is in the string, split the string by "\n" and display each element in a new line
            if (data["output_text"].includes("\n")) {
                var outputTexts = data["output_text"].split("\n");
                for (var i = 0; i < outputTexts.length; i++) {
                    var pElement = document.createElement("p");
                    pElement.textContent = outputTexts[i];
                    $("#ai-response-area").append(pElement);
                }
            } else {
                var pElement = document.createElement("p");
                pElement.textContent = data["output_text"];
                $("#ai-response-area").append(pElement);
            }
        }


    })
}
