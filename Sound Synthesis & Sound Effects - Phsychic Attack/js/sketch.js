let img;
let chorus = new Tone.Chorus(5, 7, 3).toDestination().start();
let synth = new Tone.PolySynth().connect(chorus);
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.4,
  decay: 0.7,
  sustain: 0.1,
  release: 3
}).connect(pan);
synth.connect(ampEnv);
let noise = new Tone.Noise("white").start();
synth.connect(noise);
function setup() {
  createCanvas(1000, 1000);
  imageMode(CENTER);
  img = loadImage('img/Extrasensory.png');
}

function draw() {
  background(220);
  Tone.start();
  if (mouseIsPressed) {
    image(img, 500, 500);
  }
}

function mousePressed() {
  synth.triggerAttackRelease(["C6", "E6", "F6"], "2");
}