// Write jquery to select button with id 'mic' add event listener to it
// When the button is clicked, call the function toggleMic

let can_record = false;
let is_recording = false;

let recorder = null;

let chunks = [];


$(document).ready(function() {

	$('#mic').click(toggleMic);

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
		const blob = new Blob(chunks, { type: "audio/wav" });

		
		uploadBlob(blob);

		console.log(blob);
		console.log(typeof(blob));

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
	formData.append('audio', blob);

	console.log(formData);


	url = 'https://' + speech_region + '.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed'

	$.ajax({
		url: url,
		type: 'POST',
		crossDomain: true,
		headers: {
			'Ocp-Apim-Subscription-Key': speech_key,
		},
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data);
			$('#transcript').text(data.DisplayText);
		},
	});
}