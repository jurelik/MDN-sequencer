const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
let buffer;



// let choose = document.getElementById('fileChoose');
// choose.addEventListener('change', e => {
//   console.log(choose.files);
//   let reader = new FileReader();
//   reader.onload = function() {
//     context.decodeAudioData(reader.result, decoded => {
//       buffer = decoded;
//     })
//   }
//   reader.readAsArrayBuffer(choose.files[0]);
// })

const dropHandler = function(e) {
  e.stopPropagation();
  e.preventDefault();
  
  let file = e.dataTransfer.files;
  console.log(file);

  const reader = new FileReader();
  reader.onload = function() {
    context.decodeAudioData(reader.result, decoded => {
      buffer = decoded;
    });
  };
  reader.readAsArrayBuffer(file[0]);
  console.log('sup');
}

const dragoverHandler = function(e) {
  e.stopPropagation();
  e.preventDefault();
  
  e.dataTransfer.dropEffect = "copy";
}

const dragoverHandlerWindow = function(e) {
  e.stopPropagation();
  e.preventDefault();
  
  e.dataTransfer.dropEffect = "none";
}

window.addEventListener('dragover', dragoverHandlerWindow);
const dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', dragoverHandler);
dropZone.addEventListener('drop', dropHandler);