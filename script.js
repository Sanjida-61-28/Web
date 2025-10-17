const canvas = document.getElementById('canvas-club');
const ctx = canvas.getContext('2d');

// Resize canvas to full window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Helper random function
function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Drop {
  constructor() {
    this.init();
  }

  init() {
    this.x = random(0, canvas.width);
    this.y = random(-canvas.height, 0);
    this.color = `hsl(${random(160, 200)}, 100%, 50%)`;
    this.h = random(10, 20);
    this.w = random(1, 3);
    this.vy = random(4, 8);
    this.hit = random(canvas.height * 0.8, canvas.height * 0.9);
    this.splash = false;
  }

  draw() {
    ctx.shadowBlur = 10; // neon glow
    ctx.shadowColor = this.color;

    if (!this.splash) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.w;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.h);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.hit, this.radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    this.update();
  }

  update() {
    if (!this.splash) {
      this.y += this.vy;
      if (this.y > this.hit) {
        this.splash = true;
        this.radius = 1;
      }
    } else {
      this.radius += 0.5;
      if (this.radius > 30) this.init();
    }
  }
}

// Create multiple drops
const drops = [];
for (let i = 0; i < 100; i++) {
  drops.push(new Drop());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter'; // glowing blend
  drops.forEach(drop => drop.draw());
  requestAnimationFrame(animate);
}

animate();
