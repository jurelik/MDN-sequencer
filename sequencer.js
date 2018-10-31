//GLOBAL VARIABLES
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let buffer;
const lookahead = 25;
const scheduleAheadTime = 0.1;
let nextNoteTime = 0.0;
let currNote = 0;
let rythmArray = [1, 1, 1, 1]
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

//DOCUMENT ELEMENTS
let sequencer1 = document.getElementById('sequencer-1');
let sequencer2 = document.getElementById('sequencer-2');
let sequencer3 = document.getElementById('sequencer-3');
let sequencer4 = document.getElementById('sequencer-4');
let seq1state = 1;
let seq2state = 1;
let seq3state = 1;
let seq4state = 1;
let playBtn = document.getElementById('playBtn');
let stopBtn = document.getElementById('stopBtn');

//EVENT LISTENERS
sequencer1.addEventListener('click', e => {
  e.preventDefault();
  seq1state++;
  if (seq1state === 2) {
    seq1state = 0;
    rythmArray[0] = seq1state;
    sequencer1.style.backgroundColor = "gainsboro";
  }
  else {
    rythmArray[0] = seq1state;
    sequencer1.style.backgroundColor = "rosybrown";
  }
  console.log(rythmArray);
})

playBtn.addEventListener('click', e => {
  e.preventDefault();
  playRhythm();
})

stopBtn.addEventListener('click', e => {
  e.preventDefault();
  stopRhythm();
})

//MAIN CODE
loadSound('hat.wav');

