let playerScore = 0;
let paddle;
let ball;
let bricks = [];
let bgmusic;

function preload(){
  bgmusic = loadSound("bgmusic.wav");

}


function setup() {
  createCanvas(640, 480);
  bgmusic.play();
  gameSetup();
  let button = createButton("reset");
  button.mousePressed(gameSetup);

//function for what happens everytime the game resets
  function gameSetup(){
    playerScore = 0;
    timer = 3;
    let colors = [color("#EDF67D"), color("#CA7DF9"), color("#724CF9"), color("#473978")];

    paddle = new Paddle();
    ball = new Ball();
    bricks = drawBricks(colors);

    //drawing the brick array with random colors
    function drawBricks(colors){
      const bricks = []
      const rows = 4;
      const bricksPerRow = 8;
      const brickWidth = width/bricksPerRow;
      const brickHeight = 40;
      for (let j=0; j < rows; j++){
        for(let i=0; i<bricksPerRow; i++){
          brick = new Brick(createVector((brickWidth * i+brickWidth/2), (brickHeight * j+brickHeight/2)), brickWidth*random(0.5,1), brickHeight*random(0.5,1), colors[floor(random(0, colors.length))]);
          bricks.push(brick);
            }
          }
          return bricks;
        }
      }
}

function draw() {
  background("#FCD8F0");

  paddle.display();
  paddle.move();

  ball.display();
  ball.move();

  drawScore();

  // When the ball collides with the brick, remove brick
  for (let i = bricks.length - 1; i >=0; i--){
    const brick = bricks[i]
    brick.display()
      if (brick.collidesWith(ball)){
        ball.speed.y = ball.speed.y *  -1;
        bricks.splice(i,1);
        playerScore = playerScore + 1;
      }
    }

//When all bricks are gone, stop the ball and display You Win text
  if (bricks.length<=0){
    ball.speed.y = ball.speed.y *  0;
    ball.speed.x = ball.speed.x * 0;
    drawYouWin();
  }


}

//Functions for Drawing Text

function drawScore() {
  textSize(20);
  textStyle(ITALIC);
  textFont("Georgia");
  textAlign(LEFT);
  fill("black");
  noStroke();
  text("Score:" + playerScore, 10, height-20);
}


function drawGameOver(){
  textSize(50);
  textStyle(BOLD);
  textFont("Georgia");
  textAlign(CENTER);
  fill("white");
  stroke("hotpink");
  text("GAME OVER", width/2, height/2);
}

function drawYouWin(){
  textSize(50);
  textStyle(BOLD);
  textFont("Georgia");
  textAlign(CENTER);
  fill("yellow");
  stroke("hotpink");
  text("You Win!", width/2, height/2);
}

//Classes for Paddle, Ball, and Brick

class Paddle{
  constructor(){
    this.width = 125;
    this.height = 25;
    this.color = color("#87D37C");
    this.position = createVector((width/2) - (this.width/2), height - 35);
    this.speed = 15;
  }

  display(){
    fill(this.color);
    stroke(255);
    rectMode(CORNER)
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  move(){
    if(keyIsDown(LEFT_ARROW)){
      if (paddle.position.x >= 0){
        paddle.position.x -= this.speed;
        }
      }
    if (keyIsDown(RIGHT_ARROW)){
      if (paddle.position.x <= width-paddle.width){
        paddle.position.x += this.speed;
        }
      }
  }
}

class Ball {
  constructor() {
    this.position = createVector(width/2, height/2);
    this.color = color("#87D37C");
    this.size = 15;
    this.speed = createVector(5,4)
  }

  display(){
    fill(this.color);
    noStroke();
    ellipse(this.position.x,this.position.y,this.size);
  }

  move(){
    //animation of ball on x and y
      this.position.y += this.speed.y;
      this.position.x += this.speed.x;

    // if ball hits the paddle
    if (this.position.y >= paddle.position.y){
      if(this.position.x >= paddle.position.x && this.position.x <= paddle.position.x + paddle.width){
        this.speed.y = this.speed.y *  -1;
        }
      //if ball hits the bottom of the screen
      else {
        this.speed.y = this.speed.y *  0;
        this.speed.x = this.speed.x *  0;
        drawGameOver();

      }
    }
    //when the ball touches the sides of the screen
    if(this.position.x >= width || this.position.x <= 0){
      this.speed.x = this.speed.x *  -1;
      }

    //when the ball touches the top of the screen
    if (this.position.y<=0){
      this.speed.y = this.speed.y *  -1;
      }
  }


}

class Brick {
  constructor(position, width, height, color ){
    this.width = width;
    this.height = height;
    this.color = color;
    this.position = position;

  }

  display(){
    fill(this.color);
    strokeWeight(2)
    stroke(255)
    rectMode(CENTER)
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  collidesWith (ball){
    if(ball.position.y - ball.size/2 <= this.position.y + this.height/2 &&
        ball.position.y + ball.size/2 >= this.position.y &&
        ball.position.x + ball.size/2 >= this.position.x  &&
        ball.position.x - ball.size/2 <= this.position.x + this.width/2){
          return true;
        }
  }
}
