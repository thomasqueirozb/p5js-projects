function setup() {
  wx = windowWidth; // * 3 / 4;
  wy = windowHeight; // * 3 / 4;
  createCanvas(wx, wy);
  colorMode(HSB);
  c = 0;
}
let k = 0.5;
function draw() {
  c += k;
  if (c == 255) {
    k *= -1;
  } else if (c == 0) {
    k *= -1;
  }

  background(c, 255, 255, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
