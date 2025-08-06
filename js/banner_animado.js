/*
 * banner_animado.js - Versão HAS (Hexágonos com paleta #FFE200 e #006AFF)
 *
 * Este script renderiza partículas hexagonais animadas no banner .hero,
 * com interconexões suaves e estilo tecnológico, usando a paleta HAS.
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

  // Configurações
  const numParticles = 45;
  const particles = [];
  const palette = ['#FFE200', '#FFD600', '#006AFF', '#0055CC']; // variações
  const lineColor = 'rgba(255, 255, 255, 0.08)';

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 4 + Math.random() * 3,
      color: palette[Math.floor(Math.random() * palette.length)],
    };
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(createParticle());
  }

  function drawHexagon(x, y, size, color) {
    const angle = (Math.PI * 2) / 6;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const dx = x + size * Math.cos(angle * i);
      const dy = y + size * Math.sin(angle * i);
      if (i === 0) ctx.moveTo(dx, dy);
      else ctx.lineTo(dx, dy);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
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

    // Linhas de conexão
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const alpha = 1 - dist / 100;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.1})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Desenhar partículas como hexágonos
    particles.forEach((p) => {
      drawHexagon(p.x, p.y, p.size, p.color);
    });
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  animate();
});
