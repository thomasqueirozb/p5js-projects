class Square {
  constructor(x, y) {
    this.x = x * sqwh + sqwh;
    this.y = y * sqwh + sqwh;
    this.width = sqwh;
    this.kill = false;
    this.state = false;
    this.killsnear = 0;
    this.near = [];
    this.pos = createVector(x, y);
    this.flag = false;
  }


  getNear(array) {
    let nlist = [];
    for (var px = this.pos.x - 1; px <= this.pos.x + 1; px++) {
      for (var py = this.pos.y - 1; py <= this.pos.y + 1; py++) {
        try {
          let element = array[px][py];
          if (element && element != this) {
            nlist.push(element);
          }
        } catch (e) {}
      }
    }
    return nlist;
  }

  calculateNear(Ar) {
    // Calculate killsnear and near
    this.near = this.getNear(Ar);
    let bombsq = 0;
    if (!this.kill) {
      // Calculate how many squares are bombs
      for (let item of this.near) {
        if (item.kill) {
          bombsq++;
        }
      }
    }
    this.killsnear = bombsq;
  }


  posin(x, y) {
    return (this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.width);
  }


  renderNumber() {
    if (this.state && !this.kill && this.killsnear != 0) {

      push();
      noStroke();
      if (this.killsnear == 1) {
        fill(0, 0, 255);
      } else if (this.killsnear == 2) {
        fill(0, 255, 0);
      } else if (this.killsnear == 3) {
        fill(255, 0, 0);
      } else if (this.killsnear == 4) {
        fill(50, 0, 100);
      } else if (this.killsnear == 5) {
        fill(128, 0, 0);
      } else if (this.killsnear == 6) {
        fill(63, 244, 217);
      } else {
        fill(50);
      }
      textSize(this.width);
      textAlign(CENTER, TOP);

      text(this.killsnear, this.x + this.width / 2, this.y);
      pop();
    }
  }
  renderRect() {
    rect(this.x, this.y, this.width, this.width);
  }
  getFill() {
    if (this.state == false) {
      if (!this.flag) {
        fill(189);
      } else {
        fill(255, 0, 0);
      }
    } else {
      if (!this.kill) {
        fill(160);
      } else {
        fill(10);
      }
    }

  }


  rescale(newsqwh) {
    this.width = newsqwh;
    this.x = this.pos.x * this.width + this.width;
    this.y = this.pos.y * this.width + this.width;
  }

  click() {
    if (!this.flag) {
      if (!this.state) {
        this.state = true;
        if (!this.kill && this.killsnear == 0) {
          for (let item of this.near) {
            squares[item.pos.x][item.pos.y].click();
          }
        }
      }
    } else {
      this.flag = false
    }

  }
  update() {
    strokeWeight(2);
    stroke(123);
    this.getFill();
    this.renderRect();
    this.renderNumber();
  }
}
