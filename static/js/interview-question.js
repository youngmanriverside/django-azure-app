$(document).ready(function() {
    // If anchor with id "play_question" is clicked, call text_to_speech function
    // with the text of inside div with id "question"
    var text = $('#question').text();
    $('#play_question').click(function() {
        text_to_speech(text);
    });
    
});


function evaluate_interview_question(question, user_answer) {

    url = 'https://wda-gemini-api.azurewebsites.net/interview_question';

    // Apply formData to send the data to the server
    var formData = new FormData();
    formData.append("question", question);
    formData.append("user_answer", user_answer);

    system_instructions = `
                Please evaluate the user's response to the question.
                Give analysis / evaluation / suggested_modification each in 50 words.
                Return the result in JSON format.
            `;
    formData.append("system_instructions", system_instructions);

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,
		contentType: false,
        success: function(data) {
            console.log(data);
            $('#interview_question_header').css('visibility', 'hidden');
            $('#interview_question_result').css('visibility', 'visible');

            $('#interview_question_analysis').css('visibility', 'visible');
            $('#interview_question_analysis').append('<h3 style="text-align: center;">' + "Analysis" + '</h3>');
			$('#interview_question_analysis').append('<p>' + data["analysis"] + '</p>');
            if (data["analysis"] == null) {
                $('#interview_question_analysis').append('<p>' + data["分析"] + '</p>');
            }

			$('#interview_question_evaluation').css('visibility', 'visible');
            $('#interview_question_evaluation').append('<h3 style="text-align: center;">' + "Evaluation" + '</h3>');
			$('#interview_question_evaluation').append('<p>' + data["evaluation"] + '</p>');
            if (data["evaluation"] == null) {
                $('#interview_question_evaluation').append('<p>' + data["評價"] + '</p>');
            }

			$('#interview_question_suggestion').css('visibility', 'visible');
            $('#interview_question_suggestion').append('<h3 style="text-align: center;">' + "Suggestion" + '</h3>');
			$('#interview_question_suggestion').append('<p>' + data["suggested_modification"] + '</p>');
            if (data["suggested_modification"] == null) {
                $('#interview_question_suggestion').append('<p>' + data["建議"] + '</p>');
            }
        },
        error: function(err) {
            console.error(err);
        },
    });
}