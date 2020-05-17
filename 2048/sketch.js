let sqs = 100;
let offset = sqs / 4;
// Store
// localStorage.setItem("lastname", "Smith");
// Retrieve
// document.getElementById("result").innerHTML = localStorage.getItem("lastname");
let gridwidth = 4;
let gridheight = 4;
let scl = 1;

function createNew() {
  score = 0;
  grid = Array2D(gridwidth, gridheight);
  putNewNumber(grid);
  putNewNumber(grid);
  localStorage.setItem("score", 0);
}

// function centerCanvas() {
//   var cnvpx = (windowWidth - width) / 2;
//   var cnvpy = (windowHeight - height) / 2;
//   cnv.position(cnvpx, cnv.position().y);
// }
//
// function windowResized() {
//   centerCanvas();
// }

function setup() {
  scoreDom = createP();
  scoreDom.parent("score");
  highscoreDom = createP();
  highscoreDom.parent("highscore");

  canvasx = round((sqs * gridheight + 2 * offset) / scl);
  canvasy = round((sqs * gridwidth + 2 * offset) / scl);
  cnv = createCanvas(canvasx, canvasy);
  cnv.parent("canvas");
  // centerCanvas();

  grid = localStorage.getItem("game");
  score = 0;
  highscore = localStorage.getItem("highscore");

  if (highscore === null) {
    localStorage.setItem("highscore", 0);
    highscore = 0;
  }

  if (grid) {
    grid = grid.split(",");
    localw = int(grid[0]);
    localh = int(grid[1]);
    score = int(grid[2]);
    grid.splice(0, 3);
    if (
      grid.length == gridwidth * gridheight &&
      gridwidth == localw &&
      localh == gridheight
    ) {
      newG = [];
      score = int(score);
      for (let i = 0; i < gridwidth; i++) {
        lineG = [];
        for (let j = 0; j < gridheight; j++) {
          lineG.push(int(grid[i * gridwidth + j]));
        }
        newG.push(lineG);
      }
      grid = newG;
    } else {
      score = 0;
      grid = Array2D(gridwidth, gridheight);
      putNewNumber(grid);
      putNewNumber(grid);
    }
  } else {
    score = 0;
    grid = Array2D(gridwidth, gridheight);
    putNewNumber(grid);
    putNewNumber(grid);
  }
  textAlign(CENTER, CENTER);
  draw_game();
}

function draw() {}

function draw_game() {
  scoreDom.html("Score: " + score);
  highscoreDom.html("Highscore: " + localStorage.getItem("highscore"));

  background(250, 248, 239);
  scale(1 / scl);
  loadGrid();
}

function checkEnd() {
  if (
    checkEqual2D(right(grid)[0], grid) &&
    checkEqual2D(left(grid)[0], grid) &&
    checkEqual2D(up(grid)[0], grid) &&
    checkEqual2D(down(grid)[0], grid)
  ) {
    createNew();
  }
}

function keyPressed() {
  let obj;

  switch (key) {
    case "d":
    case "ArrowRight":
      obj = right(grid);
      break;
    case "w":
    case "ArrowUp":
      obj = up(grid);
      break;
    case "a":
    case "ArrowLeft":
      obj = left(grid);
      break;
    case "s":
    case "ArrowDown":
      obj = down(grid);
      break;
    case "r":
      createNew();
      draw_game();
      return;
    default:
      return;
  }
  grid = obj[0];
  const moved = obj[1];
  if (moved) {
    putNewNumber(grid);
  }
  checkEnd();

  // putNewNumber(grid);
  localStorage.setItem("game", [gridwidth, gridheight, score, grid]);
  if (score > int(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);
  }

  draw_game();
}

function highnumbers() {
  grid[0][0] = 8192 * 2;
  grid[0][1] = 8192;
  grid[0][2] = 4096;
  grid[0][3] = 2048;
  grid[1][3] = 1024;
  grid[1][2] = 512;
  grid[1][1] = 256;
  grid[1][0] = 128;
  grid[2][0] = 64;
  grid[2][1] = 32;
  grid[2][2] = 16;
  grid[2][3] = 8;
  grid[3][3] = 4;
  grid[3][2] = 2;
  grid[3][1] = 2;
}
