export const FOOTBALL_VIEW = String.raw`
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
    <nav class="sport-switcher" aria-label="cambiar de deporte">
      <button data-route="nba">← NBA</button>
      <button data-route="f1">Fórmula 1 →</button>
    </nav>
  </section>
`;
