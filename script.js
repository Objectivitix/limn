const CANVAS_SIZE = 640;

const body = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const colorPicker = document.querySelector(".color-picker");
const gridLineToggle = document.querySelector(".grid-line-toggle");
const gridLineColorToggle = document.querySelector(".gl-color-toggle");
const canvasSizerLabel = document.querySelector(".canvas-sizer-container > label");
const canvasSizer = document.querySelector(".canvas-sizer");
const gridLineOpacityLabel = document.querySelector(".gl-opacity-container > label");
const gridLineOpacitySlider = document.querySelector(".gl-opacity");
const canvasClearer = document.querySelector(".canvas-clearer");

let mouseDownButton = null;
let penColor = "hsl(152, 100%, 60%)";
let gridLineLightness = 0;
let gridLineOpacity = 10;

function setMouseDownButton(evt) {
  mouseDownButton = evt.button;
}

function onPixelHover(evt) {
  if (mouseDownButton === 0) {
    evt.target.style.backgroundColor = penColor;
  } else if (mouseDownButton === 2) {
    evt.target.style.backgroundColor = "";
    evt.target.classList.add("eraser-mode");
  }
}

function onPixelRelease(evt) {
  evt.target.classList.remove("eraser-mode");
}

function onColorInput(evt) {
  evt.target.parentNode.style.backgroundColor = evt.target.value;
  penColor = evt.target.value;
}

function onGridLineToggle() {
  canvas.classList.toggle("hide-grid-lines");
}

function onGridLineColorToggle(evt) {
  gridLineLightness = +!gridLineLightness;
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach(pixel => pixel.style.borderColor =
    `hsl(0 0% ${gridLineLightness * 100}% / ${gridLineOpacity}%)`
  );
}

function onCanvasResize(evt) {
  const newSize = evt.target.value;

  canvasSizerLabel.textContent = `Canvas size: ${newSize}x${newSize}`;
  canvas.innerHTML = "";
  createCanvasGrid(newSize);
}

function onGLOpacityInput(evt) {
  gridLineOpacity = evt.target.value;

  gridLineOpacityLabel.textContent = `Grid line opacity: ${gridLineOpacity}%`;
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach(pixel => pixel.style.borderColor =
    `hsl(0 0% ${gridLineLightness * 100}% / ${gridLineOpacity}%)`
  );
}

function onCanvasClear() {
  const pixels = document.querySelectorAll(".pixel");
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
      pixel.addEventListener("mouseleave", onPixelRelease);

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
gridLineColorToggle.addEventListener("click", onGridLineColorToggle);
gridLineToggle.addEventListener("click", onGridLineToggle);
gridLineOpacitySlider.addEventListener("input", onGLOpacityInput);
canvasSizer.addEventListener("input", onCanvasResize);
canvasClearer.addEventListener("click", onCanvasClear);

createCanvasGrid(16);
