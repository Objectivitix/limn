const CANVAS_SIZE = 640;

function createCanvasGrid(pixelSize) {
  for (let i = 0; i < pixelSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < pixelSize; j++) {
      const pixel = document.createElement("div");
      pixel.style.width = pixel.style.height = `${CANVAS_SIZE / pixelSize}px`;
      pixel.classList.add("pixel");

      pixel.addEventListener("mouseover", onPixelHover);
      pixel.addEventListener("mousedown", onPixelHover);
      row.appendChild(pixel);
    }

    canvas.appendChild(row);
  }
}

function onPixelHover(evt) {
  if (mouseDown) {
    evt.target.style.backgroundColor = penColor;
  }
}

function onColorInput(evt) {
  evt.target.parentNode.style.backgroundColor = evt.target.value;
  penColor = evt.target.value;
}

function onCanvasResize(evt) {
  const newSize = evt.target.value;

  canvasSizerLabel.textContent = `Canvas size: ${newSize}x${newSize}`;
  canvas.innerHTML = "";
  createCanvasGrid(newSize);
}

function onCanvasClear() {
  document.querySelectorAll(".pixel")
    .forEach(pixel => pixel.style.backgroundColor = "");
}

const body = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const colorPicker = document.querySelector(".color-picker");
const gridLineToggle = document.querySelector(".grid-line-toggle");
const canvasSizerLabel = document.querySelector(".canvas-sizer-container > label");
const canvasSizer = document.querySelector(".canvas-sizer");
const canvasClearer = document.querySelector(".canvas-clearer");

createCanvasGrid(16);

let mouseDown = false;
body.addEventListener("mousedown", () => mouseDown = true, {capture: true});
body.addEventListener("mouseup", () => mouseDown = false);
body.addEventListener("mouseleave", () => mouseDown = false);

let penColor = "hsl(152, 100%, 60%)";
colorPicker.addEventListener("input", onColorInput);

gridLineToggle.addEventListener("click",
  () => canvas.classList.toggle("hide-grid-lines")
);

canvasSizer.addEventListener("input", onCanvasResize);

canvasClearer.addEventListener("click", onCanvasClear);
