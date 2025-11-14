// icons.js — injeta SVG inline e força cor por currentColor, mesmo se o arquivo trouxer estilo interno
document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('img.icon, span.icon[data-src]');

  nodes.forEach(async (node) => {
    try {
      const src = node.tagName === 'IMG' ? node.getAttribute('src') : node.dataset.src;
      if (!src || !src.endsWith('.svg')) return;

      const res = await fetch(src, { cache: 'force-cache' });
      if (!res.ok) { console.warn('SVG não encontrado:', src); return; }
      let svgText = await res.text();

      // Remove blocos <style> internos que travam cor
      svgText = svgText.replace(/<style[\s\S]*?<\/style>/gi, '');

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) return;

      // Remove width/height e garante viewBox
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      if (!svg.getAttribute('viewBox')) {
        const w = parseFloat(svg.getAttribute('width')) || 48;
        const h = parseFloat(svg.getAttribute('height')) || 48;
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      }

      // Remove fills/strokes fixos (inclusive em style inline) e força currentColor
      const all = svg.querySelectorAll('*');
      all.forEach(el => {
        // limpa atributos diretos
        if (el.hasAttribute('fill') && el.getAttribute('fill') !== 'none') el.removeAttribute('fill');
        if (el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none') el.removeAttribute('stroke');
        // limpa style inline (apenas fill/stroke)
        const st = el.getAttribute('style');
        if (st) {
          const cleaned = st
            .split(';')
            .map(s => s.trim())
            .filter(s => s && !/^fill\s*:/.test(s) && !/^stroke\s*:/.test(s))
            .join('; ');
          if (cleaned) el.setAttribute('style', cleaned); else el.removeAttribute('style');
        }
      });
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('stroke', 'currentColor'); // se o ícone usar stroke
      svg.style.fill = 'currentColor';

      // Acessibilidade
      const alt = node.getAttribute('alt') || '';
      svg.setAttribute('role', 'img');
      if (alt) svg.setAttribute('aria-label', alt); else svg.setAttribute('aria-hidden', 'true');

      // Classes/data-atributos do <img>
      const classes = (node.getAttribute('class') || '').split(' ').filter(Boolean);
      svg.classList.add('icon-svg', ...classes.filter(c => c !== 'icon'));
      const colorData = node.dataset.iconColor;
      if (colorData) svg.setAttribute('data-icon-color', colorData);
      if (node.dataset.fx === 'wiggle') svg.classList.add('icon-hover-wiggle');
      if (node.dataset.fx === 'spin')   svg.classList.add('icon-spin');

      // Troca no DOM
      node.replaceWith(svg);
    } catch (e) {
      console.error('Falha ao injetar SVG:', e);
    }
  });
});

