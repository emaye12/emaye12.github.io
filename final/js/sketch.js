
let pmov;
let outVal;
let inVal;
let serial;
let player1;
let player2;
let player3;
let player4;
let score;
let state;
let inc;
let enemycol;
function preload() {
  player1 = new Tone.Player("sounds/Peppinoscream.mp3").toDestination();
  player2 = new Tone.Player("sounds/secret.mp3").toDestination();
  player3 = new Tone.Player("sounds/walk.mp3").toDestination();
}

function setup() {
  createCanvas(1000, 1000);
  background(0);
  imageMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
  serial.list();
  serial.open('COM7');
  e1 = new enemy(1);
  e2 = new enemy(2);
  e3 = new enemy(3);
  e4 = new enemy(4);
  enemies = [];
  enemies[0] = e1;
  enemies[1] = e2;
  enemies[2] = e3;
  enemies[3] = e4;
  p1 = new user();
  let range;
  pmov = 1;
  Tone.Transport.start();
  score = 0;
  state = 1;
  inc = 0;
  enemycol = color('#ff0000');
}

function draw() {
  switch(state) {
      
    case 1:
  Tone.Transport.start();
  player2.autostart = true;
    serial.write(outVal);
    outVal = 1;
    background(0);
    p1.display();
    p1.move(inVal);
    for(i = 0; i < enemies.length; i++) {
      enemies[i].spawn();
      enemies[i].move(inc);
      enemies[i].display();
      enemies[i].respawn();
      range = (p1.diameter() / 2) + (enemies[i].diameter() / 2);
      score++;
      inc++;
      if (abs(p1.positionx() - enemies[i].positionx()) < range && abs(p1.positiony() - enemies[i].positiony()) < range ) {
        player1.start();
        outVal = 0;
        state = 0;
      }
    }
    break;
    case 0:
      outVal = 0;
      serial.write(outVal);
      background(0);
      fill(255);
      textSize(150);
      textAlign(CENTER);
      text("Game Over",500,500);
      textSize(100);
      text("Score: " + score, 500, 700);
      break;
  }
  }


class user {
  constructor() {
    this.x = 500;
    this.y = 500;
    this.dia = 50;
  }

  move(dir) {
    if (dir == 1 && this.y > 25) {
      this.y += -5
      player3.autostart = false;
      player3.autostart = true;
    }
    if (dir == 2 && this.y < 975) {
      this.y += +5;
      player3.autostart = false;
      player3.autostart = true;
    }
    if (dir == 3 && this.x > 25) {
      this.x += -5;
      player3.autostart = false;
      player3.autostart = true;
    }
    if (dir == 4 && this.x < 975) {
      this.x += 5;
      player3.autostart = false;
      player3.autostart = true;
    }
  }

  display() {
    fill(220);
    ellipse(this.x, this.y, this.dia, this.dia);
  }

  positionx() {
    return this.x;
  }

  positiony() {
    return this.y;
  }

  diameter() {
    return this.dia;
  }
}

class enemy {
  constructor(gro) {
    this.x;
    this.y;
    this.dia;
    this.type = gro;
    this.gon = 1;
  }
  spawn() {
    if(this.gon == 1) {
      if (this.type < 10) {
        if (this.type == 1) {
          this.dia = random(50, 100);
          this.x = random(100, 900);
          this.y = 1000 - (this.dia / 2);
          this.gon = 0;
        }
        if (this.type == 2) {
          this.dia = random(50, 100);
          this.x = random(100, 900);
          this.y = 0 + (this.dia / 2);
          this.gon = 0;
        }
        if (this.type == 3) {
          this.dia = random(50, 100);
          this.x = 0 + (this.dia / 2);
          this.y = random(100, 900);
          this.gon = 0;
       }
       if (this.type == 4) {
          this.dia = random(50, 100);
          this.x = 1000 - (this.dia / 2);
          this.y = random(100, 900);
          this.gon = 0;
        }
     }
    }
  }
  move(fas) {
    if (this.type < 10) {
      if (this.type == 1) {
        this.y += (-5 - (fas / 200));
      }
      if (this.type == 2) {
        this.y += (5 + (fas / 200));
      }
      if (this.type == 3) {
        this.x += (5 + (fas / 200));
      }
      if (this.type == 4) {
        this.x += (-5 - (fas / 200));
      }
    }
  }

  display() {
    fill(enemycol);
    ellipse(this.x, this.y, this.dia, this.dia);
  }

  respawn() {
    if(this.x < 0 - (this.dia / 2) || this.x > 1000 + (this.dia / 2) || this.y < 0  - (this.dia / 2)|| this.y > 1000 + (this.dia / 2)) {
      this.gon = 1;
    }
  }

  positionx() {
    return this.x;
  }

  positiony() {
    return this.y;
  }

  diameter() {
    return this.dia;
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