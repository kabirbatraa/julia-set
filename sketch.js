p5.disableFriendlyErrors = true;

let zoom = 1;
// let zoomVel = 1;
// let zoomAcc = 0.3;
let zoomMult = 1.05;

let pixelSlider;
let pixelSize = 3;

let iterations = 100;

let juliaTheta;
let juliaR = 0.7885;

function setup() {
  createCanvas(1000, 700);
  pixelDensity(1);
  juliaTheta = PI/4;

  pixelSlider = createSlider(1, 5, 3);

  frameRate(20);
}

function draw() {
  background(220);

  loadPixels();
  pixelSize = pixelSlider.value();

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {

      // let posX = (x - 0.74*(400 + zoom) - width/2) / (400 + zoom);
      // let posX = (x - 0.5*300 - width/2) / (300);
      let posX = (x - width/2) / (250);
      // let poxY = (y - 0.21101*(400 + zoom) - height/2) / (400 + zoom);
      let poxY = (y - height/2) / (250);
      let lifespan = inMandelbrot(posX, poxY);
      // let innit = false;
      // console.log(innit);

      colorMode(HSB);
      
      let c = color(map(lifespan, 0, iterations, 0, 255), 255, 255);
      if (lifespan == -1) {
        c = color("white");
      }

      let index = 4 * (x + y * width);
      // pixels[index] = innit ? 200 : 0;
      // pixels[index + 1] = innit ? 200 : 0;
      // pixels[index + 2] = innit ? 200 : 0;

      for (let i = 0; i < pixelSize; i++) {
        for (let j = 0; j < pixelSize; j++) {
          pixels[index + 4 * (i + j * width)] = red(c);
          pixels[index + 4 * (i + j * width) + 1] = green(c);
          pixels[index + 4 * (i + j * width) + 2] = blue(c);
        }
      }
    }
  }
  
  updatePixels();
  zoom *= zoomMult;
  // zoom += zoomVel;
  // zoomVel += zoomAcc;
  // zoomAcc += 0.1;
  filter(INVERT);
  juliaTheta += PI/80;
}


function inMandelbrot(ca, cb) {


  let infinitySquared = 500;

  // let goesToInfinity = false;
  // let lifespan = 0;
  let za = ca;
  let zb = cb;
  for (let i = 0; i < iterations; i++) {
    // newZa = za * za - zb * zb + ca;
    // newZb = 2 * za * zb + cb;
    newZa = za * za - zb * zb;
    newZb = 2 * za * zb;

    newZa += juliaR * Math.cos(juliaTheta);
    newZb += juliaR * Math.sin(juliaTheta);

    if (newZa * newZa + newZb * newZb > infinitySquared) {
      return i;
      // goesToInfinity = true;
      // break;
    }
    za = newZa;
    zb = newZb;
  }
  return -1;
  // return goesToInfinity;
  
}

function mousePressed() {
  zoom += 100;
  zoomMult += 0.01;
}