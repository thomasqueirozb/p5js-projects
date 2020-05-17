/*
Had to put this on index.html to properly right click
<body oncontextmenu="return false;">

Bugs:
      1 - Flags placed before the first click will (very likely) be deleted. Not
        really worried about this one and will probably leave this in.
      2 - The spaghetti code for the wait function doesn't stop the mousePressed
        function from running after the loop ends.Ex: If the user clicks during
        the loop nothing will occur until it ends. As soon as the wait function
        is over, mousePressed will run, causing an involuntary first click on
        the next game.

To do:
DONE  1 - Add an options 1D Array to create all bombs
      2 - Floodfill
DONE  3 - Fix near function to not give the same square as a near square
      4 - Win condition
DONE  5 - Add +10 and -10 buttons
*/

// Global variables
let xtranslate = 0 // Ammount by which x is translated
let sqwh = 30; // Square width/height
let lose = false; // Losing condition (not used)
let squares = []; // Array that stores all squares
let h = 30; // Array height
let w = 16; // Array width
let total = h * w; // Total number os squares
let first = true; // First click variable
let flags = 0; // Placed flags
let bombmax = 99; // Maximum bombs
let cond = true; // Losing condition
let slider_sqwh; // Scale slider




function setup() {
  createP("");
  slider_sqwh = createSlider(15, 30, 30, 1);
  leftflags = createElement("h1", "Left: " + (bombmax - flags)) //.center()

  createElement("div", "Number of bombs:");
  plus10B = createButton("(+) 10");

  plus1B = createButton("(+)");
  minus1B = createButton("(-)");
  minus10B = createButton("(-) 10");

  plus1B.mousePressed(plus);
  minus1B.mousePressed(minus);
  plus10B.mousePressed(plus10);
  minus10B.mousePressed(minus10);
  createP("");


  wy = (w + 2) * sqwh;
  wx = (h + 2) * sqwh;

  let cnv = createCanvas(wx, wy);
  // cnv.position(0,120);
  createMap();
  background(0);

}

function draw() {
  translatex();
  translate(xtranslate, 0);


  slider_sqwh.changed(rescale);

  // I have NO idea on how to work with html so I don't know if this is
  // necessary to be on draw() but i couldn't get it to work any other way
  leftflags.html("Left: " + (bombmax - flags));


  background(255, 10);

  // Only runs when the player loses
  if (!cond) {
    for (let x = 0; x < squares.length; x++) {
      for (let y = 0; y < squares[x].length; y++) {
        item = squares[x][y];
        if (item.kill) {
          item.state = true;
        }
        item.update();
      }
    }

    wait(3000);

    createMap();

    flags = 0;

    first = true;
  }

  cond = true;
  // Update the array
  for (let x = 0; x < squares.length; x++) {
    for (let y = 0; y < squares[x].length; y++) {
      item = squares[x][y];
      item.update();

      // Show the squares near the blank square.
      // This really could be optimized if all blank squares near the blank
      // squares were shown once the first blank square was pressed.
      // This also gives a really nice animation. Which is a bummer since it
      // needs to be removed
      if (item.state && !item.kill && item.killsnear == 0) {
        for (let n of item.near) {
          squares[n.pos.x][n.pos.y].flag = false;
          squares[n.pos.x][n.pos.y].state = true;
        }
      }

      // Check if there is a bomb that was pressed.
      // This could be in mousePressed but I
      // couldn't be bothered to put it there.
      if (item.kill && item.state) {
        for (let x = 0; x < squares.length; x++) {
          for (let y = 0; y < squares[x].length; y++) {
            item2 = squares[x][y];
            // Show all bombs
            if (item2.kill && !item2.flag) {
              item2.state = true;
            }
            item2.update();
          }
        }

        cond = false;
        break;
      }
    }
  }
}




// Spaghetti code for recreating the delay() function on the Java Processing
function wait(milliseconds) {
  let curtime = millis()
  // Stops for 3 seconds
  while (millis() - curtime < milliseconds) {}
}


// Hard coded functions for the buttons
function plus() {
  bombmax++;
  flags = 0;
  first = true;
  createMap();
}
function minus() {
  bombmax--;
  flags = 0;
  first = true;
  createMap();
}
function plus10() {
  bombmax+=10;
  flags = 0;
  first = true;
  createMap();
}
function minus10() {
  bombmax-=10;
  flags = 0;
  first = true;
  createMap();
}


// This only runs if both the right and left mouse are clicked.
// Couldn't make this using mousePressed or mouseIsPressed or mouseButton, since
// mouseButton is a string, not a list representing all pressed buttons.
// I have no idea how this works, but it works so I'm not complaining.
addEventListener("mousedown", function(event) {
  if ((event.buttons) === 3) {
    // Condition Left/Right -- Different name from cond
    let condlr = true;
    for (let x = 0; x < squares.length; x++) {
      for (let y = 0; y < squares[x].length; y++) {
        // Check what was the clicked square
        if (squares[x][y].posin(mouseX - xtranslate, mouseY)) {

          // Get how many flags are near the square
          let nearflags = 0
          for (item of squares[x][y].near) {
            if (item.flag) {
              nearflags++;
            }
          }

          // Only runs if there are an equal number of flags and bombs
          if (nearflags == squares[x][y].killsnear) {
            let count = 0;

            for (item of squares[x][y].near) {
              if (!item.flag && !item.state) {
                count++;
                item.state = true;
              }
            }
            // If at least one item was shown the background changes
            if (count) {
              background(random(255), random(255), random(255), 50);
              // Making this condition false so that the program exits the loop
              // and no more than 1 square is clicked
              condlr = false;
            }

          }
        }
        if (!condlr) {
          break;
        }
      }
      if (!condlr) {
        break;
      }
    }
  }
}, true);

