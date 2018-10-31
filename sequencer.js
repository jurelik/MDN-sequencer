const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let buffer;
let lookahead = 25;
let scheduleAheadTime = 0.1;
let nextNoteTime = 0.0;
let bpm = 120;

let loadSound = function(url) {
  fetch(url)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
  context.decodeAudioData(arrayBuffer, decoded => {
    buffer = decoded;
  });
});
}

let play = function(time) {
  source = context.createBufferSource();
  source.connect(context.destination);
  source.buffer = buffer;
  source.start(time);
}

let playRhythm = function() {
  nextNoteTime = context.currentTime;
  scheduler();
}

let scheduler = function() {
  while (nextNoteTime < context.currentTime + scheduleAheadTime) {
    play(nextNoteTime);
    console.log('sup');
    nextNote();
  }
  setTimeout(scheduler, lookahead);
}

let nextNote = function() {
  const secondsPerBeat = 60 / bpm;
  nextNoteTime += secondsPerBeat;
}

loadSound('hat.wav');