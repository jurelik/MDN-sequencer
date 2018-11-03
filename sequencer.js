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
let isPlaying = false;

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
  if (!isPlaying) {
    nextNoteTime = context.currentTime + 0.005;
    isPlaying = true;
    scheduler();
  }
}

const stopRhythm = function() {
  clearTimeout(timer);
  isPlaying = false;
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
  const secondsPerBeat = 60 / bpm / 2;
  nextNoteTime += secondsPerBeat;
  currNote++;
  if (currNote === 4) {
    currNote = 0;
  }
}

//DRAG AND DROP
const dragHandler = function(e) {
  e.stopPropagation();
  e.preventDefault();

  e.dataTransfer.dropEffect = "copy";
}

const dropHandler = function(e) {
  e.stopPropagation();
  e.preventDefault();

  const file = e.dataTransfer.files;

  const reader = new FileReader();
  reader.onload = function() {
    context.decodeAudioData(reader.result, decoded => {
      buffer = decoded;
    })
  }
  reader.readAsArrayBuffer(file[0]);
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

let dropZone = document.getElementById('drop-zone');

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

sequencer2.addEventListener('click', e => {
  e.preventDefault();
  seq2state++;
  if (seq2state === 2) {
    seq2state = 0;
    rythmArray[1] = seq2state;
    sequencer2.style.backgroundColor = "gainsboro";
  }
  else {
    rythmArray[1] = seq2state;
    sequencer2.style.backgroundColor = "rosybrown";
  }
  console.log(rythmArray);
})

sequencer3.addEventListener('click', e => {
  e.preventDefault();
  seq3state++;
  if (seq3state === 2) {
    seq3state = 0;
    rythmArray[2] = seq3state;
    sequencer3.style.backgroundColor = "gainsboro";
  }
  else {
    rythmArray[2] = seq3state;
    sequencer3.style.backgroundColor = "rosybrown";
  }
  console.log(rythmArray);
})

sequencer4.addEventListener('click', e => {
  e.preventDefault();
  seq4state++;
  if (seq4state === 2) {
    seq4state = 0;
    rythmArray[3] = seq4state;
    sequencer4.style.backgroundColor = "gainsboro";
  }
  else {
    rythmArray[3] = seq4state;
    sequencer4.style.backgroundColor = "rosybrown";
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

dropZone.addEventListener('dragover', dragHandler);
dropZone.addEventListener('drop', dropHandler);
window.addEventListener('dragover', e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "none";
});

//MAIN CODE
// loadSound('hat.wav');

