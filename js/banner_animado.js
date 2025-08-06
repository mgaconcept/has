/*
 * banner_animado.js - Paleta HAS
 *
 * Este script mantém o efeito de partículas animadas do site original,
 * mas substitui a paleta pela identidade visual da HAS (#FFE200 e #006AFF).
 */

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.style.position = hero.style.position || 'relative';
  hero.style.overflow = hero.style.overflow || 'hidden';

  const canvas = document.createElement('canvas');
  canvas.id = 'bannerCanvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0';
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  const numParticles = 40;
  const particles = [];

  // 🌈 NOVA PALETA HAS
  const palette = ['#FFE200', '#FFD100', '#006AFF', '#0050D0'];

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 2 + Math.random() * 3,
      color: palette[Math.floor(Math.random() * palette.length)],
    };
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(createParticle());
  }

  function update() {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Conexões
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const alpha = 1 - dist / 100;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Partículas circulares
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  animate();
});

