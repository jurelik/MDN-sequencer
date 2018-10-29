const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let buffer;

function loadFile(url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    audioCtx.decodeAudioData(xhr.response, decoded => {
      buffer = decoded;
    });
  }
  xhr.send();
}

function playFile(time) {
  const sampleSource = audioCtx.createBufferSource();
  sampleSource.buffer = buffer;
  sampleSource.connect(audioCtx.destination);
  sampleSource.start(time);
  return sampleSource;
}

let tempo = 120.0;
let lookahead = 25;
let scheduleAheadTime = 0.1;
let currentNote = 0;
let nextNoteTime = 0.0;

function nextNote() {
  const secondsPerBeat = 60.0 / tempo;
  nextNoteTime += secondsPerBeat;

  currentNote++;
  if (currentNote === 4) {
    currentNote = 0;
  }
}

function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    playFile(nextNoteTime);
    console.log('sup')
    nextNote();
  }
  timerID = window.setTimeout(scheduler, lookahead);
}

loadFile('hat.wav');

// setupSample()
//   .then(() => {
//     currentNote = 0;
//     nextNoteTime = audioCtx.currentTime;
//     scheduler();
// });

function startPattern() {
  currentNote = 0;
  nextNoteTime = audioCtx.currentTime + 0.01;
  scheduler();
}
// startPattern();

let button = document.getElementById('playBtn');
button.addEventListener('click', e => {
  startPattern();
});