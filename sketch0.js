function setup() {
  createCanvas(400, 400, WEBGL);

  describe('A white box drawn against a gray background.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  ambientLight(128, 128, 128);
  directionalLight(128, 128, 128, 0, 1, 0);
  
fill('#222222');
 cylinder(25, 160, 300, 0);
  
 fill('black') 
 cylinder(22, 165, 300, 0);

fill('brown')
  box(90,150);
}