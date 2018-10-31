//GLOBAL VARIABLES
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let buffer;
const lookahead = 25;
const scheduleAheadTime = 0.1;
let nextNoteTime = 0.0;
let currNote = 0;
let rythmArray = [1, 0, 1, 1]
let bpm = 120;
let timer;

//FUNCTION EXPRESSIONS
const loadSound = function(url) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
    context.decodeAudioData(arrayBuffer, decoded => {
      buffer = decoded;
    });
});
}

const play = function(time) {
  source = context.createBufferSource();
  source.connect(context.destination);
  source.buffer = buffer;
  source.start(time);
}

const playRhythm = function() {
  nextNoteTime = context.currentTime + 0.005;
  scheduler();
}

const stopRhythm = function() {
  clearTimeout(timer);
}

const scheduler = function() {
  while (nextNoteTime < context.currentTime + scheduleAheadTime) {
    if (rythmArray[currNote] === 1) {
      play(nextNoteTime);
      console.log(currNote);
    }
    nextNote();
  }
  timer = setTimeout(scheduler, lookahead);
}

const nextNote = function() {
  const secondsPerBeat = 60 / bpm;
  nextNoteTime += secondsPerBeat;
  currNote++;
  if (currNote === 4) {
    currNote = 0;
  }
}

//MAIN CODE
loadSound('hat.wav');