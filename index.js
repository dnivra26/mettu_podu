var constraints = {
  audio: true,
  video: false
};

navigator.mediaDevices.getUserMedia(constraints)
	.then(handleSuccess)
    .catch(handleError);

function handleSuccess(stream) {
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  	var analyser = audioCtx.createAnalyser();
  	var source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);
	analyser.getByteFrequencyData(dataArray);
	console.log(dataArray);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}    