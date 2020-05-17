let bubbles=[];

function setup() {
	wx=windowWidth
	wy=windowHeight
	createCanvas(wx, wy);
}

function draw() {
	background(0);
	for (let i of bubbles){
		i.update();
	}

	// for (let i=0; i < bubbles.length;i++){
	// 		console.log(i)
	// 		bubbles[i].update();
	// }

}

class Bubble {
	constructor(xi,yi,rad) {
		this.x=xi;
		this.y=yi;
		this.r=rad
		this.state=false
	}
	nextpos(){
		this.x+=random(-1,1);
		this.y+=random(-1,1);
	}
	render(){
		if (this.state==false){
		noFill();
		strokeWeight(4);
		stroke(255);
	}
		else{
			noStroke();
			fill(255,0,0);
		}
		ellipse(this.x,this.y,this.r*2);
	}
	clicked(mx,my){
		let d=dist(mx,my,this.x,this.y);
		if (d<this.r){
			return true
		}
		return false
	}
	update(){
		this.nextpos();
		this.render();
	}
}

function mousePressed(){
	for (let i of bubbles){
		if (i.clicked(mouseX,mouseY)==true){
			i.state=!i.state;
			break
		}
	}
}
function keyPressed(){
	if (keyCode==46){
		for (var i=bubbles.length-1;i>=0;i--){
			print(i)
			if (bubbles[i].clicked(mouseX,mouseY)==true){
				bubbles.splice(i,1);
				// break
			}
		}
	}
	if (keyCode==13){
		bubbles.push(new Bubble(random(wx),random(wy),random(20,40)))
	}
}
// function mouseDragged(){
// 	bubbles.push(new Bubble(mouseX,mouseY,random(20,40)))
// }
