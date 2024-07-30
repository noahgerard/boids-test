const perceptionRadius = 100;

class Boid {
	constructor() {
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(random(2, 4));
		this.acceleration = createVector();
		this.maxForce = 0.2;
		this.maxSpeed = 4;
	}

	edges() {
		if (this.position.x > width) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = width;
		}

		if (this.position.y > height) {
			this.position.y = 0;
		} else if (this.position.y < 0) {
			this.position.y = height;
		}
	}

	

	align(boids) {
		let steering = createVector();
		let total = 0;

		for (let other of boids) {
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

			if (other != this && d < perceptionRadius) {
				total++;
				steering.add(other.velocity);
			}
		}

		if (total > 0) {
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}

		return steering;
	}

	flock(boids) {
		let alignment = this.align(boids);

		this.acceleration.add(alignment);
	}

	update() {
		this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
	}

	show() {
		let size = 2;

		stroke(255);
		circle(this.position.x, this.position.y, size);

		// Draw perception radius
		stroke(255, 255, 255, 10);
		fill(255, 255, 255, 1);
		circle(this.position.x, this.position.y, perceptionRadius);
	}
}