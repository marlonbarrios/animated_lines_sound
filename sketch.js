// Declare variables
const snakePoints = [];
let isDrawing = false;
let isAnimating = false;
let noiseOffset = 0;
let lineColor;
let prevMouseX, prevMouseY;
let osc;
let soundOn = true;

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  osc = new p5.Oscillator('triangle');
  osc.amp(0);
  osc.freq(200);
  osc.start();
}

// Function to resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Draw function
function draw() {
  // When the mouse is being pressed, save the current mouse position in snakePoints
  if (isDrawing) {
    let mouseSpeed = dist(prevMouseX, prevMouseY, mouseX, mouseY);
    let strokeWidth = map(mouseSpeed, 0, 50, 10, 1);
    strokeWeight(strokeWidth);
    snakePoints.push(createVector(mouseX, mouseY));
  }

  // When isAnimating is true, animate the snakePoints
  if (isAnimating) {
    background(255, 7);
    for (let i = 0; i < snakePoints.length - 1; i++) {
      const point = snakePoints[i];
      const nextPoint = snakePoints[i + 1];

      let noiseX = map(noise(noiseOffset + i * 0.1), 0, 1, -1, 1);
      let noiseY = map(noise(noiseOffset + 100 + i * 0.1), 0, 1, -1, 1);

      let movement = dist(point.x, point.y, nextPoint.x, nextPoint.y);
      let freq = map(movement, 0, 50, 10, 100);
      osc.freq(freq);

      // Control the sound based on the soundOn variable
      if (soundOn) {
        osc.amp(0.3, 0.05);
      } else {
        osc.amp(0, 0.05);
      }

      // Animate the points using Perlin noise
      point.x = constrain(point.x + noiseX, 0, width);
      point.y = constrain(point.y + noiseY, 0, height);
      nextPoint.x = constrain(nextPoint.x + noiseX, 0, width);
      nextPoint.y = constrain(nextPoint.y + noiseY, 0, height);

      // Draw the line segments
      stroke(lineColor);
      line(point.x, point.y, nextPoint.x, nextPoint.y);
    }

    noiseOffset += 0.01;
  } else {
    osc.amp(0, 0.05);
    // Draw the line segments when not animating
    for (let i = 0; i < snakePoints.length - 1; i++) {
      const point = snakePoints[i];
      const nextPoint = snakePoints[i + 1];

      stroke(lineColor);
      line(point.x, point.y, nextPoint.x, nextPoint.y);
    }
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

// When the mouse is pressed, set isDrawing to true and reset snakePoints
function mousePressed() {
  isDrawing = true;
  isAnimating = false;
  snakePoints.length = 0;
  lineColor = color(random(0, 10), random(0, 10), random(0,10));
}

// When the mouse is released, set isDrawing to false and start animating
function mouseReleased() {
isDrawing = false;
isAnimating = true;
}

// Function to reset the canvas
function resetCanvas() {
  background(255); // Set the background color (white in this case)
  snakePoints.length = 0; // Clear the snakePoints array
  isDrawing = false; // Set isDrawing to false
  isAnimating = false; // Set isAnimating to false
}

// Function to handle key presses
function keyPressed() {
// Toggle sound on/off when the 'S' or space key is pressed
if (key === ' ' || key === 'S') {
soundOn = !soundOn;
}
// Reset the canvas when the 'R' key is pressed
if (key === 'R' || key === 'r') {
  resetCanvas();
}
}


