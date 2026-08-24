import { SPORTS } from '../config/sports.js';

const sports = Object.values(SPORTS);
const sportNames = sports.map((sport) => sport.name.toUpperCase()).join(' + ');
const heroActions = sports.map((sport) => `<button class="${sport.home.buttonClass}" data-route="${sport.route}">${sport.home.button} <span>→</span></button>`).join('');
const heroLabels = sports.map((sport) => `<span class="hero-label ${sport.route}-label" aria-hidden="true">${sport.home.label}</span>`).join('');
const homeFilters = sports.map((sport) => `<button data-home-filter="${sport.route}">${sport.name}</button>`).join('');
const sportEntries = sports.map((sport) => `<article class="sport-entry ${sport.home.entryClass}"><div class="sport-number">${sport.navIndex}</div><div><p class="overline">${sport.name.toUpperCase()}</p><h2>${sport.home.title}</h2><p>${sport.home.description}</p></div><button data-route="${sport.route}">Abrir sección <span>↗</span></button></article>`).join('');

export const HOME_VIEW = String.raw`
  <section class="view active-view" data-view="home" id="inicio">
    <div class="home-hero"><div class="hero-copy"><p class="overline"><span>EN UNA SOLA CANCHA</span> ${sportNames}</p><h1>Todo el deporte.<br><em>Sin vueltas.</em></h1><p class="hero-lead">Noticias con imágenes licenciadas, resultados por fecha y datos trazables con acceso directo a cada fuente.</p><div class="hero-actions">${heroActions}</div></div><div class="hero-visual"><div class="pitch-lines" aria-hidden="true"><span></span><i></i></div><div class="speed-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>${heroLabels}<div class="hero-score"><small>COBERTURA</small><b>${String(sports.length).padStart(2, '0')}</b><span>DEPORTES</span></div></div></div>
    <div class="ticker" aria-label="Estado de fuentes"><span class="ticker-title">FUENTES</span><div><i class="online"></i> UEFA</div><div><i class="online"></i> APF</div><div><i class="online"></i> ABC Deportes</div><div><i class="online"></i> Formula1.com</div><div><i class="online"></i> NBA.com</div><div><i class="pending"></i> Sincronización automática · Próxima etapa</div></div>
    <section class="section-wrap latest-section" aria-labelledby="latest-title"><div class="section-head"><div><span class="section-index">01</span><p class="overline">PORTADA</p><h2 id="latest-title">Lo último</h2></div><div class="segmented" role="group" aria-label="Filtrar noticias"><button class="active" data-home-filter="all">Todo</button>${homeFilters}</div></div><div class="news-grid" id="home-news" aria-live="polite"></div></section>
    <aside class="ad-slot" aria-label="Espacio publicitario"><span>PUBLICIDAD</span><p>Espacio reservado · 970 × 90</p><small>Sin interferir con la lectura</small></aside>
    <section class="section-wrap sport-split">${sportEntries}</section>
  </section>
`;
