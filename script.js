function onPixelHover(evt) {
  if (mouseDown) {
    evt.target.style.backgroundColor = "black";
  }
}

const canvas = document.querySelector(".canvas");

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
const body = document.querySelector("body");
body.addEventListener("mousedown", () => mouseDown = true, {capture: true});
body.addEventListener("mouseup", () => mouseDown = false);
body.addEventListener("mouseleave", () => mouseDown = false);
