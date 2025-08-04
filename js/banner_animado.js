/*
 * banner_animado.js
 *
 * Este script cria um efeito de partículas animadas sobre o banner (hero) das páginas.
 * O objetivo é gerar uma atmosfera futurista com movimento suave, utilizando
 * apenas JavaScript e Canvas, sem dependências externas. As partículas
 * utilizam as cores da paleta MIND e se conectam quando estão próximas,
 * formando uma rede sutil. A animação se ajusta automaticamente ao
 * redimensionamento da janela e permanece em execução contínua.
 */

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Certifique-se de que o contêiner possa conter o canvas
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

  // Geração de partículas
  const numParticles = 40;
  const particles = [];
  const palette = ['#3b82f6', '#9333ea', '#ec4899'];

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
      // Refletir nas bordas
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // Desenhar conexões
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
    // Desenhar partículas
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