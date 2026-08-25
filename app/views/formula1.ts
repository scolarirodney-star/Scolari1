export const FORMULA1_VIEW = String.raw`
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
  
     <nav class="sport-switcher" aria-label="Cambiar de deporte">
      <button data-route="football">← Fútbol</button>
      <button data-route="nba">NBA →</button>
      </nav>
      
    </section>
     
`;
