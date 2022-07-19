const CANVAS_SIZE = 640;

const body = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const colorPicker = document.querySelector(".color-picker");
const gridLineToggle = document.querySelector(".grid-line-toggle");
const canvasSizerLabel = document.querySelector(".canvas-sizer-container > label");
const canvasSizer = document.querySelector(".canvas-sizer");
const canvasClearer = document.querySelector(".canvas-clearer");

let mouseDownButton = null;
let penColor = "hsl(152, 100%, 60%)";

function setMouseDownButton(evt) {
  mouseDownButton = evt.button;
}

function onPixelHover(evt) {
  if (mouseDownButton === 0) {
    evt.target.style.backgroundColor = penColor;
  } else if (mouseDownButton === 2) {
    evt.target.style.backgroundColor = "";
  }

  evt.target.unhoverColor = evt.target.style.backgroundColor;
  if (mouseDownButton !== 2) {
    evt.target.style.backgroundColor = penColor;
  }
}

function onPixelRelease(evt) {
  evt.target.style.backgroundColor = penColor;
}

function onPixelUnhover(evt) {
  evt.target.style.backgroundColor = evt.target.unhoverColor;
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
      pixel.addEventListener("mouseup", onPixelRelease);
      pixel.addEventListener("mouseleave", onPixelUnhover);

      row.appendChild(pixel);
    }

    canvas.appendChild(row);
  }
}

canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());

body.addEventListener("mousedown", setMouseDownButton, {capture: true});
body.addEventListener("mouseup", () => mouseDownButton = null);
body.addEventListener("mouseleave", () => mouseDownButton = null);

colorPicker.addEventListener("input", onColorInput);
gridLineToggle.addEventListener("click", onGridLineToggle);
canvasSizer.addEventListener("input", onCanvasResize);
canvasClearer.addEventListener("click", onCanvasClear);

createCanvasGrid(16);
