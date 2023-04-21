let sprites1;
let walkAnimation1;
let animated = [];
const GameState = {
  Start: "Start", Play: "Play", Over: "Over"
};
let game = { score: 0, maxScore: 0, maxTime: 30, elapsed: 0, total: 20, state: GameState.Start};

let cheby = new Tone.Chebyshev(1).toDestination();
let startSound = new Tone.DuoSynth().toMaster();
let overSound = new Tone.Synth().toMaster();
let squishSound = new Tone.MetalSynth().connect(cheby);
let playSound = new Tone.AMSynth().toMaster();
let missSound = new Tone.DuoSynth().toMaster();
let playNow;
let startNow;
let overNow;
let outVal = 0;
let inVal;
let serial;
function preload() {
  spriteb = loadImage("sprites/spriteb.png");
}

function setup() {
  createCanvas(1000, 1000);
  imageMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  Tone.start();
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
  serial.list();
  serial.open('COM7');
  outVal = 0;
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
  outVal = 0;
}

function draw() {
  serial.write(outVal);
  ranVal = 1;
  switch(game.state) {
      
    case GameState.Play:
      playNow = Tone.now();
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
        overSound.triggerAttackRelease('C2', '8n');
        game.state = GameState.Over;
      }

      break;
      
    case GameState.Over:
      overNow = Tone.now();
      overSound.triggerAttackRelease('F1', '8n', overNow);
      overSound.triggerAttackRelease('G1', '8n', overNow + 0.25);
      overSound.triggerAttackRelease('E1', '8n', overNow + 0.25);
      overSound.triggerAttackRelease('C1', '8n', overNow + 0.6);
      overSound.triggerAttackRelease('F1', '8n', overNow + 1);
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
      Tone.start();
      background(0);
      fill(255);
      textSize(200);
      textAlign(CENTER);
      text("Bug Squish",500,500);
      textSize(100);
      text("Press Any Key",500,700);
      break;
  }
  if (inVal == 5) {
      
    if (game.state == GameState.Start) {
      startNow = Tone.now();
      startSound.triggerAttackRelease('C5', '8n', startNow);
      startSound.triggerAttackRelease('D5', '8n', startNow + 0.25);
      startSound.triggerAttackRelease('F5', '8n', startNow + 0.5);
      startSound.triggerAttackRelease('E5', '8n', startNow + 0.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 1);
      playSound.triggerAttackRelease('C5', '8n', startNow + 1.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 1.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 2);
      playSound.triggerAttackRelease('C5', '8n', startNow + 2.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 2.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 3);
      playSound.triggerAttackRelease('C5', '8n', startNow + 3.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 3.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 3.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 4);
      playSound.triggerAttackRelease('D5', '8n', startNow + 4.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 4.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 4.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 5);
      playSound.triggerAttackRelease('C7', '8n', startNow + 5.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 5.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 5.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 6);
      playSound.triggerAttackRelease('C5', '8n', startNow + 6.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 6.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 7);
      playSound.triggerAttackRelease('C5', '8n', startNow + 7.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 7.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 8);
      playSound.triggerAttackRelease('C5', '8n', startNow + 8.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 8.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 8.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 9);
      playSound.triggerAttackRelease('D5', '8n', startNow + 9.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 9.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 9.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 10);
      playSound.triggerAttackRelease('C7', '8n', startNow + 10.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 10.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 10.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 11);
      playSound.triggerAttackRelease('C5', '8n', startNow + 11.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 11.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 12);
      playSound.triggerAttackRelease('C5', '8n', startNow + 12.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 12.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 13);
      playSound.triggerAttackRelease('C5', '8n', startNow + 13.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 13.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 13.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 14);
      playSound.triggerAttackRelease('D5', '8n', startNow + 14.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 14.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 14.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 15);
      playSound.triggerAttackRelease('C7', '8n', startNow + 15.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 15.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 15.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 16);
      playSound.triggerAttackRelease('C5', '8n', startNow + 16.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 16.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 17);
      playSound.triggerAttackRelease('C5', '8n', startNow + 17.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 17.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 18);
      playSound.triggerAttackRelease('C5', '8n', startNow + 18.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 18.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 18.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 19);
      playSound.triggerAttackRelease('D5', '8n', startNow + 19.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 19.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 19.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 20);
      playSound.triggerAttackRelease('C7', '8n', startNow + 20.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 20.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 20.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 21);
      playSound.triggerAttackRelease('C5', '8n', startNow + 21.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 21.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 22);
      playSound.triggerAttackRelease('C5', '8n', startNow + 22.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 22.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 23);
      playSound.triggerAttackRelease('C5', '8n', startNow + 23.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 23.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 23.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 24);
      playSound.triggerAttackRelease('D5', '8n', startNow + 24.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 24.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 24.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 25);
      playSound.triggerAttackRelease('C7', '8n', startNow + 25.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 25.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 25.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 26);
      playSound.triggerAttackRelease('C5', '8n', startNow + 26.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 26.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 27);
      playSound.triggerAttackRelease('C5', '8n', startNow + 27.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 27.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('C5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('D5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 29);
      playSound.triggerAttackRelease('C7', '8n', startNow + 29.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 29.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 29.75);
      game.state = GameState.Play;
    }
    else if (game.state == GameState.Over) {
      reset();
      startNow = Tone.now();
      startSound.triggerAttackRelease('C5', '8n', startNow);
      startSound.triggerAttackRelease('D5', '8n', startNow + 0.25);
      startSound.triggerAttackRelease('F5', '8n', startNow + 0.5);
      startSound.triggerAttackRelease('E5', '8n', startNow + 0.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 1);
      playSound.triggerAttackRelease('C5', '8n', startNow + 1.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 1.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 2);
      playSound.triggerAttackRelease('C5', '8n', startNow + 2.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 2.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 3);
      playSound.triggerAttackRelease('C5', '8n', startNow + 3.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 3.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 3.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 4);
      playSound.triggerAttackRelease('D5', '8n', startNow + 4.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 4.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 4.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 5);
      playSound.triggerAttackRelease('C7', '8n', startNow + 5.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 5.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 5.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 6);
      playSound.triggerAttackRelease('C5', '8n', startNow + 6.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 6.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 7);
      playSound.triggerAttackRelease('C5', '8n', startNow + 7.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 7.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 8);
      playSound.triggerAttackRelease('C5', '8n', startNow + 8.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 8.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 8.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 9);
      playSound.triggerAttackRelease('D5', '8n', startNow + 9.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 9.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 9.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 10);
      playSound.triggerAttackRelease('C7', '8n', startNow + 10.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 10.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 10.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 11);
      playSound.triggerAttackRelease('C5', '8n', startNow + 11.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 11.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 12);
      playSound.triggerAttackRelease('C5', '8n', startNow + 12.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 12.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 13);
      playSound.triggerAttackRelease('C5', '8n', startNow + 13.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 13.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 13.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 14);
      playSound.triggerAttackRelease('D5', '8n', startNow + 14.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 14.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 14.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 15);
      playSound.triggerAttackRelease('C7', '8n', startNow + 15.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 15.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 15.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 16);
      playSound.triggerAttackRelease('C5', '8n', startNow + 16.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 16.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 17);
      playSound.triggerAttackRelease('C5', '8n', startNow + 17.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 17.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 18);
      playSound.triggerAttackRelease('C5', '8n', startNow + 18.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 18.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 18.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 19);
      playSound.triggerAttackRelease('D5', '8n', startNow + 19.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 19.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 19.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 20);
      playSound.triggerAttackRelease('C7', '8n', startNow + 20.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 20.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 20.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 21);
      playSound.triggerAttackRelease('C5', '8n', startNow + 21.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 21.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 22);
      playSound.triggerAttackRelease('C5', '8n', startNow + 22.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 22.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 23);
      playSound.triggerAttackRelease('C5', '8n', startNow + 23.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 23.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 23.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 24);
      playSound.triggerAttackRelease('D5', '8n', startNow + 24.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 24.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 24.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 25);
      playSound.triggerAttackRelease('C7', '8n', startNow + 25.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 25.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 25.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 26);
      playSound.triggerAttackRelease('C5', '8n', startNow + 26.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 26.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 27);
      playSound.triggerAttackRelease('C5', '8n', startNow + 27.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 27.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('C5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('D5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 29);
      playSound.triggerAttackRelease('C7', '8n', startNow + 29.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 29.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 29.75);
      game.state = GameState.Play;
    }
  }
}


function keyPressed() {
  switch(game.state) {
      
    case GameState.Start:
      startNow = Tone.now();
      startSound.triggerAttackRelease('C5', '8n', startNow);
      startSound.triggerAttackRelease('D5', '8n', startNow + 0.25);
      startSound.triggerAttackRelease('F5', '8n', startNow + 0.5);
      startSound.triggerAttackRelease('E5', '8n', startNow + 0.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 1);
      playSound.triggerAttackRelease('C5', '8n', startNow + 1.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 1.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 2);
      playSound.triggerAttackRelease('C5', '8n', startNow + 2.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 2.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 3);
      playSound.triggerAttackRelease('C5', '8n', startNow + 3.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 3.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 3.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 4);
      playSound.triggerAttackRelease('D5', '8n', startNow + 4.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 4.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 4.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 5);
      playSound.triggerAttackRelease('C7', '8n', startNow + 5.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 5.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 5.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 6);
      playSound.triggerAttackRelease('C5', '8n', startNow + 6.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 6.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 7);
      playSound.triggerAttackRelease('C5', '8n', startNow + 7.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 7.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 8);
      playSound.triggerAttackRelease('C5', '8n', startNow + 8.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 8.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 8.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 9);
      playSound.triggerAttackRelease('D5', '8n', startNow + 9.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 9.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 9.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 10);
      playSound.triggerAttackRelease('C7', '8n', startNow + 10.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 10.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 10.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 11);
      playSound.triggerAttackRelease('C5', '8n', startNow + 11.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 11.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 12);
      playSound.triggerAttackRelease('C5', '8n', startNow + 12.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 12.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 13);
      playSound.triggerAttackRelease('C5', '8n', startNow + 13.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 13.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 13.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 14);
      playSound.triggerAttackRelease('D5', '8n', startNow + 14.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 14.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 14.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 15);
      playSound.triggerAttackRelease('C7', '8n', startNow + 15.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 15.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 15.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 16);
      playSound.triggerAttackRelease('C5', '8n', startNow + 16.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 16.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 17);
      playSound.triggerAttackRelease('C5', '8n', startNow + 17.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 17.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 18);
      playSound.triggerAttackRelease('C5', '8n', startNow + 18.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 18.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 18.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 19);
      playSound.triggerAttackRelease('D5', '8n', startNow + 19.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 19.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 19.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 20);
      playSound.triggerAttackRelease('C7', '8n', startNow + 20.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 20.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 20.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 21);
      playSound.triggerAttackRelease('C5', '8n', startNow + 21.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 21.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 22);
      playSound.triggerAttackRelease('C5', '8n', startNow + 22.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 22.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 23);
      playSound.triggerAttackRelease('C5', '8n', startNow + 23.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 23.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 23.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 24);
      playSound.triggerAttackRelease('D5', '8n', startNow + 24.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 24.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 24.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 25);
      playSound.triggerAttackRelease('C7', '8n', startNow + 25.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 25.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 25.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 26);
      playSound.triggerAttackRelease('C5', '8n', startNow + 26.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 26.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 27);
      playSound.triggerAttackRelease('C5', '8n', startNow + 27.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 27.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('C5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('D5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 29);
      playSound.triggerAttackRelease('C7', '8n', startNow + 29.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 29.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 29.75);
      game.state = GameState.Play;
      break;
      
    case GameState.Over:
      reset();
      startNow = Tone.now();
      startSound.triggerAttackRelease('C5', '8n', startNow);
      startSound.triggerAttackRelease('D5', '8n', startNow + 0.25);
      startSound.triggerAttackRelease('F5', '8n', startNow + 0.5);
      startSound.triggerAttackRelease('E5', '8n', startNow + 0.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 1);
      playSound.triggerAttackRelease('C5', '8n', startNow + 1.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 1.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 2);
      playSound.triggerAttackRelease('C5', '8n', startNow + 2.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 2.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 3);
      playSound.triggerAttackRelease('C5', '8n', startNow + 3.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 3.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 3.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 4);
      playSound.triggerAttackRelease('D5', '8n', startNow + 4.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 4.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 4.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 5);
      playSound.triggerAttackRelease('C7', '8n', startNow + 5.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 5.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 5.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 6);
      playSound.triggerAttackRelease('C5', '8n', startNow + 6.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 6.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 7);
      playSound.triggerAttackRelease('C5', '8n', startNow + 7.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 7.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 8);
      playSound.triggerAttackRelease('C5', '8n', startNow + 8.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 8.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 8.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 9);
      playSound.triggerAttackRelease('D5', '8n', startNow + 9.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 9.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 9.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 10);
      playSound.triggerAttackRelease('C7', '8n', startNow + 10.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 10.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 10.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 11);
      playSound.triggerAttackRelease('C5', '8n', startNow + 11.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 11.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 12);
      playSound.triggerAttackRelease('C5', '8n', startNow + 12.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 12.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 13);
      playSound.triggerAttackRelease('C5', '8n', startNow + 13.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 13.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 13.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 14);
      playSound.triggerAttackRelease('D5', '8n', startNow + 14.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 14.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 14.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 15);
      playSound.triggerAttackRelease('C7', '8n', startNow + 15.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 15.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 15.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 16);
      playSound.triggerAttackRelease('C5', '8n', startNow + 16.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 16.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 17);
      playSound.triggerAttackRelease('C5', '8n', startNow + 17.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 17.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 18);
      playSound.triggerAttackRelease('C5', '8n', startNow + 18.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 18.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 18.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 19);
      playSound.triggerAttackRelease('D5', '8n', startNow + 19.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 19.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 19.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 20);
      playSound.triggerAttackRelease('C7', '8n', startNow + 20.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 20.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 20.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 21);
      playSound.triggerAttackRelease('C5', '8n', startNow + 21.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 21.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 22);
      playSound.triggerAttackRelease('C5', '8n', startNow + 22.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 22.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 23);
      playSound.triggerAttackRelease('C5', '8n', startNow + 23.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 23.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 23.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 24);
      playSound.triggerAttackRelease('D5', '8n', startNow + 24.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 24.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 24.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 25);
      playSound.triggerAttackRelease('C7', '8n', startNow + 25.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 25.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 25.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 26);
      playSound.triggerAttackRelease('C5', '8n', startNow + 26.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 26.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 27);
      playSound.triggerAttackRelease('C5', '8n', startNow + 27.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 27.5);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('C5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('E5', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 28);
      playSound.triggerAttackRelease('D5', '8n', startNow + 28.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 28.5);
      playSound.triggerAttackRelease('F6', '8n', startNow + 28.75);
      playSound.triggerAttackRelease('G3', '8n', startNow + 29);
      playSound.triggerAttackRelease('C7', '8n', startNow + 29.25);
      playSound.triggerAttackRelease('A3', '8n', startNow + 29.5);
      playSound.triggerAttackRelease('G6', '8n', startNow + 29.75);
      game.state = GameState.Play;
      break;
  }
}

function mousePressed() {
  for(let i = 0; i < animated.length; i++) {
    let contains = animated[i].contains(mouseX, mouseY);
    if(contains) {
      animated[i].stop();
      outVal++;
      squishSound.triggerAttackRelease('E2', '8n');
      game.score += 1;
      for(let j = 0; j < animated.length; j++) {
        animated[j].speed += 0.5;
      }
    }
    else {
      missSound.triggerAttackRelease('C4', '8n');
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

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
  print(i + " " + portList[i]);
  }
 }
 
 function serverConnected() {
  print('connected to server.');
}

 function portOpen() {
   print('the serial port opened.')
 }
 
 function serialEvent() {
   inVal = Number(serial.read());
 }
 
 function serialError(err) {
   print('Something went wrong with the serial port. ' + err);
 }
 
 function portClose() {
   print('The serial port closed.');
 }