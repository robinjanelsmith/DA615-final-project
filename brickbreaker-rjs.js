let playerScore = 0;
let paddle;
let ball;
let bricks = [];

function setup() {
  createCanvas(640, 480);
  let colors = [];
  colors.push (color("MediumPurple"))
  colors.push (color("RoyalBlue"))
  colors.push (color("LightGreen"))
  colors.push (color("Yellow"))


  paddle = new Paddle();
  ball = new Ball()
  const rows = 4;
  const bricksPerRow = 8;
  const brickWidth = width/bricksPerRow;
for (let j=0; j < rows; j++){
  for(let i=0; i<bricksPerRow; i++){
    brick = new Brick(createVector((brickWidth * i), (25 * j)), brickWidth, 25, colors[floor(random(0, colors.length))]);
    bricks.push(brick);
  }

}
}

function draw() {
  background("LightSkyBlue");



  paddle.display();
  paddle.move();

  ball.display();
  ball.move();

  // bricks.forEach(brick => {
  //   brick.display()
  //   brick.collideWith(ball)
  // })

for (let i = bricks.length - 1; i >=0; i--){
const brick =bricks[i]
  brick.display()
  if (brick.collideWith(ball)){
    ball.speed.y = ball.speed.y *  -1;
    bricks.splice(i,1)
    playerScore += 1
  }
}

textSize(20);
fill("black");
noStroke();
text("Score:" + playerScore, 10, height-20);
}



class Paddle{
  constructor(){
    this.width = 125;
    this.height = 25;
    this.color = color(255);
    this.position = createVector((width/2) - (this.width/2), height - 35);
    this.speed = 15;
  }

  display(){
    fill(this.color);
    stroke("hotpink");
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
    this.color = color("hotpink");
    this.size = 15;
    this.speed = createVector(4,3)
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
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  collideWith (ball){
    if(ball.position.y - ball.size <= this.position.y + this.height &&
        ball.position.y + ball.size >= this.position.y &&
        ball.position.x + ball.size >= this.position.x &&
        ball.position.x - ball.size <= this.position.x + this.width){
          return true;
        }
  }
}
