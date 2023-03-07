let sprites1;
let walkAnimation1;
let animated = [];
const GameState = {
  Start: "Start", Play: "Play", Over: "Over"
};
let game = { score: 0, maxScore: 0, maxTime: 30, elapsed: 0, total: 20, state: GameState.Start};

function preload() {
  spriteb = loadImage("sprites/spriteb.png");
}

function setup() {
  createCanvas(1000, 1000);
  imageMode(CENTER);
  angleMode(DEGREES);
  reset();
}

function reset() {
  game.elapsed = 0;
  game.score = 0;
  game.total = random(20,40);

  animationed = [];
  for(let i = 0; i < game.total; i++) {
  animated[i] = new WalkAnimation(spriteb, 50, 50, random(50, 850), random(50, 850), 6, random(1, 5), 10, random([0, 1]));
  }
}

function draw() {
  switch(game.state) {
      
    case GameState.Play:  
      background(220);
      for(let i = 0; i < game.total; i++) {
      animated[i].draw();
      }
      fill(0);
      textSize(100);
      text(game.score, 900, 100);
      let currentTime = game.maxTime - game.elapsed;
      text(ceil(currentTime), 50,100);
      game.elapsed += deltaTime / 1000;
      if(currentTime < 0) {
        game.state = GameState.Over;
      }
      break;
      
    case GameState.Over:
      game.maxScore = max(game.score, game.maxScore);
      background(0);
      fill(255);
      textSize(150);
      textAlign(CENTER);
      text("Game Over",500,500);
      textSize(100);
      text("Score: " + game.score, 500, 700);
      text("Max Score: " + game.maxScore, 500, 800);
      break;
      
    case GameState.Start:
      background(0);
      fill(255);
      textSize(200);
      textAlign(CENTER);
      text("Bug Squish",500,500);
      textSize(100);
      text("Press Any Key",500,700);
      break;
  }
}

function keyPressed() {
  switch(game.state) {
      
    case GameState.Start:
      game.state = GameState.Play;
      break;
      
    case GameState.Over:
      reset();
      game.state = GameState.Play;
      break;
  }
}

function mousePressed() {
  for(let i = 0; i < animated.length; i++) {
    let contains = animated[i].contains(mouseX, mouseY);
    if(contains) {
      animated[i].stop();
      game.score += 1;
      for(let j = 0; j < animated.length; j++) {
        animated[j].speed += 0.5;
      }
    }
  }
}

class WalkAnimation {
  constructor(sprites, sx, sy, dx, dy, animation, speed, framerate, vt = false) {
    this.sprites = sprites;
    this.sx = sx;
    this.sy = sy;
    this.dx = dx;
    this.dy = dy;
    this.a = 0;
    this.b = 0;
    this.animation = animation;
    this.current = 0;
    this.direction = 1;
    this.moves = 1;
    this.speed = speed;
    this.framerate = framerate * speed;
    this.vt = vt;
  }
  
  draw() {
    this.b = (this.moves != 0) ? this.current % this.animation : this.b;
    push();
    translate(this.dx, this.dy);
    if(this.vt) {
      rotate(90); 
    }
    scale(this.direction, 1);
    image(this.sprites, 0, 0, this.sx, this.sy, this.a * this.sx, this.b * this.sy, this.sx, this.sy); 
    pop();
    
    let pFramerate = round(frameRate() / this.framerate);
    if(frameCount % pFramerate == 0) {
      this.current ++;
    }
    
    if(this.vt) {
      this.dy += this.moves * this.speed;
    }
    else {
      this.dx += this.moves * this.speed;
    }
    
    if(this.dx > width - this.sx / 2) {
      this.moveLeft();
    }
    else if(this.dx < this.sx / 2) {
      this.moveRight();
    }
    if(this.dy > height - this.sy / 2) {
      this.moveLeft();
    }
    else if(this.dy < this.sy / 2) {
      this.moveRight();
    }
 }
  
  moveRight() {
    this.moves = 1;
    this.direction = 1;
  }
  
  moveLeft() {
    this.moves = -1;
    this.direction = -1;
  } 
  
  contains(x, y) {
    let inX = x >= this.dx - this.sx / 2 && x <= this.dx + this.sx / 2;
    let inY = y >= this.dy - this.sy / 2 && y <= this.dy + this.sy / 2;
    return inX && inY;
  }
  
  stop() {
    this.moves = 0;
    this.b = 6;
  }
}