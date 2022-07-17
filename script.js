function onPixelHover(evt) {
  if (mouseDown) {
    evt.target.style.backgroundColor = penColor;
  }
}

function onColorInput(evt) {
  evt.target.parentNode.style.backgroundColor = evt.target.value;
  penColor = evt.target.value;
}

const canvas = document.querySelector(".canvas");
const body = document.querySelector("body");
const colorPicker = document.querySelector(".color-picker");

for (let i = 0; i < 16; i++) {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < 16; j++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.addEventListener("mouseover", onPixelHover);
    pixel.addEventListener("mousedown", onPixelHover);
    row.appendChild(pixel);
  }

  canvas.appendChild(row);
}

let mouseDown = false;
body.addEventListener("mousedown", () => mouseDown = true, {capture: true});
body.addEventListener("mouseup", () => mouseDown = false);
body.addEventListener("mouseleave", () => mouseDown = false);

let penColor = "black";
colorPicker.addEventListener("input", onColorInput);
