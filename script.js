const CANVAS_SIZE = 640;

const body = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const pixels = document.getElementsByClassName("pixel");

const colorPicker = document.querySelector(".color-picker");
const gridToggle = document.querySelector(".grid-toggle");
const gridColorToggle = document.querySelector(".grid-color-toggle");
const gridOpacitySlider = document.querySelector(".grid-opacity-slider");
const canvasSizeSlider = document.querySelector(".canvas-size-slider");
const canvasClearer = document.querySelector(".canvas-clearer");

let buttonPressed = null;
let penColor = "hsl(152 100% 60%)";
let gridLineLightness = 0;
let gridLineOpacity = 10;

canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());

body.addEventListener("mousedown", (evt) => buttonPressed = evt.button, {capture: true});
body.addEventListener("mouseup", () => buttonPressed = null);
body.addEventListener("mouseleave", () => buttonPressed = null);

colorPicker.addEventListener("input", onColorPick);
gridToggle.addEventListener("click", onGridToggle);
gridColorToggle.addEventListener("click", onGridColorToggle);
gridOpacitySlider.addEventListener("input", onGridOpacitySlide);
canvasSizeSlider.addEventListener("input", onCanvasSizeSlide);
canvasClearer.addEventListener("click", onCanvasClear);

createCanvasGrid(16);

function onColorPick(evt) {
  evt.target.parentNode.style.backgroundColor = evt.target.value;
  penColor = evt.target.value;
}

function onGridToggle() {
  canvas.classList.toggle("hide-grid-lines");
}

function onGridColorToggle() {
  gridLineLightness = Number(!gridLineLightness);
  updateGrid();
}

function onGridOpacitySlide(evt) {
  gridLineOpacity = evt.target.value;

  evt.target.previousElementSibling.textContent =
    `Grid line opacity: ${gridLineOpacity}%`;
  updateGrid();
}

function onCanvasSizeSlide(evt) {
  const newSize = evt.target.value;

  evt.target.previousElementSibling.textContent =
    `Canvas size: ${newSize}x${newSize}`;
  canvas.innerHTML = "";
  createCanvasGrid(newSize);
}

function onCanvasClear() {
  forEach(pixels, pixel => pixel.style.backgroundColor = "");
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

function onPixelHover(evt) {
  if (buttonPressed === 0) {
    evt.target.style.backgroundColor = penColor;
    evt.target.classList.add("write-mode");
  } else if (buttonPressed === 2) {
    evt.target.style.backgroundColor = "";
    evt.target.classList.add("write-mode");
  }
}

function onPixelRelease(evt) {
  evt.target.classList.remove("write-mode");
}

function updateGrid() {
  const newColor = `hsl(0 0% ${gridLineLightness * 100}% / ${gridLineOpacity}%)`
  forEach(pixels, pixel => pixel.style.borderColor = newColor);
}

function forEach(arrayLike, callbackFn) {
  Array.from(arrayLike).forEach(callbackFn);
}
