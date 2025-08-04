const canvas = document.getElementById('diceCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let images = [];
let imagePaths = [
  'assets/images/dice.png',
  'assets/images/dice1.png',
  'assets/images/dice2.png',
  'assets/images/card.png',
  'assets/images/chip1.png',
  'assets/images/chip2.svg',
  'assets/images/chip3.svg',
  'assets/images/chip4.svg'
];

let width, height;

// Load images first
Promise.all(imagePaths.map(src => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
})).then(loadedImages => {
  images = loadedImages;
  init();
  animate();
});

function init() {
  resizeCanvas();
  particles = [];
  for (let i = 0; i < 40; i++) {  // increase for more particles
    particles.push(createParticle());
  }
}

function createParticle() {
  const img = images[Math.floor(Math.random() * images.length)];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 20 + Math.random() * 40,
    speedX: -0.5 + Math.random(),
    speedY: -0.5 + Math.random(),
    rotation: Math.random() * 360,
    rotationSpeed: -1 + Math.random() * 2,
    opacity: 0.2 + Math.random() * 0.5,
    img
  };
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;

    // Respawn if out of bounds
    if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
      Object.assign(p, createParticle());
      p.x = Math.random() > 0.5 ? -50 : width + 50;
      p.y = Math.random() * height;
    }
  });
  requestAnimationFrame(animate);
}

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
