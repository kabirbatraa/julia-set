

let zoom = 1;
// let zoomVel = 1;
// let zoomAcc = 0.3;
let zoomMult = 1.05;

let pixelSize = 10;

let iterations = 250;

function setup() {
  createCanvas(1000, 800);
  pixelDensity(1);
  
}

function draw() {
  background(220);

  loadPixels();

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {

      let posX = (x - 0.74*(400 + zoom) - width/2) / (400 + zoom);
      let poxY = (y - 0.21101*(400 + zoom) - height/2) / (400 + zoom);
      let lifespan = inMandelbrot(posX, poxY);
      // let innit = false;
      // console.log(innit);

      colorMode(HSB);
      
      let c = color(map(lifespan, 0, iterations, 0, 255), 255, 255);
      if (lifespan == -1) {
        c = color("black");
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
  // filter(INVERT);
}


function inMandelbrot(ca, cb) {


  let infinitySquared = 500;

  // let goesToInfinity = false;
  // let lifespan = 0;
  let za = 0;
  let zb = 0;
  for (let i = 0; i < iterations; i++) {
    newZa = za * za - zb * zb + ca;
    newZb = 2 * za * zb + cb;

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