function mousePressed() {
  let condm = true;

  // Left click
  if (mouseButton == "left") {
    for (let x = 0; x < squares.length; x++) {
      for (let y = 0; y < squares[x].length; y++) {
        // Check what was the clicked square
        if (squares[x][y].posin(mouseX - xtranslate, mouseY)) {
          // Make sure the first element clicked is a blank square
          if (first) {
            first = false;
            if (squares[x][y].killsnear == 0 && squares[x][y].kill == false) {} else {
              let i = 0;
              while (i < 20) {
                // Make sure the first one is a 0 and isn't a bomb
                createMap();
                i++
                if (squares[x][y].killsnear == 0 && squares[x][y].kill == false) {
                  break;
                }
              }
              // If 20 maps were generated without success, this will generate a
              // map that is certain to work. If you are reading this you might
              // be wondering: why not do this in the first place? And to that I
              // tell you: because I want to (and I like the randomness).
              if (i == 20) {
                createMap(x, y);
              }
            }
          }

          // Clicking or changing from flag to a normal square
          if (!squares[x][y].flag) {
            squares[x][y].state = true;
          } else {
            squares[x][y].flag = false
          }
          // squares[x][y].click();
          // Making this condition false so that the program exits the loop
          // and no more than 1 square is clicked
          condm = false;

          // // Show the squares near the blank square
          if (squares[x][y].killsnear == 0 && !squares[x][y].kill) {
            for (let item of squares[x][y].near) {
              squares[item.pos.x][item.pos.y].state = true;
            }
          }
        }
        if (!condm) {
          break
        }
      }
      if (!condm) {
        break
      }
    }
  }

  // Right click
  else if (mouseButton == "right") {
    for (let x = 0; x < squares.length; x++) {
      for (let y = 0; y < squares[x].length; y++) {
        // Checking what was the clicked square
        if (squares[x][y].posin(mouseX - xtranslate, mouseY)) {

          // Making sure that the clicked square isn't shown
          if (!squares[x][y].state) {

            // Making this condition false so that the program exits the loop
            // and no more than 1 square is clicked
            condm = false;

            // Changing the square to a flag or back to normal
            squares[x][y].flag = !squares[x][y].flag

            // Reajusting the flags counter
            if (squares[x][y].flag) {
              flags++;
            } else {
              flags--;
            }

          }
        }
        if (!condm) {
          break;
        }
      }
      if (!condm) {
        break;
      }
    }
  }
}

/////////////////// Debugging
let available;
let availablespace;
/////////////////// Debugging


function createMap(posmousex = -1, posmousey = -1) {
  // print("Map Created");
  // let available = [];
  available = [];
  // Create squares array
  for (var x = 0; x < h; x++) {
    squares[x] = new Array(w);
    for (var y = 0; y < w; y++) {
      squares[x][y] = new Square(x, y);
      available.push([x, y]);
    }
  }

  if (posmousex >= 0 && posmousey >= 0) {
    n = squares[posmousex][posmousey].getNear(squares);
    n.push(squares[posmousex][posmousey]);
    // for (let itemn of n){
    //     print(itemn.pos.x,itemn.pos.y);
    // }
    bombmax = constrain(bombmax, 0, total - n.length);
    availablespace = []
    // Had some major problems here where [14,7]==[14,7] returned false
    // The workaround i found was to convert to string
    for (let item of available) {
      availablespace.push(join(item, " "));
    }

    let nxy = []
    for (let item of n) {
      nxy.push(join([item.pos.x, item.pos.y], " "));
    }

    for (let i = available.length - 1; i > 0; i--) {
      if (nxy.includes(availablespace[i])) {
        availablespace.splice(i, 1);
        available.splice(i, 1);
      }
    }
    // print(availablespace.includes("0 0"));
  }

  bombmax = constrain(bombmax, 0, total);
  // Create all bombs
  let bomb = 0;

  while (bomb < bombmax) {
    index = floor(random(available.length))
    let item = available.splice(index, 1)[0]
    squares[item[0]][item[1]].kill = true;
    bomb++;
  }


  for (let x = 0; x < squares.length; x++) {
    for (let y = 0; y < squares[x].length; y++) {
      squares[x][y].calculateNear(squares);
    }
  }
}

function rescale() {
  nsqwh = slider_sqwh.value();
  sqwh = nsqwh;
  wy = (w + 2) * nsqwh;
  wx = (h + 2) * nsqwh;
  resizeCanvas(wx, wy);
  background(255);
  for (let x = 0; x < squares.length; x++) {
    for (let y = 0; y < squares[x].length; y++) {
      squares[x][y].rescale(nsqwh);
    }
  }
}


// This is to move left and right with the arrow keys
// This is here because I normally play with the browser minimized, which makes
// it so I can't see the whole map.
function translatex() {
  if (keyIsPressed) {
    switch (key) {
      case "'": //right arrow
        xtranslate -= 3;
        background(255);
        break;
      case "%": //left arrow
        xtranslate += 3;
        background(255);
        break;
    }
  }
}
