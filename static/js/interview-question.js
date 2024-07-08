$(document).ready(function() {

    
});


function evaluate_interview_question(question, user_answer) {

    url = 'https://wda-gemini-api.azurewebsites.net/interview_question';

    // Apply formData to send the data to the server
    var formData = new FormData();
    formData.append("question", question);
    formData.append("user_answer", user_answer);

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,
		contentType: false,
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.error(err);
        },
    });
}