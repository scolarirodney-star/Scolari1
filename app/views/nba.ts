export const NBA_VIEW = String.raw`
  <section class="view" data-view="nba" hidden>
    <div class="sport-hero basketball-hero"><div><p class="overline">03 · NBA</p><h1>La cancha<br>no se detiene.</h1><p>Noticias, partidos, resultados y las dos conferencias conectadas con NBA.com.</p></div><div class="basketball-mark" aria-hidden="true"><span></span></div><div id="nba-player-spotlight" class="player-spotlight sport-player"></div></div>
    <section class="event-scoreboard nba-scoreboard" aria-label="Próximos partidos de NBA">
      <button class="scoreboard-arrow" data-event-scroll="nba-event-track" data-scroll-direction="-1" aria-label="Ver partido anterior">‹</button>
      <div class="scoreboard-label"><span>NBA</span><b>PRÓXIMOS</b><small>Temporada 2026/27</small></div>
      <div class="event-track" id="nba-event-track" aria-live="polite"></div>
      <button class="scoreboard-arrow" data-event-scroll="nba-event-track" data-scroll-direction="1" aria-label="Ver más partidos">›</button>
    </section>
    <div class="nba-subnav" role="tablist" aria-label="Contenido de NBA"><button class="active" data-nba-tab="news">Noticias</button><button data-nba-tab="upcoming">Próximos partidos</button><button data-nba-tab="results">Últimos resultados</button><button data-nba-tab="east">Conferencia Este</button><button data-nba-tab="west">Conferencia Oeste</button><button data-nba-tab="teams">Equipos</button></div>
    <section class="section-wrap nba-content"><div class="nba-panel" id="nba-news-panel"><div class="news-grid" id="nba-news"></div></div><div class="nba-panel" id="nba-upcoming-panel" hidden></div><div class="nba-panel" id="nba-results-panel" hidden></div><div class="nba-panel" id="nba-east-panel" hidden></div><div class="nba-panel" id="nba-west-panel" hidden></div><div class="nba-panel" id="nba-teams-panel" hidden></div></section>
  </section>
`;
