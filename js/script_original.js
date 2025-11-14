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
    hero.style.backgroundImage = `url('assets/${escolhida}')`;
  }
});

