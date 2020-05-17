let x, y;

function setup() {
  wx = windowWidth;
  wy = windowHeight;
  createCanvas(wx, wy);

  x = floor(width / 2);
  y = floor(height / 2);
}

let k = 0.5;

function draw() {
  stroke(random(255), random(255), random(255));
  point(x, y);

  let randomnumber = floor(random(4));

  switch (randomnumber) {
    case 0:
      x++;
      break;
    case 1:
      x--;
      break;
    case 2:
      y++;
      break;
    case 3:
      y--;
      break;
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
