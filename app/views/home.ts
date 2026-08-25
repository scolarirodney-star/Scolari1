import { SPORTS } from '../config/sports.js';

const sports = Object.values(SPORTS);
const sportNames = sports.map((sport) => sport.name.toUpperCase()).join(' + ');
const heroActions = sports.map((sport) => `<button class="${sport.home.buttonClass}" data-route="${sport.route}">${sport.home.button} <span>→</span></button>`).join('');
const coverageOrder = ['football', 'nba', 'f1'] as const;
const coveragePanels = coverageOrder.map((route) => {
  const sport = SPORTS[route];
  return `<div class="coverage-sport coverage-${sport.route}"><span>${sport.navIndex}</span><b>${sport.home.label}</b><i></i></div>`;
}).join('');
const homeFilters = sports.map((sport) => `<button data-home-filter="${sport.route}">${sport.name}</button>`).join('');

const ENTRY_ANIMATIONS: Record<string, string> = {
  football: `<svg class="anim-icon anim-football" viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false"><path d="M6 6 H26 V12 M6 6 V26 M26 6 V16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6 V14 M14 6 V15 M18 6 V16 M22 6 V16" stroke="currentColor" stroke-width="1" opacity=".45"/><circle class="ball" cx="8" cy="24" r="3.2" fill="currentColor"/></svg>`,
  f1: `<svg class="anim-icon anim-f1" viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false"><line x1="6" y1="4" x2="6" y2="28" stroke="currentColor" stroke-width="2"/><g class="flag-group"><rect x="7" y="4" width="6" height="5" fill="currentColor"/><rect x="13" y="4" width="6" height="5" fill="currentColor" opacity=".35"/><rect x="7" y="9" width="6" height="5" fill="currentColor" opacity=".35"/><rect x="13" y="9" width="6" height="5" fill="currentColor"/></g><line class="speed-line" x1="20" y1="14" x2="26" y2="14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line class="speed-line" x1="21" y1="19" x2="27" y2="19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  nba: `<svg class="anim-icon anim-nba" viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false"><ellipse cx="16" cy="10" rx="9" ry="2.6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10 L10 20 M24 10 L22 20 M12 10 L13 19 M20 10 L19 19 M16 10 L16 20" stroke="currentColor" stroke-width="1" opacity=".5" fill="none"/><circle class="ball" cx="7" cy="4" r="3.2" fill="currentColor"/></svg>`,
};
const sportEntries = sports.map((sport) => `<article class="sport-entry ${sport.home.entryClass}"><div class="sport-number">${sport.navIndex}</div><div><p class="overline">${sport.name.toUpperCase()}</p><h2>${sport.home.title}</h2><p>${sport.home.description}</p></div><button data-route="${sport.route}"><span class="btn-label">Abrir sección</span><span class="btn-anim">${ENTRY_ANIMATIONS[sport.route] || ''}</span><span>↗</span></button></article>`).join('');

export const HOME_VIEW = String.raw`
  <section class="view active-view" data-view="home" id="inicio">
    <div class="home-hero"><div class="hero-copy"><p class="overline"><span>EN UNA SOLA CANCHA</span> ${sportNames}</p><h1>Todo el deporte.<br><em>Sin vueltas.</em></h1><p class="hero-lead">Noticias con imágenes licenciadas, resultados por fecha y datos trazables con acceso directo a cada fuente.</p><div class="hero-actions">${heroActions}</div></div><div class="hero-visual"><div class="coverage-mosaic" aria-hidden="true">${coveragePanels}</div><div class="hero-score"><small>COBERTURA</small><b>${String(sports.length).padStart(2, '0')}</b><span>DEPORTES</span></div></div></div>
    <div class="ticker" aria-label="Estado de fuentes"><span class="ticker-title">FUENTES</span><div><i class="online"></i> UEFA</div><div><i class="online"></i> APF</div><div><i class="online"></i> ABC Deportes</div><div><i class="online"></i> Formula1.com</div><div><i class="online"></i> NBA.com</div><div><i class="pending"></i> Sincronización automática · Próxima etapa</div></div>
    <section class="section-wrap latest-section" aria-labelledby="latest-title"><div class="section-head"><div><span class="section-index">01</span><p class="overline">PORTADA</p><h2 id="latest-title">Lo último</h2></div><div class="segmented" role="group" aria-label="Filtrar noticias"><button class="active" data-home-filter="all">Todo</button>${homeFilters}</div></div><div class="news-grid" id="home-news" aria-live="polite"></div></section>
    <aside class="ad-slot" aria-label="Espacio publicitario"><span>PUBLICIDAD</span><p>Espacio reservado · 970 × 90</p><small>Sin interferir con la lectura</small></aside>
    <section class="section-wrap sport-split">${sportEntries}</section>
  </section>
`;
