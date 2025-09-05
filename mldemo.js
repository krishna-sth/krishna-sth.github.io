let model;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Load pre-trained TFJS MNIST model
async function loadModel(){
  model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mnist/model.json');
}
loadModel();

// Drawing on canvas
canvas.addEventListener('mousedown', ()=>drawing=true);
canvas.addEventListener('mouseup', ()=>drawing=false);
canvas.addEventListener('mousemove', draw);

function draw(e){
  if(!drawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.fillStyle = 'white';
  ctx.fillRect(e.clientX - rect.left, e.clientY - rect.top, 15, 15);
}

// Clear button
document.getElementById('clear-btn').addEventListener('click', ()=>{
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  document.getElementById('prediction').textContent = '-';
});

// Predict on mouseup
canvas.addEventListener('mouseup', async ()=>{
  const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let img = tf.browser.fromPixels(imgData,1).resizeNearestNeighbor([28,28]).toFloat();
  img = img.div(255.0).reshape([1,28,28,1]);
  const prediction = model.predict(img);
  const digit = prediction.argMax(1).dataSync()[0];
  document.getElementById('prediction').textContent = digit;
});
