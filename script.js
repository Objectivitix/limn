const CANVAS_SIZE = 640;

const body = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const colorPicker = document.querySelector(".color-picker");
const gridLineToggle = document.querySelector(".grid-line-toggle");
const canvasSizerLabel = document.querySelector(".canvas-sizer-container > label");
const canvasSizer = document.querySelector(".canvas-sizer");
const canvasClearer = document.querySelector(".canvas-clearer");

let mouseDown = false;
let penColor = "hsl(152, 100%, 60%)";

function onPixelHover(evt) {
  if (mouseDown) {
    evt.target.style.backgroundColor = penColor;
  }
}

function onColorInput(evt) {
  evt.target.parentNode.style.backgroundColor = evt.target.value;
  penColor = evt.target.value;
}

function onGridLineToggle() {
  canvas.classList.toggle("hide-grid-lines");
}

function onCanvasResize(evt) {
  const newSize = evt.target.value;

  canvasSizerLabel.textContent = `Canvas size: ${newSize}x${newSize}`;
  canvas.innerHTML = "";
  createCanvasGrid(newSize);
}

function onCanvasClear() {
  const pixels = document.querySelectorAll(".pixel")
  pixels.forEach(pixel => pixel.style.backgroundColor = "");
}

function createCanvasGrid(sideLength) {
  const pixelSize = CANVAS_SIZE / sideLength;

  for (let i = 0; i < sideLength; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < sideLength; j++) {
      const pixel = document.createElement("div");

      pixel.style.width = `${pixelSize}px`;
      pixel.style.height = `${pixelSize}px`;
      pixel.classList.add("pixel");
      pixel.addEventListener("mouseover", onPixelHover);
      pixel.addEventListener("mousedown", onPixelHover);

      row.appendChild(pixel);
    }

    canvas.appendChild(row);
  }
}

body.addEventListener("mousedown", () => mouseDown = true, {capture: true});
body.addEventListener("mouseup", () => mouseDown = false);
body.addEventListener("mouseleave", () => mouseDown = false);

colorPicker.addEventListener("input", onColorInput);
gridLineToggle.addEventListener("click", onGridLineToggle);
canvasSizer.addEventListener("input", onCanvasResize);
canvasClearer.addEventListener("click", onCanvasClear);

createCanvasGrid(16);
