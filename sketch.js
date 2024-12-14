function setup() {
  createCanvas(400, 400);
}

function draw() {
  
  background('brown'); 

  let faceWidth = map(mouseX, 0, width, 10, 400); 
  let faceHeight = map(mouseY, 0, height, 10, 400); 

  fill('#FFFDD0'); 
  ellipse(200, 200, faceWidth, faceHeight);

  let eyeWidth = faceWidth / 2;
  let eyeHeight = faceHeight / 2; 
  let pupilWidth = eyeWidth / 4; 
  let pupilHeight = eyeHeight / 2;

  fill('#ffffff'); 
  ellipse(200 - faceWidth / 4, 200, eyeWidth, eyeHeight);
  fill('black');
  ellipse(200 - faceWidth / 4, 200, pupilWidth, pupilHeight);

  fill('#ffffff'); 
  ellipse(200 + faceWidth / 4, 200, eyeWidth, eyeHeight);
  fill('black'); 
  ellipse(200 + faceWidth / 4, 200, pupilWidth, pupilHeight);
}