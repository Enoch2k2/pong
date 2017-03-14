var animate = window.requestAnimationFrame;
var canvas = document.getElementById('game_canvas');
const START = document.getElementById('start');
const WELCOME = document.getElementById('welcome');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const PLAYER_SCORE = document.getElementById('playerScore');
const COMPUTER_SCORE = document.getElementById('computerScore');
var playerScore = 0;
var computerScore = 0;
var keysDown = {};
function start(){
  START.style.display = 'none'; // remove Start from screen
  WELCOME.style.display = 'none'; // remove the welcome from screen
  canvas.style.display = 'block'; // show the canvas
  PLAYER_SCORE.innerHTML = 'Player Score: 0';
  COMPUTER_SCORE.innerHTML = 'Computer Score: 0';
  window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
  });

  window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
  });
  animate(step);
}

function step(){
  update(); // updates some attributes for player, ball, ai
  render(); // start animating the canvas
  animate(step);
}

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

Paddle.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0){ // all the way to the top
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > GAME_HEIGHT){ // all the way to the bottom
    this.y = GAME_HEIGHT - this.height;
    this.y_speed = 0;
  }
};

function Player(){
  this.paddle = new Paddle(50, 255, 25, 75);
}

function Computer(){
  this.paddle = new Paddle((GAME_WIDTH - 75), 255, 25, 75);
}

Player.prototype.update = function () {
  for(var key in keysDown){
    var value = Number(key);
    if(value == UP_ARROW){
      this.paddle.move(0, -4);
    } else if (value == DOWN_ARROW){
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
  }
}

Computer.prototype.update = function(ball){
  var y_pos = ball.y;
  var diff = -((this.paddle.y + (this.paddle.height/2)) - y_pos);
  if(diff < 0 && diff < -4){
    diff = -5
  } else if (diff > 0 && diff > 4){
    diff = 5;
  }
  this.paddle.move(0, diff);
  if(this.paddle.y < 0){
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > GAME_HEIGHT){
    this.paddle.y = GAME_HEIGHT - this.paddle.height;
  }
}

Player.prototype.render = function() {
  this.paddle.render();
}

Computer.prototype.render = function() {
  this.paddle.render();
}

function Ball(x, y){
  this.x = x;
  this.y = y;
  this.x_speed = -3;
  this.y_speed = 0;
  this.radius = 5;
}

Ball.prototype.render = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  ctx.fillStyle = "white";
  ctx.fill();
}

Ball.prototype.update = function(paddle1, paddle2){
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.y - 5 < 0){ //hitting top wall
    this.y = 5;
    this.y_speed = -this.y_speed;
  } else if (this.y + 5 > GAME_HEIGHT){ // hitting bottom wall
    this.y = GAME_HEIGHT - 5;
    this.y_speed = -this.y_speed;
  }

  if(this.x < 0){ // scoring left side
    this.x_speed = -3;
    this.y_speed = 0;
    this.x = 400;
    this.y = 300;
    COMPUTER_SCORE.innerHTML = `Computer Score: ${computerScore+=1}`
  } else if (this.x > GAME_WIDTH){ // scoring right side;
    this.x_speed = -3;
    this.y_speed = 0;
    this.x = 400;
    this.y = 300;
    PLAYER_SCORE.innerHTML = `Player Score: ${playerScore+=1}`
  }

  if(top_x < 400){
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.x_speed = 3;
      this.y_speed += (paddle1.y_speed / 2);
      this.x += this.x_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      this.x_speed = -3;
      this.y_speed += (paddle2.y_speed / 2);
      this.x += this.x_speed;
    }
  }
}

var player = new Player();
var computer = new Computer();
var ball = new Ball(390, 290);

function render(){
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  player.render();
  computer.render();
  ball.render();
}

function update(){
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
}
