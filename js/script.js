/*
 * script.js
 *
 * Este arquivo implementa funcionalidades básicas de interatividade no site, como a
 * abertura e fechamento do menu de navegação em dispositivos móveis.  Como
 * recomendado pelas melhores práticas de arquitetura web multi‑page, esse
 * comportamento está centralizado em um único arquivo JavaScript para
 * facilitar a manutenção e evitar duplicação de código.
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 🎨 VARIAÇÃO DINÂMICA DE FUNDO DA HERO
  const imagensHero = [
    "banner_header.png",
    "banner_header2.png",
    "banner_header3.png",
    "banner_header4.png"
  ];

  const escolhida = imagensHero[Math.floor(Math.random() * imagensHero.length)];
  const hero = document.querySelector(".hero");

  if (hero) {
    // Ajuste de caminho para a pasta de assets após a reorganização de diretórios.
    // Como as páginas HTML residem em uma subpasta, é necessário subir um nível
    // para localizar corretamente os arquivos de imagem. Os banners são
    // armazenados em /assets/img/.
    hero.style.backgroundImage = `url('assets/img/${escolhida}')`;
  }

  // ✨ FASE 9 – Animações de aparição gradual
  // Atribui a classe .fade-in a cards e linhas de tabelas para permitir
  // animações suaves quando entram no viewport. Utiliza IntersectionObserver
  // para detecção eficiente de visibilidade.
  const fadeTargets = document.querySelectorAll('.card, .plan-table tr');
  fadeTargets.forEach((el) => {
    el.classList.add('fade-in');
  });

  const observerOptions = {
    threshold: 0.1,
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeTargets.forEach((el) => {
    observer.observe(el);
  });
});

