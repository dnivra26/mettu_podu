var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var stream;
var dataArray

var constraints = {
  audio: true,
  video: false
};

function start() {
	navigator.mediaDevices.getUserMedia(constraints)
	.then(handleSuccess)
    .catch(handleError);	
}

function handleSuccess(stream) {
	this.stream = stream;
  	var source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	this.dataArray = new Uint8Array(bufferLength);
	window.setInterval(print, 1000);
}

function print() {
	analyser.getByteFrequencyData(dataArray);
	console.log(dataArray);
}


function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}    
start();