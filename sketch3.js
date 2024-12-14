let sleepHours = [6, 5, 7, 5, 8, 8, 9];

let daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let maxBarHeight;
let barHeights = [];
let animationSpeed = 0.025;

function setup() {
  createCanvas(600, 600);
  maxBarHeight = height - 60;
  
  for (let i = 0; i < sleepHours.length; i++) {
    barHeights[i] = 0;
  }
  noLoop();
}

function draw() {
  background(220);
  
  textFont('courier new')
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text("Sleep Hours in a Week", width / 2, 30);

  let barWidth = width / sleepHours.length;


  let animationComplete = true;
  
  for (let i = 0; i < sleepHours.length; i++) {
    
    let targetHeight = map(sleepHours[i], 0, 10, 0, maxBarHeight);
    
    if (barHeights[i] < targetHeight) {
      barHeights[i] += (targetHeight - barHeights[i]) * animationSpeed; 
      animationComplete = false;
    }

    fill('black');
    rect(i * barWidth, height - barHeights[i] - 40, barWidth - 5, barHeights[i]);

    fill(0);
    textAlign(CENTER);
    text(floor(sleepHours[i]), i * barWidth + barWidth / 2, height - barHeights[i] - 45);
  }
  
  fill(0);
  textAlign(CENTER);
  for (let i = 0; i < daysOfWeek.length; i++) {
    text(daysOfWeek[i], i * barWidth + barWidth / 2, height - 5);
  }

  if (!animationComplete) {
    requestAnimationFrame(draw);
  }
}

function mousePressed() {
  loop(); 
}