const boids = [];
const width = 600;
const height = 600;

function setup() {
  createCanvas(width, height);
  frameRate(60);

  for (let i = 0; i < 100; i++) {
    const boid = new Boid();
    boids.push(boid);
  }
}


function draw() {
  background(51);

  for (let boid of boids) {
    boid.edges();
    boid.flock(boids);
    boid.update();

    boid.show();
  }
}
