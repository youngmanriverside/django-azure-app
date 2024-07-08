// Write jquery to select button with id 'mic' add event listener to it
// When the button is clicked, call the function toggleMic

let can_record = false;
let is_recording = false;

let recorder = null;

let chunks = [];


$(document).ready(function() {

	$('#mic-icon').click(toggleMic);

	playback = document.getElementsByClassName('playback')[0];

});

function setupAudio() {
	console.log('Setting up audio');
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices
			.getUserMedia({
				audio: true
			})
			.then(setupStream)
			.catch(err => {
				console.error(err);
			}
			);
	}
}

setupAudio();

function setupStream(stream) {
	console.log('Setting up stream');
	recorder = new MediaRecorder(stream);

	recorder.ondataavailable = e => {
		chunks.push(e.data);
	};

	recorder.onstop = e => {
		const blob = new Blob(chunks, { type: "audio/webm" });

		
		uploadBlob(blob);

		chunks = [];
		const audioURL = window.URL.createObjectURL(blob);
		playback.src = audioURL;

	};

	can_record = true;
}

function toggleMic() {
	if (!can_record) {
		console.log('Cannot record');
		return;
	}

	is_recording = !is_recording;

	if (is_recording) {
		recorder.start();
		console.log('Recording started');
	} else {
		recorder.stop();
		console.log('Recording stopped');
	}
}

function uploadBlob(blob) {
	const formData = new FormData();
	formData.append("audio_file", blob);

	const csrfToken = document
		.querySelector('meta[name="csrf-token"]')
		.getAttribute("content");

	// Send the blob to the django server with url /transcribe (same origin)
	url = '/transcribe/';

	$.ajax({
		url: url,
		type: 'POST',
		data: formData,
		headers: {
			"X-CSRFToken": csrfToken,
		},
		credentials: 'same-origin',
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data);
			$('#user-answer').css('visibility', 'visible');
			// Add a paragraph with the data['transcript'] to the div with id 'user-answer'
			$('#user-answer').append('<h2>' + "Your answer" + '</h2>');
			$('#user-answer').append('<p>' + data['transcript'] + '</p>');

			// Request Gemini api to evaluate the answer
			question = $('#interview_question').text();
			console.log(question);
			evaluate_result = evaluate_interview_question(question=question, user_answer=data['transcript'])

			console.log(evaluate_result);

			// Add content to the p with id 'interview_question_analysis', 'interview_question_evaluation', 'interview_question_suggestion'
			// $('#interview_question_analysis').text(evaluate_result['analysis']);
			// $('#interview_question_evaluation').text(evaluate_result['evaluation']);
			// $('#interview_question_suggestion').text(evaluate_result['suggestion']);
		},
		error: function(err) {
			console.error(err);
		},
	});

	// url = 'https://' + speech_region + '.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed'

	// $.ajax({
	// 	url: url,
	// 	type: 'POST',
	// 	crossDomain: true,
	// 	headers: {
	// 		'Ocp-Apim-Subscription-Key': speech_key,
	// 	},
	// 	data: formData,
	// 	processData: false,
	// 	contentType: false,
	// 	success: function(data) {
	// 		console.log(data);
	// 		$('#transcript').text(data.DisplayText);
	// 	},
	// });
}