function loadGrid() {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      let posx = offset + x * sqs;
      let posy = offset + y * sqs;

      let num = grid[x][y];

      getRectColors(num)
      stroke(187, 173, 160);
      rect(posx, posy, sqs, sqs, PI / 10);

      getTextColors(num);

      // textSize(50)
      // if (str(num).length >= 4) {
      textSize(50 - str(num).length * 4);
      // }
      text(num, posx + sqs / 2, posy + sqs / 2)
    }
  }
}

let colordict = {
  2: [238, 228, 218],
  4: [237, 224, 200],
  8: [242, 177, 121],
  16: [245, 149, 99],
  32: [246, 124, 95],
  64: [246, 94, 59],
  128: [237, 207, 114],
  256: [237, 204, 97],
  512: [237, 200, 80],
  1024: [237, 197, 63],
  2048: [237, 194, 46],
  4096: [94, 218, 146],
  8192: [37, 187, 100],
  16384: [35, 140, 81]
}

function getRectColors(number) {
  stroke(187, 173, 160);
  strokeWeight(10);
  if (number == 0) {
    fill(205, 193, 180);
    noStroke();
  } else {
    try {
      let c = colordict[number];
      fill(c[0], c[1], c[2]);
    } catch (e) {
      fill(200);
    }
  }
}

function getTextColors(number) {
  strokeWeight(2);
  if (number == 0) {
    noFill();
    noStroke();
  } else if (number == 2 || number == 4) {
    fill(119, 110, 101);
    stroke(119, 110, 101);
  } else {
    fill(249, 244, 240);
    stroke(249, 244, 240);
  }
}
