var context, source, sourceJs, analyser, buffer, boost = 0,
	tracks = [
		'Out_of_My_League.mp3', // 0
		'the_walker.m4a', 		// 1
		'safe_and_sound.mp3', 	// 2
		'rather_be.mp3', 		// 3
		'pray_to_god.mp3', 		// 4
	],
	url = './audio/' + tracks[1],
	array = new Array();

try {
	context = new AudioContext();
}
catch(e) {
	alert("Web Audio API is not supported in this browser");
}

var request = new XMLHttpRequest();
request.open('GET', url, true);
request.responseType = "arraybuffer";

request.onload = function() {
	context.decodeAudioData(request.response, function(buffer) {
		if(!buffer) {
			// Error decoding file data
			return;
		}

		sourceJs = context.createScriptProcessor(2048, 1, 1);
		sourceJs.buffer = buffer;
		sourceJs.connect(context.destination);
		analyser = context.createAnalyser();
		analyser.smoothingTimeConstant = 0.6;
		analyser.fftSize = 512;

		source = context.createBufferSource();
		source.buffer = buffer;

		source.connect(analyser);
		analyser.connect(sourceJs);
		source.connect(context.destination);

		sourceJs.onaudioprocess = function(e) {
			array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(array);
			boost = 0;
			for (var i = 0; i < array.length; i++) {
		         boost += array[i];
		     }
		     boost = boost / array.length;
		};
		source.start(0);
	},

	function(error) {
		console.log("There was an error decoding the audio file.")
	}
	);
};
request.send();
