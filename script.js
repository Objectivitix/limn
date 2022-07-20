const CANVAS_SIZE = 640;

const body = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const pixels = document.getElementsByClassName("pixel");

const colorPicker = document.querySelector(".color-picker");
const rainbowToggle = document.querySelector(".rainbow-toggle");
const gridToggle = document.querySelector(".grid-toggle");
const gridColorToggle = document.querySelector(".grid-color-toggle");
const gridOpacitySlider = document.querySelector(".grid-opacity-slider");
const canvasSizeSlider = document.querySelector(".canvas-size-slider");
const canvasClearer = document.querySelector(".canvas-clearer");

let mouseButtonDown = null;
let penColor = "hsl(152 100% 60%)";
let rainbowMode = false;
let gridLightness = 0;
let gridOpacity = 10;

canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());

body.addEventListener("mousedown", (evt) => mouseButtonDown = evt.button, {capture: true});
body.addEventListener("mouseup", () => mouseButtonDown = null);
body.addEventListener("mouseleave", () => mouseButtonDown = null);

colorPicker.addEventListener("input", onColorPick);
rainbowToggle.addEventListener("click", onRainbowToggle);
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

function onRainbowToggle(evt) {
  buttonToggle(evt.target);
  rainbowMode = !rainbowMode;
}

function onGridToggle(evt) {
  buttonToggle(evt.target);
  canvas.classList.toggle("hide-grid-lines");
}

function onGridColorToggle(evt) {
  buttonToggle(evt.target);
  gridLightness = Number(!gridLightness);
  updateGrid();
}

function onGridOpacitySlide(evt) {
  gridOpacity = evt.target.value;

  evt.target.previousElementSibling.textContent =
    `Grid line opacity: ${gridOpacity}%`;
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
  if (mouseButtonDown === 0) {
    evt.target.style.backgroundColor =
      (rainbowMode) ? randColor() : penColor;
    evt.target.classList.add("write-mode");
  } else if (mouseButtonDown === 2) {
    evt.target.style.backgroundColor = "";
    evt.target.classList.add("write-mode");
  }
}

function onPixelRelease(evt) {
  evt.target.classList.remove("write-mode");
}

function randColor() {
  return `hsl(${randInt(0, 361)} ${randInt(75, 101)}% ${randInt(30, 81)}%)`;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function buttonToggle(button) {
  button.classList.toggle("on");
}

function updateGrid() {
  const newColor = `hsl(0 0% ${gridLightness * 100}% / ${gridOpacity}%)`
  forEach(pixels, pixel => pixel.style.borderColor = newColor);
}

function forEach(arrayLike, callbackFn) {
  Array.from(arrayLike).forEach(callbackFn);
}
