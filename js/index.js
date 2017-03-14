var canvas = document.getElementById('game_canvas');
const START = document.getElementById('start');
const WELCOME = document.getElementById('welcome');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const UP_ARROW = 38;
const DOWN_ARROW = 40;

var player = [50, 255];
var ai = [GAME_WIDTH - 75, 255];
var ball = [390, 290];
var playerMove = false;

function start(){
  START.style.display = 'none'; // remove Start from screen
  WELCOME.style.display = 'none'; // remove the welcome from screen
  canvas.style.display = 'block'; // show the canvas
  window.addEventListener('keydown', movePlayer); // add the up and down keys for player ovement
  drawGame(); // start animating the canvas
}

function movePlayer(e){
  if(e.which == UP_ARROW || e.which == DOWN_ARROW){
    e.preventDefault();
    e.stopPropagation();
  }

  if(e.which == UP_ARROW){
    movePlayerUp();
  } else if (e.which == DOWN_ARROW){
    movePlayerDown();
  }
}

function movePlayerUp(){
  // animate player up
  window.requestAnimationFrame(function(){
    if(player[1] > 20){
      player[1] -= 10;
    }
  });
}

function movePlayerDown(){
  // animate player down
  window.requestAnimationFrame(function(){
    if(player[1] < GAME_HEIGHT - 95){
      player[1] += 10;
    }
  });
}

function drawGame(){
  // clear game to refresh objects being drawn
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // draw player
  ctx.fillStyle = 'white';
  ctx.fillRect(player[0], player[1], 25, 75);
  // draw ai
  ctx.fillRect(ai[0], ai[1], 25, 75);

  // draw ball
  ctx.fillRect(ball[0], ball[1], 10, 10)

  // top wall
  ctx.fillRect(0, 0, GAME_WIDTH, 20);

  // bottom wall
  ctx.fillRect(0, GAME_HEIGHT - 20, GAME_WIDTH, 20);

  // left top wall
  ctx.fillRect(0, 0, 20, 150);

  // left bottom wall
  ctx.fillRect(0, GAME_HEIGHT - 150, 20, 150);

  // right top wall
  ctx.fillRect(GAME_WIDTH - 20, 0, 20, 150);

  // right bottom wall
  ctx.fillRect(GAME_WIDTH - 20, GAME_HEIGHT - 150, 20, 150);

  // refresh for animation
  window.requestAnimationFrame(drawGame);
}
