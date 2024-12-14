let startButton;
let grid;
let cols, rows;
let w = 5;
let hueValue = 200;
let velocityGrid;
let gravity = 0.1;
let currentScene = 'titleScreen'; // Scene tracking variable

let r = 15;
let points = 0;
let timer = 5;
let ball;
let player;

let gameOver = false; // Flag to track game over state

let backgroundImg;
let ballimage;
let backgroundImg2;

function preload() {

  backgroundImg = loadImage('BG(1)-JoshProject.jpg', imgLoaded);
  ballimage = loadImage('cherry.webp');
  backgroundImg2 = loadImage('BG(2) Revised - Jaden Project.jpg', imgLoaded);
}

function imgLoaded(img) {
  console.log('Image Loaded:', img); 
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  velocityGrid = make2DArray(cols, rows);
  ball = createVector(random(r, width - r), random(r, height - r));

  setupConnect4();
}

function draw() {
  console.log(currentScene);

  if (currentScene === 'titleScreen') {
    titleScreen();
  } else if (currentScene === 'sketch1') {
    sketch1();
  } else if (currentScene === 'sketch2') {
    sketch2();
  } else if (currentScene === 'sketch3') {
    sketch3(); 
  }
}

function titleScreen() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  textFont('Courier New');
  text('Welcome to Jaden\'s Favorite Games as a Kid', width / 2, height / 2 - 50);

  if (!startButton) {
    startButton = createButton('BEGIN');
    startButton.position(width / 2 - startButton.width / 2, height / 2 + 20);
    startButton.mousePressed(startSketch1);
  }
}

function startSketch1() {
  startButton.hide();
  currentScene = 'sketch1';
  grid = make2DArray(cols, rows);
  velocityGrid = make2DArray(cols, rows);
}

//KINETIC SAND
function sketch1() {
  background(0);
  handleMouseInput();
  drawParticles();
  updateGrid();

  if (checkIfGridIsFull()) {
    currentScene = 'sketch2';
  }
}

function handleMouseInput() {
  if (mouseIsPressed) {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    let matrix = 5;
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.75) {
          let col = mouseCol + i;
          let row = mouseRow + j;
          if (col >= 0 && col < cols && row >= 0 && row < rows) {
            grid[col][row] = hueValue;
            velocityGrid[col][row] = 1;
          }
        }
      }
    }
    hueValue = (hueValue + 0.5) % 360;
  }
}

function drawParticles() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        square(i * w, j * w, w);
      }
    }
  }
}

function updateGrid() {
  let nextGrid = make2DArray(cols, rows);
  let nextVelocityGrid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let velocity = velocityGrid[i][j];
      let moved = false;

      if (state > 0) {
        let newPos = int(j + velocity);
        for (let y = newPos; y > j; y--) {
          let below = grid[i][y];
          let dir = random(1) < 0.5 ? 1 : -1;
          let belowA = (i + dir >= 0 && i + dir < cols) ? grid[i + dir][y] : -1;
          let belowB = (i - dir >= 0 && i - dir < cols) ? grid[i - dir][y] : -1;

          if (below === 0) {
            nextGrid[i][y] = state;
            nextVelocityGrid[i][y] = velocity + gravity;
            moved = true;
            break;
          } else if (belowA === 0) {
            nextGrid[i + dir][y] = state;
            nextVelocityGrid[i + dir][y] = velocity + gravity;
            moved = true;
            break;
          } else if (belowB === 0) {
            nextGrid[i - dir][y] = state;
            nextVelocityGrid[i - dir][y] = velocity + gravity;
            moved = true;
            break;
          }
        }
      }

      if (state > 0 && !moved) {
        nextGrid[i][j] = state;
        nextVelocityGrid[i][j] = velocityGrid[i][j] + gravity;
      }
    }
  }

  grid = nextGrid;
  velocityGrid = nextVelocityGrid;
}

function checkIfGridIsFull() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

//fruit NINJA
function sketch2() {
  background(0);
  if (backgroundImg2) {
    image(backgroundImg2, 200, 200, 400, 400);
  }

  textSize(20);
  textAlign(LEFT);
  text('Points: ' + points, 20, 30);

  player = createVector(mouseX, mouseY);

  imageMode(CENTER);
  image(ballimage, ball.x, ball.y, r * 2, r * 2); // 

  let len = map(timer, 0, 10, 0, 200);
  rect(15, 50, 20, len);

  if (timer > 0 && points > 0 && !gameOver) {
    timer -= (1 / 60) * map(points, 0, 50, 1, 3);
  }

  if (timer <= 0 && !gameOver) {
    gameOver = true;
    textAlign(CENTER);
    textSize(50);
    text("FINISH", width / 2, height / 2);

    setTimeout(() => {
      currentScene = 'sketch3';
      gameOver = false;
    }, 2000);
  }
}

let connect4Grid = [];
let currentPlayer = 1;
let gameOverConnect4 = false;

function sketch3() {
  background(0);
  if (backgroundImg) {
    image(backgroundImg, 200, 200, 400, 400);
  }

  drawConnect4Grid();

  if (gameOverConnect4) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Player ' + currentPlayer + ' Wins!', width / 2, height / 2);
    noLoop();
  }
}

function drawConnect4Grid() {
  let cellSize = width / 7;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      fill(200);
      stroke(0);
      ellipse(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize * 0.8);
      if (connect4Grid[i][j] === 1) {
        fill(255, 100, 100);
        ellipse(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize * 0.8);
      } else if (connect4Grid[i][j] === 2) {
        fill(2555, 255, 255);
        ellipse(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize * 0.8);
      }
    }
  }
}

function setupConnect4() {
  for (let i = 0; i < 6; i++) {
    connect4Grid[i] = [];
    for (let j = 0; j < 7; j++) {
      connect4Grid[i][j] = 0; 
    }
  }
}

function mousePressed() {
  if (currentScene === 'sketch2' && !gameOver) {
    let d = p5.Vector.dist(player, ball);
    if (d < r) {
      ball = createVector(random(r, width - r), random(r, height - r));
      points++;
      if (points > 1) {
        timer += 0.5;
      }
    }
  }

  if (currentScene === 'sketch3' && !gameOverConnect4) {
    //CONNECT 4!
    let cellSize = width / 7;
    let col = floor(mouseX / cellSize);

    for (let row = 5; row >= 0; row--) {
      if (connect4Grid[row][col] === 0) {
        connect4Grid[row][col] = currentPlayer;
        checkWinner(row, col);
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        break;
      }
    }
  }
}


function checkWinner(row, col) {
  let directions = [
    [0, 1],  
    [1, 0], 
    [1, 1],
    [1, -1]
  ];

  for (let dir of directions) {
    let count = 1;

    for (let i = 1; i < 4; i++) {
      let r = row + dir[0] * i;
      let c = col + dir[1] * i;
      if (r >= 0 && r < 6 && c >= 0 && c < 7 && connect4Grid[r][c] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }
    
    for (let i = 1; i < 4; i++) {
      let r = row - dir[0] * i;
      let c = col - dir[1] * i;
      if (r >= 0 && r < 6 && c >= 0 && c < 7 && connect4Grid[r][c] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }
    if (count >= 4) {
      gameOverConnect4 = true;
      break;
    }
  }
}
