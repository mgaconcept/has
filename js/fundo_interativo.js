/*
 * fundo_interativo.js
 *
 * Este script adiciona um efeito de partículas interativo
 * ao cabeçalho (menu) e ao rodapé das páginas. Utiliza
 * apenas JavaScript e Canvas para criar pequenas partículas
 * coloridas que se movem suavemente e se conectam quando
 * próximas, seguindo a paleta de cores MIND. As partículas
 * são geradas individualmente para cada contêiner alvo e
 * redimensionadas de acordo com a largura e altura do
 * elemento. O canvas é posicionado de forma absoluta
 * atrás do conteúdo do contêiner, preservando o layout.
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Inicializa o efeito de partículas para um determinado seletor.
   * @param {string} selector - O seletor CSS do contêiner (por exemplo 'nav' ou 'footer').
   * @param {number} particleCount - Número de partículas a serem geradas.
   */
  function initParticlesForContainer(selector, particleCount = 30) {
    const container = document.querySelector(selector);
    if (!container) return;

    // Ajustar posicionamento do contêiner para conter o canvas
    const computedStyle = window.getComputedStyle(container);
    if (computedStyle.position === 'static' || !computedStyle.position) {
      container.style.position = 'relative';
    }
    container.style.overflow = container.style.overflow || 'hidden';

    // Criar canvas
    const canvas = document.createElement('canvas');
    canvas.classList.add('interactive-bg');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    container.insertBefore(canvas, container.firstChild);

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resize() {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resize();
    window.addEventListener('resize', resize);

    // Paleta de cores MIND
    const palette = ['#3b82f6', '#9333ea', '#ec4899'];
    const particles = [];

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1.5 + Math.random() * 2.5,
        color: palette[Math.floor(Math.random() * palette.length)],
      };
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    function update() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        // Reflexão nas bordas do contêiner
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Conexões entre partículas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 80) {
            const alpha = 1 - dist / 80;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.25})`;
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
  }

  // Inicializar nos elementos 'nav' e 'footer'
  initParticlesForContainer('nav', 25);
  initParticlesForContainer('footer', 25);
});