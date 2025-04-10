const socket = io();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let painting = false;
let erasing = false;
let color = "#000000";
let thickness = 5;

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", (e) => startPosition(e.touches[0]));
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", (e) => {
  draw(e.touches[0]);
  e.preventDefault();
});

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  ctx.strokeStyle
