let bigCircle, smallCircle;
let w = 40; // Width of each square
let time;

function setup() {
  createCanvas(600, 600);
   bigCircle = width / w;
   smallCircle = height / w;
  noStroke();
}

function draw() {
  
  background(255);
  time = frameCount/10;

  for (let i = 0; i < bigCircle; i++) {
    for (let j = 0; j < smallCircle; j++) {
      let x = i * w;
      let y = j * w;
      
      if ((i + j) % 2 == 0) {
        
        fill(100 + 50 * sin(time + (i + j) * 0.5)); 
        
        ellipse(x + w / 2, y + w / 2, w * 0.8, w * 0.8);
      } else {
        fill(200 + 50 * sin(time + (i + j) * 0.5));
        
        ellipse(x + w / 2, y + w / 2, w * 0.4, w * 0.4);
      }
    }
  }
}