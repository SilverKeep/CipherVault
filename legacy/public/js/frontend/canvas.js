const canvas = document.getElementById('home-canvas');
const ctx = canvas.getContext('2d');

const NUM_ELEMENTS = 50;
const ELEMENT_COLOR = "black";

function setHighResolutionCanvas(canvas, scaleFactor = 2) {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;

  canvas.width = width * scaleFactor;
  canvas.height = height * scaleFactor;

  ctx.scale(scaleFactor, scaleFactor);
}

setHighResolutionCanvas(canvas);

class Rect {
  constructor(x, y, w, h, c) {
    this.x_pos = x;
    this.y_pos = y;
    this.width = w;
    this.height = h;
    this.color = c;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x_pos, this.y_pos, this.width, this.height);
  }

  update() {
    this.y_pos += 0.3;

    if (this.y_pos > canvas.height / 2) return true;
    return false;
  }

  reset() {
    this.y_pos = 0;
    this.x_pos = Math.floor(Math.random() * (canvas.width / 2));
  }
}

let list = [
  new Rect(5, 0, 3, 3, ELEMENT_COLOR)
];

for (let i = 0; i < NUM_ELEMENTS; i++) {
    list.push(new Rect(Math.floor(Math.random() * (canvas.width / 2)), Math.floor(Math.random() * (canvas.height / 2)), 3, 3, ELEMENT_COLOR));
}

function animate() {
  window.requestAnimationFrame(animate);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < list.length; i++) {
    list[i].draw();
    if (list[i].update()) list[i].reset();
  }
}

animate();
