'use client';

import { useEffect } from 'react';

const PROTOTYPE_HTML = String.raw`
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <div class="prototype-bar"><span><i></i> BETA PÚBLICA</span><p>Noticias resumidas · Datos con fuente y revisión editorial</p><time datetime="2026-08-24">Revisión: 24 AGO 2026</time></div>
  <header class="site-header">
    <a class="brand" href="#inicio" data-route="home" aria-label="ScolariX, portada"><span class="brand-icon">SX</span><span><b>SCOLARIX</b><small>SPORTS INTELLIGENCE</small></span></a>
    <nav class="primary-nav" aria-label="Navegación principal"><button class="nav-button active" data-route="home" aria-pressed="true"><span>00</span> Portada</button><button class="nav-button football" data-route="football" aria-pressed="false"><span>01</span> Fútbol</button><button class="nav-button f1" data-route="f1" aria-pressed="false"><span>02</span> Fórmula 1</button></nav>
    <div class="header-actions"><button class="icon-button" id="open-search" aria-label="Abrir buscador">⌕</button><button class="menu-button" id="menu-button" aria-label="Abrir menú" aria-expanded="false">Menú</button></div>
  </header>
  <div class="mobile-nav" id="mobile-nav" hidden><button data-route="home">Portada</button><button data-route="football">Fútbol</button><button data-route="f1">Fórmula 1</button></div>
  <main id="contenido" tabindex="-1">
    <section class="view active-view" data-view="home" id="inicio">
      <div class="home-hero"><div class="hero-copy"><p class="overline"><span>EN UNA SOLA CANCHA</span> FÚTBOL + FÓRMULA 1</p><h1>Todo el deporte.<br><em>Sin vueltas.</em></h1><p class="hero-lead">Noticias con imágenes licenciadas, resultados por fecha y datos trazables con acceso directo a cada fuente.</p><div class="hero-actions"><button class="primary-action" data-route="football">Explorar fútbol <span>→</span></button><button class="secondary-action" data-route="f1">Entrar a F1 <span>→</span></button></div></div><div class="hero-visual"><div class="pitch-lines" aria-hidden="true"><span></span><i></i></div><div class="speed-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="hero-label football-label" aria-hidden="true">FÚTBOL</span><span class="hero-label f1-label" aria-hidden="true">F1</span><div class="hero-score"><small>COBERTURA</small><b>02</b><span>DEPORTES</span></div></div></div>
      <div class="ticker" aria-label="Estado de fuentes"><span class="ticker-title">FUENTES</span><div><i class="online"></i> UEFA</div><div><i class="online"></i> APF</div><div><i class="online"></i> ABC Deportes</div><div><i class="online"></i> Formula1.com</div><div><i class="pending"></i> Sincronización automática · Próxima etapa</div></div>
      <section class="section-wrap latest-section" aria-labelledby="latest-title"><div class="section-head"><div><span class="section-index">01</span><p class="overline">PORTADA</p><h2 id="latest-title">Lo último</h2></div><div class="segmented" role="group" aria-label="Filtrar noticias"><button class="active" data-home-filter="all">Todo</button><button data-home-filter="football">Fútbol</button><button data-home-filter="f1">Fórmula 1</button></div></div><div class="news-grid" id="home-news" aria-live="polite"></div></section>
      <aside class="ad-slot" aria-label="Espacio publicitario"><span>PUBLICIDAD</span><p>Espacio reservado · 970 × 90</p><small>Sin interferir con la lectura</small></aside>
      <section class="section-wrap sport-split"><article class="sport-entry football-entry"><div class="sport-number">01</div><div><p class="overline">FÚTBOL</p><h2>Seis competiciones.<br>Una sola vista.</h2><p>Noticias, tablas con identidad visual y resultados filtrables.</p></div><button data-route="football">Abrir sección <span>↗</span></button></article><article class="sport-entry f1-entry"><div class="sport-number">02</div><div><p class="overline">FÓRMULA 1</p><h2>Cada vuelta.<br>Cada punto.</h2><p>Resultado completo, pilotos, equipos y constructores.</p></div><button data-route="f1">Abrir sección <span>↗</span></button></article></section>
    </section>
    <section class="view" data-view="football" hidden>
      <div class="sport-hero football-hero"><div><p class="overline">01 · FÚTBOL</p><h1>La cancha<br>completa.</h1><p>Europa y Sudamérica con noticias, posiciones y resultados por fecha.</p></div><div class="sport-stat"><small>COMPETICIONES</small><b>06</b><span>5 Europa · 1 Sudamérica</span></div><div id="football-player-spotlight" class="player-spotlight sport-player"></div></div>
      <div class="filter-panel" aria-label="Filtros de fútbol"><label><span>Buscar</span><input id="football-search" type="search" placeholder="Título, competición o fuente…"></label><label><span>Región</span><select id="region-filter"><option value="all">Todas</option><option value="Europa">Europa</option><option value="Sudamérica">Sudamérica</option></select></label><label><span>Competición</span><select id="competition-filter"><option value="all">Todas las competiciones</option></select></label><button id="clear-football-filters">Limpiar</button></div>
      <div class="competition-rail" id="competition-rail" aria-label="Competiciones"></div>
      <section class="event-scoreboard football-scoreboard" aria-label="Próximos partidos de fútbol">
        <button class="scoreboard-arrow" data-event-scroll="football-event-track" data-scroll-direction="-1" aria-label="Ver partidos anteriores">‹</button>
        <div class="scoreboard-label" id="football-event-label"></div>
        <div class="event-track" id="football-event-track" aria-live="polite"></div>
        <button class="scoreboard-arrow" data-event-scroll="football-event-track" data-scroll-direction="1" aria-label="Ver más partidos">›</button>
      </section>
      <section class="section-wrap football-content"><div class="content-tabs" role="tablist" aria-label="Contenido de fútbol"><button class="active" role="tab" aria-selected="true" data-football-tab="news">Noticias</button><button role="tab" aria-selected="false" data-football-tab="standings">Tabla de posiciones</button><button role="tab" aria-selected="false" data-football-tab="results">Calendario y resultados</button><button role="tab" aria-selected="false" data-football-tab="upcoming">Próximos partidos</button></div><div id="football-news-panel" class="tab-panel"><div class="news-grid" id="football-news"></div></div><div id="football-standings-panel" class="tab-panel" hidden><section class="competition-standings" id="football-standings" aria-live="polite"></section></div><div id="football-results-panel" class="tab-panel" hidden><div class="result-filter-bar"><div><p class="overline">CALENDARIO POR FECHAS</p><b>Separado por liga y jornada</b></div><div class="result-filter-fields"><label><span>Liga</span><select id="result-league-filter"><option value="all">Todas las ligas</option></select></label><label><span>Club</span><select id="result-club-filter"><option value="all">Todos los clubes</option></select></label></div></div><div id="football-results"></div></div><div id="football-upcoming-panel" class="tab-panel" hidden><div class="data-table-wrap" id="football-upcoming"></div></div></section>
    </section>
    <section class="view" data-view="f1" hidden>
      <div class="sport-hero formula-hero"><div><p class="overline">02 · FÓRMULA 1</p><h1>Precisión a<br>máxima velocidad.</h1><p>Carreras, pilotos y equipos conectados con la fuente oficial.</p></div><div class="speed-gauge" aria-hidden="true"><span>2026</span><b>F1</b><i></i></div><div id="f1-player-spotlight" class="player-spotlight sport-player"></div></div>
      <section class="event-scoreboard f1-scoreboard" aria-label="Próximas carreras de Fórmula 1">
        <button class="scoreboard-arrow" data-event-scroll="f1-event-track" data-scroll-direction="-1" aria-label="Ver carrera anterior">‹</button>
        <div class="scoreboard-label"><span>F1</span><b>PRÓXIMAS</b><small>Calendario 2026</small></div>
        <div class="event-track" id="f1-event-track" aria-live="polite"></div>
        <button class="scoreboard-arrow" data-event-scroll="f1-event-track" data-scroll-direction="1" aria-label="Ver más carreras">›</button>
      </section>
      <div class="f1-subnav" role="tablist" aria-label="Contenido de Fórmula 1"><button class="active" data-f1-tab="news">Noticias</button><button data-f1-tab="calendar">Calendario</button><button data-f1-tab="race">Resultados</button><button data-f1-tab="drivers">Pilotos</button><button data-f1-tab="constructors">Constructores</button><button data-f1-tab="profiles">Equipos y fichas</button></div>
      <section class="section-wrap f1-content"><div class="f1-panel" id="f1-news-panel"><div class="news-grid" id="f1-news"></div></div><div class="f1-panel" id="f1-calendar-panel" hidden></div><div class="f1-panel" id="f1-race-panel" hidden></div><div class="f1-panel" id="f1-drivers-panel" hidden></div><div class="f1-panel" id="f1-constructors-panel" hidden></div><div class="f1-panel" id="f1-profiles-panel" hidden></div></section>
    </section>
  </main>
  <footer><div class="footer-top"><a class="brand" href="#inicio" data-route="home"><span class="brand-icon">SX</span><span><b>SCOLARIX</b><small>SPORTS INTELLIGENCE</small></span></a><p>Información deportiva resumida, trazable y conectada con su fuente original.</p><div class="footer-status"><i></i> BETA PÚBLICA</div></div><div class="footer-bottom"><span>© 2026 SCOLARIX</span><nav aria-label="Información legal"><button data-legal="legal">Aviso legal</button><button data-legal="privacy">Privacidad</button><button data-legal="cookies">Cookies</button><button data-legal="takedown">Solicitar retirada</button></nav><span>ES · PY</span></div></footer>
  <dialog id="legal-dialog"><button class="dialog-close" aria-label="Cerrar">×</button><div id="legal-content"></div></dialog>
  <div class="search-overlay" id="search-overlay" hidden><button class="search-close" aria-label="Cerrar buscador">×</button><div><p class="overline">BUSCADOR GLOBAL</p><label for="global-search">¿Qué querés encontrar?</label><input id="global-search" type="search" placeholder="Noticias, competiciones, pilotos…" autocomplete="off"><p id="search-count">Escribí al menos dos caracteres.</p><div id="search-results"></div></div></div>
  <div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Preferencias de cookies"><div><b>Cookies en esta beta</b><p>Solo usamos funcionamiento esencial. Las preferencias no se guardan fuera de esta sesión.</p></div><button id="reject-cookies">Solo esenciales</button><button class="accept" id="accept-cookies">Aceptar</button></div>
`;

export default function Home() {
  useEffect(() => {
    void import('./client/site.js');
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: PROTOTYPE_HTML }} />;
}
