function preload() {
  ding = loadSound('./ding.mp3');
}

let playding, soundplayed;

function setup() {
  wx = 500;
  wy = 500;
  createCanvas(wx, wy);
  playding = false;
  background(0);
  lsec = 43;
  br = 50

  lmin = lsec - 10;
  lhour = lmin - 10;
  soundplayed = false;

  let minscl = 1 / 3;
  let minlog = log(minscl) / log(10)

  let maxscl = 3;
  let maxlog = log(maxscl) / log(10)
  stroke(255);
  createP("");
  scl = createSlider(minlog, maxlog, 0, (maxlog - minlog) / 100);

}

let h, m, s;

function drawticks() {
  for (var i = 0; i < 60; i++) {
    angle = map(i, 0, 60, 0, TWO_PI);
    push();
    strokeWeight(1);
    if (i % 5 == 0) {
      strokeWeight(2);
    }
    translate(br * cos(angle), br * sin(angle));
    rotate(-PI / 4 + angle);
    line(0, 0, -2, -2);
    pop();
  }
}

function drawlines() {
  h = hour() % 12;
  m = minute();
  s = second();
  // console.log(h+":"+m+":"+s);

  strokeWeight(2);

  anglesec = map(s, 0, 60, 0, TWO_PI);
  line(0, 0, lsec * cos(anglesec), lsec * sin(anglesec));

  anglemin = map(m, 0, 60, 0, TWO_PI) + anglesec / 60;
  line(0, 0, lmin * cos(anglemin), lmin * sin(anglemin));

  anglehour = map(h, 0, 12, 0, TWO_PI);
  line(0, 0, lhour * cos(anglehour), +lhour * sin(anglehour));

  strokeWeight(3);
  noFill();
  ellipse(0, 0, br * 2);
  // pop();
}

function playsound() {
  push();
  noStroke();
  dingstate = "Off";
  fill(255, 0, 0);

  if (playding) {
    fill(0, 255, 0);
    dingstate = "On";
  }
  translate(-wx / 2 / v, -wy / 2 / v);
  rectMode(CENTER);
  rect(20, 17, 17, 17);
  fill(0);
  // textSize(10);
  textAlign(CENTER);
  text(dingstate, 20, 20);

  pop();

  if (s == 0 && playding) {
    if (!soundplayed) {
      ding.play();
      soundplayed = true;
    }
  } else {
    soundplayed = false
  }

}

function drawmiddle() {
  stroke(255);
  fill(0);
  strokeWeight(2);
  ellipse(0, 0, 2 * log(lhour));

}

function draw() {
  v = 10 ** scl.value();

  scale(v);

  translate(wx / 2 / v, wy / 2 / v);

  background(0);

  playsound();

  push();

  rotate(-PI / 2);
  drawticks();
  drawlines();

  pop();

  drawmiddle();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= wx && mouseY >= 0 && mouseY <= wy) {
    playding = !playding;
  }
}
