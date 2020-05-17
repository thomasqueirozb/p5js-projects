function setup() {
  wx = min(windowWidth,windowHeight);
  wy = min(windowWidth,windowHeight);

  // createCanvas(wx*(1+pow(3,0.5)/2), wx);
  createCanvas(wx, wx*(pow(3,0.5)/2));

  // strokeWeight(15);
  // rect(0, 0, wx, wy);
  strokeWeight(1);
  colorMode(HSB);
  // p1 = new Point(width / 2, height * 0.05);
  // p2 = new Point(width * 0.95, height * 0.95);
  // p3 = new Point(width * 0.05, height * 0.95);

  p1 = new Point(width / 2, 0)//height-width*pow(3,0.5)/2);
  // p1 = new Point(width / 2,0);
  p2 = new Point(width, height);
  p3 = new Point(0, height);
  // p4 = new Point(width * 0.05, height * 0.05);
  // p1 = new Point(width * 0.95, height * 0.05);
  // stroke(0);

  moving = new Point(width / 2, height / 2);
  pa = [p1, p2, p3];
  // pa.push(p4)
}

function lineto(point1, point2, weight = 1) {
  strokeWeight(weight);
  line(point1.x, point1.y, point2.x, point2.y);
}

class Point {
  constructor(xi, yi) {
    this.x = xi;
    this.y = yi;
  }
  nextpoint() {
    return pa[int(random(pa.length))]
  }
  next() {
    let np;

    np = this.nextpoint()
    this.x += (np.x - this.x) / 2;
    this.y += (np.y - this.y) / 2;
  }
  update() {
    this.next();
		stroke(map(this.y,0,height,0,255),255,255)
    point(this.x, this.y);
  }
}

let speed=10
function draw() {
  for (var i = 0; i < speed; i++) {
    moving.update();
  }
}
function distance(){
  print(dist(p2.x,p2.y,p3.x,p3.y),dist(p1.x,p1.y,p3.x,p3.y),dist(p2.x,p2.y,p1.x,p1.y))
}
function keyPressed(){
  if (key=="R"){background(255)}
}

// function change(r,g,b,nr,ng,nb){
//   loadPixels();
//   for (let x=0;x<width;x++){
//     for (let y=0;y<height;y++){
//         index=x+y*width;
//         col=pixels[index];
//         if (red(col)==r && green(col)==g && blue(col)==b){
//           pixels[col]=color(nr,ng,nb);
//         }
//     }
//   }
//
//   updatePixels();
// }
