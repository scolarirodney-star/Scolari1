import {
  ARTICLES,
  COMPETITIONS,
  EDITORIAL_STATUSES,
  F1_CONSTRUCTORS,
  F1_DRIVERS,
  F1_UPCOMING,
  F1_PROFILES,
  F1_RACE_RESULTS,
  FOOTBALL_RESULTS,
  FOOTBALL_STANDINGS,
  FOOTBALL_UPCOMING,
  LEGAL_COPY,
  NBA_RESULTS,
  NBA_STANDINGS,
  NBA_TEAMS,
  NBA_UPCOMING,
} from '../data/index.js';
import { FEATURED_PEOPLE, SPORTS, SPORT_ROUTES, sportConfig, sportName } from '../config/sports.js';

const state = {
  route: 'home',
  homeFilter: 'all',
  competition: 'all',
  region: 'all',
  footballSearch: '',
  resultLeague: 'all',
  resultClub: 'all',
  editorial: Object.fromEntries(ARTICLES.map((article) => [article.id, article.status])),
  selectedArticle: null,
  log: [],
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const competitionIndex = new Map(COMPETITIONS.map((competition) => [competition.id, competition]));
const competitionById = (id) => competitionIndex.get(id);
const byNewest = (a, b) => b.publishedISO.localeCompare(a.publishedISO);
const articlesByNewest = [...ARTICLES].sort(byNewest);
const articlesBySport = Object.fromEntries(SPORT_ROUTES.map((route) => [route, articlesByNewest.filter((article) => article.sport === route)]));
const initializedRoutes = new Set();

function debounce(callback, wait = 140) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
}
const PERSON_WIKI_TITLES = {
  'Rodri': 'Rodri (footballer, born 1996)', 'Vitinha': 'Vitinha (footballer, born February 2000)',
  'Luis Díaz': 'Luis Díaz (footballer, born 1997)', 'Derlis González': 'Derlis González',
  'Óscar Cardozo': 'Óscar Cardozo', 'Sebastián Ferreira': 'Sebastián Ferreira',
  'Kimi Antonelli': 'Andrea Kimi Antonelli', 'Gabriel Magalhães': 'Gabriel Magalhães',
  'João Pedro': 'João Pedro (footballer, born 2001)',
};

const personPhotoCache = new Map();
let spotlightStep = Math.floor(Math.random() * 5);

async function resolvePersonPhoto(name, type = 'football') {
  const cacheKey = `${type}:${name}`;
  if (personPhotoCache.has(cacheKey)) return personPhotoCache.get(cacheKey);
  const request = (async () => {
    let title = PERSON_WIKI_TITLES[name] || name;
    let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    if (!response.ok) {
      const profession = sportConfig(type).profession;
      const query = `${name} ${profession}`;
      const search = await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(query)}&limit=1`);
      if (!search.ok) return null;
      title = (await search.json()).pages?.[0]?.key;
      if (!title) return null;
      response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    }
    if (!response.ok) return null;
    const data = await response.json();
    const image = data.originalimage?.source || data.thumbnail?.source;
    if (!image) return null;
    return { image, page: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}` };
  })().catch(() => null);
  personPhotoCache.set(cacheKey, request);
  return request;
}

function featuredPool(competition = 'all') {
  if (competition !== 'all' && FEATURED_PEOPLE[competition]) return FEATURED_PEOPLE[competition].map((name) => ({ name, competition }));
  return Object.entries(FEATURED_PEOPLE).flatMap(([key, names]) => names.map((name) => ({ name, competition: key })));
}

function featuredLabel(key) {
  if (SPORTS[key]) return sportName(key);
  if (key === 'formula1') return sportName('f1');
  return competitionById(key)?.name || 'Fútbol internacional';
}

async function renderPlayerSpotlight(target, pool, type = 'football') {
  const container = $(target);
  if (!container || !pool.length) return;
  const person = pool[spotlightStep % pool.length];
  const initials = person.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('');
  container.classList.remove('has-player-photo');
  container.innerHTML = `<div class="player-photo-shell"><span>${initials}</span><img alt="Retrato de ${person.name}" loading="eager" decoding="async"></div><div class="player-caption"><small>PROTAGONISTA · ROTACIÓN 30 S</small><strong>${person.name}</strong><span>${featuredLabel(person.competition)}</span><a href="#" target="_blank" rel="noreferrer">Imagen vía Wikipedia/Wikimedia · licencia en origen ↗</a></div>`;
  const photo = await resolvePersonPhoto(person.name, type);
  if (!photo || !container.isConnected || !container.textContent.includes(person.name)) return;
  const image = $('img', container);
  image.addEventListener('load', () => container.classList.add('has-player-photo'), { once: true });
  image.src = photo.image;
  $('a', container).href = photo.page;
}

function refreshPlayerSpotlights() {
  if (document.hidden || !SPORT_ROUTES.includes(state.route)) return;
  const sport = sportConfig(state.route);
  const featuredKey = state.route === 'football' ? state.competition : sport.featuredKey;
  renderPlayerSpotlight(sport.spotlightTarget, featuredPool(featuredKey), state.route);
}

setInterval(() => {
  if (document.hidden || !SPORT_ROUTES.includes(state.route)) return;
  spotlightStep += 1;
  refreshPlayerSpotlights();
}, 30000);

const IDENTITY_COLORS = {
  'Olimpia': ['#f4f4f0', '#111719'], 'Cerro Porteño': ['#e23d45', '#173f83'], 'Libertad': ['#f4f4f4', '#171717'],
  'Guaraní': ['#f2c13d', '#151515'], 'Sportivo Ameliano': ['#2c65a8', '#f5f6f7'], 'Trinidense': ['#e8c433', '#173b7a'],
  '2 de Mayo': ['#df353f', '#f5f5f5'], 'Mercedes': ['#20d6b1', '#10191b'], 'Ferrari': ['#ef1b2d', '#ffcf2e'],
  'McLaren': ['#ff8700', '#111111'], 'Red Bull Racing': ['#2446a8', '#ef233c'], 'Racing Bulls': ['#e9edf3', '#244fbd'],
  'Alpine': ['#2584cf', '#f19bc2'], 'Audi': ['#e8e8e8', '#d71920'], 'Williams': ['#0f5bd8', '#f5f6f7'],
  'Aston Martin': ['#0b6f5e', '#d6e530'], 'Haas F1 Team': ['#e9e9e9', '#d51e2b'], 'Cadillac': ['#15191d', '#d3d8dc'],
};

const TEAM_WIKI_PAGES = {
  // Paraguay y nombres abreviados o ambiguos.
  '2 de Mayo': 'Club 2 de Mayo', 'Cerro Porteño': 'Cerro Porteño', 'Guaraní': 'Club Guaraní',
  'Libertad': 'Club Libertad', 'Luqueño': 'Sportivo Luqueño', 'Nacional': 'Club Nacional',
  'Olimpia': 'Club Olimpia', 'Recoleta': 'Deportivo Recoleta', 'Rubio Ñu': 'Club Rubio Ñu',
  'San Lorenzo': 'Sportivo San Lorenzo', 'Sportivo Ameliano': 'Sportivo Ameliano', 'Trinidense': 'Sportivo Trinidense',
  // Europa: abreviaturas usadas por la interfaz.
  'Athletic': 'Athletic Bilbao', 'Atlético': 'Atlético Madrid', 'Barcelona': 'FC Barcelona',
  'Betis': 'Real Betis', 'Deportivo': 'Deportivo de La Coruña', 'Espanyol': 'RCD Espanyol',
  'Racing': 'Racing de Santander', 'Rayo': 'Rayo Vallecano', 'Man City': 'Manchester City F.C.',
  'Man United': 'Manchester United F.C.', 'Nottingham': 'Nottingham Forest F.C.',
  'Brighton': 'Brighton & Hove Albion F.C.', 'Bournemouth': 'AFC Bournemouth',
  'Ipswich': 'Ipswich Town F.C.', 'Hull': 'Hull City A.F.C.', 'Leeds': 'Leeds United F.C.',
  'Newcastle': 'Newcastle United F.C.', 'Marseille': 'Olympique de Marseille', 'Lyon': 'Olympique Lyonnais',
  'PSG': 'Paris Saint-Germain F.C.', 'Rennes': 'Stade Rennais F.C.', 'Brest': 'Stade Brestois 29',
  'Nice': 'OGC Nice', 'Monaco': 'AS Monaco FC', 'Le Havre': 'Le Havre AC', 'Troyes': 'ES Troyes AC',
  'Strasbourg': 'RC Strasbourg Alsace', 'Lens': 'RC Lens', 'Lille': 'Lille OSC', 'Lorient': 'FC Lorient',
  'N.E.C.': 'NEC Nijmegen', 'Bodø/Glimt': 'FK Bodø/Glimt', 'LASK': 'LASK',
  'GNK Dinamo': 'GNK Dinamo Zagreb', 'AEK Athens': 'AEK Athens F.C.', 'Celje': 'NK Celje',
  'Slovan Bratislava': 'ŠK Slovan Bratislava', 'Sabah': 'Sabah FC (Azerbaijan)',
  'Hapoel Beer-Sheva': 'Hapoel Be\'er Sheva F.C.', 'Viking': 'Viking FK', 'Levski Sofia': 'PFC Levski Sofia',
  // Parrilla 2026.
  'Mercedes': 'Mercedes-Benz in Formula One', 'Ferrari': 'Scuderia Ferrari', 'McLaren': 'McLaren',
  'Red Bull Racing': 'Red Bull Racing', 'Racing Bulls': 'Racing Bulls', 'Alpine': 'Alpine F1 Team',
  'Haas F1 Team': 'Haas F1 Team', 'Audi': 'Audi in Formula One', 'Williams': 'Williams Racing',
  'Aston Martin': 'Aston Martin in Formula One', 'Cadillac': 'Cadillac Formula 1 Team',
};

const logoRequestCache = new Map();

async function resolveTeamLogo(name, kind) {
  const cacheKey = `${kind}:${name}`;
  if (logoRequestCache.has(cacheKey)) return logoRequestCache.get(cacheKey);
  const request = (async () => {
    let title = TEAM_WIKI_PAGES[name];
    if (!title) {
      const query = kind === 'f1' ? `${name} Formula One team` : kind === 'nba' ? `${name} NBA basketball team` : `${name} association football club`;
      const searchResponse = await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(query)}&limit=1`);
      if (!searchResponse.ok) return null;
      const searchData = await searchResponse.json();
      title = searchData.pages?.[0]?.key;
    }
    if (!title) return null;
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    if (!response.ok) return null;
    const data = await response.json();
    const image = data.thumbnail?.source || data.originalimage?.source;
    if (!image) return null;
    return { image, page: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}` };
  })().catch(() => null);
  logoRequestCache.set(cacheKey, request);
  return request;
}

async function loadTeamLogo(badge) {
  if (!badge.isConnected || badge.dataset.logoReady === 'loading' || badge.dataset.logoReady === 'true') return;
  badge.dataset.logoReady = 'loading';
  const result = await resolveTeamLogo(badge.dataset.teamLogo, badge.dataset.logoKind || 'football');
  if (!result || !badge.isConnected) { badge.dataset.logoReady = 'fallback'; return; }
  const image = $('img', badge);
  image.addEventListener('load', () => badge.classList.add('has-logo'), { once: true });
  image.src = result.image;
  badge.closest('a')?.setAttribute('href', result.page);
  badge.dataset.logoReady = 'true';
}

const logoObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    loadTeamLogo(entry.target);
  });
}, { rootMargin: '320px 0px' });

function hydrateTeamLogos(root = document) {
  $$('[data-team-logo]:not([data-logo-ready])', root).forEach((badge) => {
    badge.dataset.logoReady = 'queued';
    if (logoObserver) logoObserver.observe(badge);
    else loadTeamLogo(badge);
  });
}

function identityBadge(name, kind = 'football') {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const fallbackHue = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
  const colors = IDENTITY_COLORS[name] || [`hsl(${fallbackHue} 62% 45%)`, kind === 'f1' ? '#ffffff' : '#0a1411'];
  const identityType = kind === 'f1' ? 'Formula One team' : kind === 'nba' ? 'NBA basketball team' : 'football club';
  const searchUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(`${name} ${identityType}`)}`;
  return `<a class="team-logo-link" href="${searchUrl}" target="_blank" rel="noreferrer" title="Ver origen del escudo de ${name}"><span class="team-identity ${kind}" data-team-logo="${name}" data-logo-kind="${kind}" style="--identity-primary:${colors[0]};--identity-accent:${colors[1]}" aria-label="Escudo de ${name}"><img alt="" loading="lazy" decoding="async"><b>${initials}</b></span></a>`;
}

function newsCard(article) {
  const sport = sportConfig(article.sport);
  const competition = article.sport === 'football' ? competitionById(article.competition) : null;
  const category = competition?.name || sport.name;
  const status = state.editorial[article.id];
  const media = article.media || sport.media;
  return `
    <article class="news-card ${article.sport === 'football' ? '' : `${article.sport}-card`}">
      <div class="news-visual">
        <img class="news-image" src="${media.url}" alt="${media.alt}" loading="lazy" decoding="async">
        <span class="visual-code">${article.visual}</span>
        <span class="card-status">Demo · ${status}</span>
        <a class="media-credit" href="${media.source || article.url}" target="_blank" rel="noreferrer">${media.credit}</a>
      </div>
      <div class="news-body">
        <div class="news-meta"><span class="news-category">${sport.contentLabel} · ${category}</span><span>${article.published}</span></div>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <div class="news-source">
          <small>Medio: ${article.source}<br>Última revisión: ${article.reviewed}</small>
          <span class="news-actions"><a href="${article.url}" target="_blank" rel="noreferrer">Leer noticia completa en la fuente ↗</a>${article.videoUrl ? `<a class="video-link" href="${article.videoUrl}" target="_blank" rel="noreferrer">▶ Ver canal de video</a>` : ''}</span>
        </div>
      </div>
    </article>`;
}

function emptyState(title, detail) {
  return `<div class="empty-state"><b>${title}</b><p>${detail}</p></div>`;
}

function renderHomeNews() {
  const items = articlesByNewest.filter((article) => state.homeFilter === 'all' || article.sport === state.homeFilter).slice(0, 4);
  $('#home-news').innerHTML = items.length ? items.map(newsCard).join('') : emptyState('Sin noticias', 'No hay publicaciones para este filtro.');
}

function renderCompetitionControls() {
  const visibleCompetitions = COMPETITIONS.filter((item) => state.region === 'all' || item.region === state.region);
  const select = $('#competition-filter');
  select.innerHTML = '<option value="all">Todas las competiciones</option>' + visibleCompetitions.map((item) => `<option value="${item.id}">${item.name}</option>`).join('');
  select.value = state.competition;
  $('#competition-rail').innerHTML = `
    <button class="competition-chip all-competitions ${state.competition === 'all' ? 'active' : ''}" data-competition="all" style="--chip-color:#2ee6a6"><i></i><span><b>Todas</b><small>${state.region === 'all' ? 'Europa + Sudamérica' : state.region}</small></span></button>
    ${visibleCompetitions.map((item) => `<button class="competition-chip ${state.competition === item.id ? 'active' : ''}" data-competition="${item.id}" style="--chip-color:${item.color}"><span class="competition-logo"><img src="${item.logo}" alt="Emblema de ${item.name}" loading="lazy" decoding="async"></span><span><b>${item.name}</b><small>${item.region}</small></span></button>`).join('')}`;
}

function footballArticles() {
  return articlesBySport.football.filter((article) => {
    const competition = competitionById(article.competition);
    const query = `${article.title} ${article.summary} ${article.source} ${competition?.name || ''}`.toLowerCase();
    return (state.competition === 'all' || article.competition === state.competition)
      && (state.region === 'all' || competition?.region === state.region)
      && (!state.footballSearch || query.includes(state.footballSearch.toLowerCase()));
  });
}

function filteredFootballData(items) {
  return items.filter((item) => {
    const competition = competitionById(item.competition);
    return (state.competition === 'all' || item.competition === state.competition)
      && (state.region === 'all' || competition?.region === state.region);
  });
}

function standingsTable(standing) {
  const note = standing.note ? `<p class="standings-note">${standing.note}</p>` : '';
  if (!standing.rows.length) {
    return `<div class="standings-empty">${note}<a class="source-link" href="${standing.url}" target="_blank" rel="noreferrer">Consultar estado oficial en ${standing.source} ↗</a></div>`;
  }
  return `${note}<div class="data-table-wrap"><table class="data-table standings-table">
    <caption>${standing.season} · Actualización revisada: ${standing.updated}</caption>
    <thead><tr><th>Pos.</th><th>Club</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts.</th></tr></thead>
    <tbody>${standing.rows.map((row) => `<tr><td class="position">${row.pos}</td><td class="club"><span class="team-cell">${identityBadge(row.team)}<b>${row.team}</b></span></td><td>${row.played}</td><td>${row.won}</td><td>${row.drawn}</td><td>${row.lost}</td><td>${row.gf}</td><td>${row.ga}</td><td>${row.gd}</td><td class="points">${row.points}</td></tr>`).join('')}</tbody>
  </table></div><div class="standings-source"><span>Instantánea de demostración · no es tiempo real</span><a class="source-link" href="${standing.url}" target="_blank" rel="noreferrer">Fuente: ${standing.source} ↗</a></div>`;
}

function resultFootballData() {
  return FOOTBALL_RESULTS.filter((item) => {
    const competition = competitionById(item.competition);
    return (state.resultLeague === 'all' || item.competition === state.resultLeague)
      && (state.region === 'all' || competition?.region === state.region);
  });
}

function renderResultLeagueFilter() {
  const select = $('#result-league-filter');
  if (!select) return;
  const availableIds = new Set(FOOTBALL_RESULTS.map((item) => item.competition));
  const leagues = COMPETITIONS.filter((item) => availableIds.has(item.id) && (state.region === 'all' || item.region === state.region));
  if (state.resultLeague !== 'all' && !leagues.some((item) => item.id === state.resultLeague)) state.resultLeague = 'all';
  select.innerHTML = '<option value="all">Todas las ligas</option>' + leagues.map((item) => `<option value="${item.id}">${item.name}</option>`).join('');
  select.value = state.resultLeague;
}

function renderResultClubFilter() {
  const select = $('#result-club-filter');
  if (!select) return;
  const available = resultFootballData();
  const clubs = [...new Set(available.flatMap((item) => [item.home, item.away]))].sort((a, b) => a.localeCompare(b, 'es'));
  if (state.resultClub !== 'all' && !clubs.includes(state.resultClub)) state.resultClub = 'all';
  select.innerHTML = '<option value="all">Todos los clubes</option>' + clubs.map((club) => `<option value="${club}">${club}</option>`).join('');
  select.value = state.resultClub;
}

function roundNumber(round) {
  return Number(round.match(/\d+/)?.[0] || 999);
}

function renderMatchday(round, matches) {
  const dates = [...new Set(matches.map((item) => item.date))];
  return `<section class="matchday-block">
    <header class="matchday-heading"><div><span>JORNADA</span><h3>${round}</h3></div><small>${dates.join(' · ')}</small></header>
    <div class="match-list">${matches.sort((a, b) => a.dateISO.localeCompare(b.dateISO)).map((item, index) => `
      <article class="match-row">
        <span class="match-number">PARTIDO ${String(index + 1).padStart(2, '0')}</span>
        <time datetime="${item.dateISO}">${item.date}</time>
        <div class="match-team home"><b>${item.home}</b>${identityBadge(item.home)}</div>
        <strong class="match-score">${item.homeScore}<i>–</i>${item.awayScore}</strong>
        <div class="match-team away">${identityBadge(item.away)}<b>${item.away}</b></div>
        <a class="source-link" href="${item.url}" target="_blank" rel="noreferrer">${item.source} ↗</a>
      </article>`).join('')}</div>
  </section>`;
}

function renderGroupedFootballResults(results) {
  return COMPETITIONS.filter((competition) => results.some((item) => item.competition === competition.id)).map((competition) => {
    const leagueMatches = results.filter((item) => item.competition === competition.id);
    const rounds = [...new Set(leagueMatches.map((item) => item.round))].sort((a, b) => roundNumber(a) - roundNumber(b) || a.localeCompare(b, 'es'));
    return `<section class="results-league-section" style="--league-color:${competition.color}">
      <header class="results-league-heading"><div><span>${competition.region}</span><h2>${competition.name}</h2></div><strong>${leagueMatches.length} partidos verificados</strong></header>
      ${rounds.map((round) => renderMatchday(round, leagueMatches.filter((item) => item.round === round))).join('')}
    </section>`;
  }).join('');
}

function renderFootballStandings() {
  const container = $('#football-standings');
  if (state.competition !== 'all') {
    const standing = FOOTBALL_STANDINGS[state.competition];
    container.innerHTML = `<div class="standings-heading"><div><p class="overline">TABLA DE POSICIONES</p><h2>${standing.title}</h2></div><span>${standing.season}</span></div>${standingsTable(standing)}`;
    return;
  }

  const competitions = COMPETITIONS.filter((item) => state.region === 'all' || item.region === state.region);
  container.innerHTML = `<div class="standings-heading"><div><p class="overline">POSICIONES</p><h2>Elegí una competición</h2></div><span>Última revisión visible en cada tabla</span></div><div class="standings-overview">${competitions.map((competition) => {
    const standing = FOOTBALL_STANDINGS[competition.id];
    const leader = standing.rows[0];
    return `<button class="standing-preview" data-standing-competition="${competition.id}" style="--preview-color:${competition.color}"><span>${competition.short}</span><div><b>${competition.name}</b><small>${leader ? `Líder: ${leader.team} · ${leader.points} pts.` : 'Clasificación todavía no disponible'}</small></div><i>Ver tabla →</i></button>`;
  }).join('')}</div>`;
}

function renderFootballEventStrip() {
  const competition = state.competition === 'all' ? null : competitionById(state.competition);
  const events = filteredFootballData(FOOTBALL_UPCOMING).slice(0, state.competition === 'all' ? 18 : undefined);
  $('#football-event-label').innerHTML = `<span>${competition?.short || 'FÚTBOL'}</span><b>${competition?.name || (state.region === 'all' ? 'PRÓXIMOS' : state.region)}</b><small>${events.length} eventos</small>`;
  $('#football-event-track').innerHTML = events.length ? events.map((item) => `
    <article class="event-score-card" style="--event-color:${competitionById(item.competition)?.color || '#2ee6a6'}">
      <header><time>${item.time} <small>${item.zone}</small></time><span>${item.date}</span></header>
      <div class="scoreboard-team">${identityBadge(item.home)}<b>${item.home}</b></div>
      <div class="scoreboard-team">${identityBadge(item.away)}<b>${item.away}</b></div>
      <footer><span>${item.round}</span><a href="${item.url}" target="_blank" rel="noreferrer" aria-label="Consultar ${item.home} contra ${item.away} en ${item.source}">${item.source} ↗</a></footer>
    </article>`).join('') : emptyState('Sin eventos próximos', 'No hay una agenda verificada para este filtro.');
  hydrateTeamLogos($('#football-event-track'));
}

function renderF1EventStrip() {
  $('#f1-event-track').innerHTML = F1_UPCOMING.map((event) => `
    <article class="event-score-card f1-event-card">
      <header><time>RONDA ${String(event.round).padStart(2, '0')}</time><span>${event.dates}</span></header>
      <div class="race-strip-title"><small>${event.country}</small><b>${event.race}</b></div>
      <div class="race-strip-circuit"><span>CIRCUITO</span><strong>${event.circuit}</strong></div>
      <footer><span>Próxima carrera</span><a href="${event.url}" target="_blank" rel="noreferrer">${event.source} ↗</a></footer>
    </article>`).join('');
}

function renderFootball() {
  const articles = footballArticles();
  $('#football-news').innerHTML = articles.length ? articles.map(newsCard).join('') : emptyState('Sin noticias para esta búsqueda', 'La competición sí está disponible, pero no encontramos publicaciones que coincidan con el texto ingresado.');
  renderFootballStandings();
  renderPlayerSpotlight('#football-player-spotlight', featuredPool(state.competition));
  renderFootballEventStrip();

  renderResultLeagueFilter();
  renderResultClubFilter();
  const results = resultFootballData().filter((item) => state.resultClub === 'all' || item.home === state.resultClub || item.away === state.resultClub);
  $('#football-results').innerHTML = results.length ? `${renderGroupedFootballResults(results)}
    <p class="data-note">Partidos finalizados y verificados hasta el 24 ago 2026. Bundesliga todavía no aparece porque su temporada comienza el 28 de agosto. Los escudos se consultan desde Wikipedia/Wikimedia y enlazan a su página de origen; las marcas pertenecen a sus titulares.</p>` : emptyState('Sin resultados verificados', 'No hay partidos finalizados que coincidan con la liga y el club seleccionados.');

  const upcoming = filteredFootballData(FOOTBALL_UPCOMING);
  const upcomingTitle = state.competition === 'all' ? 'Agenda de todas las competiciones' : `Próximos partidos · ${competitionById(state.competition)?.name}`;
  $('#football-upcoming').innerHTML = upcoming.length ? `
    <div class="upcoming-heading"><div><p class="overline">AGENDA VERIFICADA</p><h2>${upcomingTitle}</h2></div><span>${upcoming.length} eventos programados</span></div>
    <table class="data-table">
      <caption>Partidos próximos · horarios locales de cada competición y sujetos a cambios</caption>
      <thead><tr><th>Fecha</th><th>Jornada</th><th>Competición</th><th>Local</th><th>Hora</th><th>Visitante</th><th>Estado</th><th>Fuente</th></tr></thead>
      <tbody>${upcoming.map((item) => `<tr><td>${item.date}</td><td>${item.round}</td><td>${competitionById(item.competition)?.name}</td><td><span class="team-cell">${identityBadge(item.home)}<b>${item.home}</b></span></td><td class="score">${item.time}<small>${item.zone}</small></td><td><span class="team-cell">${identityBadge(item.away)}<b>${item.away}</b></span></td><td><span class="event-status">Próximo</span></td><td><a class="source-link" href="${item.url}" target="_blank" rel="noreferrer">${item.source} ↗</a></td></tr>`).join('')}</tbody>
    </table>
    <p class="data-note">Última revisión editorial: 24 ago 2026. El estado “En vivo” solo se habilitará cuando exista una conexión autorizada que confirme el inicio del evento. Confirmá siempre el horario definitivo en la fuente original.</p>` : emptyState('Sin próximos partidos verificados', 'La fuente o API autorizada para esta competición todavía no está conectada.');
  const visiblePanel = $$('.tab-panel', $('[data-view="football"]')).find((panel) => !panel.hidden);
  if (visiblePanel) hydrateTeamLogos(visiblePanel);
}

function rankingRows() {
  return F1_DRIVERS.map((driver) => `<div class="ranking-row"><span class="rank">${String(driver.rank).padStart(2, '0')}</span>${identityBadge(driver.team, 'f1')}<div><b>${driver.name}</b><small>${driver.code} · ${driver.team}</small></div><strong>${driver.points}</strong></div>`).join('');
}

function constructorRows() {
  return F1_CONSTRUCTORS.map((team) => `<div class="ranking-row"><span class="rank">${String(team.rank).padStart(2, '0')}</span>${identityBadge(team.name, 'f1')}<div><b>${team.name}</b><small>Constructor · Temporada 2026</small></div><strong>${team.points}</strong></div>`).join('');
}

function renderF1() {
  renderPlayerSpotlight('#f1-player-spotlight', featuredPool('formula1'), 'f1');
  renderF1EventStrip();
  const articles = articlesBySport.f1;
  $('#f1-news').innerHTML = articles.map(newsCard).join('');

  const nextRace = F1_UPCOMING[0];
  $('#f1-calendar-panel').innerHTML = `<section class="f1-schedule"><div class="next-race-card"><div><span class="tag">PRÓXIMA CARRERA · RONDA ${nextRace.round}</span><h2>${nextRace.race}</h2><p>${nextRace.circuit} · ${nextRace.dates}</p></div><strong>${nextRace.country}</strong><a class="source-link" href="${nextRace.url}" target="_blank" rel="noreferrer">${nextRace.source} ↗</a></div><div class="data-table-wrap"><table class="data-table"><caption>Próximos Grandes Premios · calendario oficial 2026</caption><thead><tr><th>Ronda</th><th>Gran Premio</th><th>Circuito</th><th>Fechas</th><th>Estado</th><th>Fuente</th></tr></thead><tbody>${F1_UPCOMING.map((event) => `<tr><td class="position">${event.round}</td><td><b>${event.race}</b><small>${event.country}</small></td><td>${event.circuit}</td><td>${event.dates}</td><td><span class="event-status f1-event">Próximo</span></td><td><a class="source-link" href="${event.url}" target="_blank" rel="noreferrer">${event.source} ↗</a></td></tr>`).join('')}</tbody></table></div><p class="data-note">Última revisión editorial: 24 ago 2026. Formula1.com identifica Italia como la próxima carrera. Los horarios detallados de sesiones deben confirmarse en la fuente oficial.</p></section>`;

  $('#f1-race-panel').innerHTML = `<div class="standings-heading f1-heading"><div><p class="overline">RESULTADO COMPLETO</p><h2>${F1_RACE_RESULTS.race}</h2></div><span>${F1_RACE_RESULTS.date}</span></div><div class="data-table-wrap"><table class="data-table f1-results"><caption>Resultado oficial · revisión ${F1_RACE_RESULTS.updated}</caption><thead><tr><th>Pos.</th><th>Piloto</th><th>Equipo</th><th>Vueltas</th><th>Tiempo / Estado</th><th>Pts.</th></tr></thead><tbody>${F1_RACE_RESULTS.rows.map((row) => `<tr><td class="position">${row.pos}</td><td><b>${row.driver}</b><small>${row.code}</small></td><td><span class="team-cell">${identityBadge(row.team, 'f1')}<b>${row.team}</b></span></td><td>${row.laps}</td><td>${row.result}</td><td class="f1-points">${row.points}</td></tr>`).join('')}</tbody></table></div><div class="standings-source"><span>Resultado oficial de la carrera</span><a class="source-link" href="${F1_RACE_RESULTS.url}" target="_blank" rel="noreferrer">${F1_RACE_RESULTS.source} ↗</a></div>`;

  $('#f1-drivers-panel').innerHTML = `<div class="ranking-layout"><div class="ranking-card"><h2>Clasificación de pilotos</h2>${rankingRows()}<div class="ranking-source"><span>Tabla completa · revisión 24 ago 2026</span><a href="https://www.formula1.com/en/results/2026/drivers" target="_blank" rel="noreferrer">Fuente oficial ↗</a></div></div><div class="placeholder-card"><span class="tag">Revisión editorial</span><h2>23 pilotos verificados</h2><p>La tabla muestra las posiciones y los puntos publicados por Formula1.com. Es una instantánea de demostración: todavía no se actualiza automáticamente.</p></div></div>`;

  $('#f1-constructors-panel').innerHTML = `<div class="ranking-layout"><div class="ranking-card"><h2>Clasificación de constructores</h2>${constructorRows()}<div class="ranking-source"><span>11 constructores · revisión 24 ago 2026</span><a href="https://www.formula1.com/en/results/2026/team" target="_blank" rel="noreferrer">Fuente oficial ↗</a></div></div><div class="placeholder-card"><span class="tag">Fuente oficial</span><h2>Tabla completa</h2><p>La clasificación reproduce posiciones y puntos publicados en Formula1.com. La actualización automática futura deberá pasar por revisión editorial.</p></div></div>`;

  $('#f1-profiles-panel').innerHTML = `<div class="profile-grid">${F1_PROFILES.map((profile) => `<article class="profile-card">${identityBadge(profile.team, 'f1')}<span class="profile-code">${profile.code}</span><h3>${profile.team}</h3><p>${profile.drivers}</p><p>Logotipo de referencia enlazado a su página de origen.</p></article>`).join('')}</div><p class="data-note">Los logotipos se consultan desde Wikipedia/Wikimedia para identificación editorial. Cada imagen enlaza a su origen y las marcas pertenecen a sus respectivos titulares.</p>`;
  hydrateTeamLogos($('#f1-news-panel'));
}

function renderNBAEventStrip() {
  $('#nba-event-track').innerHTML = NBA_UPCOMING.map((event) => `
    <article class="event-score-card nba-event-card">
      <header><time>${event.time} <small>${event.zone}</small></time><span>${event.date}</span></header>
      <div class="scoreboard-team">${identityBadge(event.away, 'nba')}<b>${event.away}</b></div>
      <div class="scoreboard-team">${identityBadge(event.home, 'nba')}<b>${event.home}</b></div>
      <footer><span>${event.phase}</span><a href="${event.url}" target="_blank" rel="noreferrer">${event.source} ↗</a></footer>
    </article>`).join('');
  hydrateTeamLogos($('#nba-event-track'));
}

function nbaStandingsTable(conference, rows) {
  return `<div class="standings-heading nba-heading"><div><p class="overline">CLASIFICACIÓN FINAL 2025/26</p><h2>Conferencia ${conference}</h2></div><span>Temporada 2026/27 todavía no iniciada</span></div><div class="data-table-wrap"><table class="data-table standings-table nba-standings"><caption>Instantánea oficial al cierre de la fase regular 2025/26</caption><thead><tr><th>Pos.</th><th>Equipo</th><th>G</th><th>P</th><th>PCT</th><th>Dif.</th></tr></thead><tbody>${rows.map((row) => `<tr><td class="position">${row.pos}</td><td class="club"><span class="team-cell">${identityBadge(row.team, 'nba')}<b>${row.team}</b></span></td><td>${row.wins}</td><td>${row.losses}</td><td class="points">${row.pct}</td><td>${row.gb}</td></tr>`).join('')}</tbody></table></div><div class="standings-source"><span>Revisión editorial: 24 ago 2026 · datos históricos, no tiempo real</span><a class="source-link" href="https://www.nba.com/standings" target="_blank" rel="noreferrer">Fuente oficial NBA.com ↗</a></div>`;
}

function renderNBA() {
  renderPlayerSpotlight('#nba-player-spotlight', featuredPool('nba'), 'nba');
  renderNBAEventStrip();
  const articles = articlesBySport.nba;
  $('#nba-news').innerHTML = articles.map(newsCard).join('');

  $('#nba-upcoming-panel').innerHTML = `<div class="standings-heading nba-heading"><div><p class="overline">OPENING NIGHT</p><h2>Próximos partidos</h2></div><span>Horarios publicados en ET</span></div><div class="nba-game-grid">${NBA_UPCOMING.map((event) => `<article class="nba-game-card"><header><span>${event.phase}</span><time>${event.date} · ${event.time} ${event.zone}</time></header><div>${identityBadge(event.away, 'nba')}<b>${event.away}</b><strong>@</strong><b>${event.home}</b>${identityBadge(event.home, 'nba')}</div><a class="source-link" href="${event.url}" target="_blank" rel="noreferrer">Confirmar en ${event.source} ↗</a></article>`).join('')}</div><p class="data-note">La fase regular 2026/27 comienza el 20 de octubre. Los horarios están sujetos a cambios y deben verificarse en NBA.com.</p>`;

  $('#nba-results-panel').innerHTML = `<div class="standings-heading nba-heading"><div><p class="overline">ÚLTIMA SERIE FINALIZADA</p><h2>Finales NBA 2026</h2></div><span>New York Knicks 4–1 San Antonio Spurs</span></div><div class="nba-game-grid">${NBA_RESULTS.map((game) => `<article class="nba-game-card final-result"><header><span>FINALIZADO</span><b>Juego ${game.game}</b></header><div>${identityBadge(game.away, 'nba')}<b>${game.away}</b><strong>${game.awayScore}–${game.homeScore}</strong><b>${game.home}</b>${identityBadge(game.home, 'nba')}</div></article>`).join('')}</div><div class="standings-source"><span>Marcadores oficiales de la serie · revisión 24 ago 2026</span><a class="source-link" href="https://www.nba.com/news/2026-nba-playoffs-schedule" target="_blank" rel="noreferrer">Fuente oficial NBA.com ↗</a></div>`;

  $('#nba-east-panel').innerHTML = nbaStandingsTable('Este', NBA_STANDINGS.east);
  $('#nba-west-panel').innerHTML = nbaStandingsTable('Oeste', NBA_STANDINGS.west);
  $('#nba-teams-panel').innerHTML = `<div class="standings-heading nba-heading"><div><p class="overline">FRANQUICIAS</p><h2>Los 30 equipos</h2></div><span>Organizados por conferencia</span></div><div class="nba-team-grid">${NBA_TEAMS.map((team) => `<article class="nba-team-card">${identityBadge(team.name, 'nba')}<div><b>${team.name}</b><small>Conferencia ${team.conference}</small></div></article>`).join('')}</div><p class="data-note">Los emblemas se consultan desde Wikipedia/Wikimedia para identificación editorial y enlazan a su página de origen. Las marcas pertenecen a sus titulares.</p>`;
  hydrateTeamLogos($('#nba-news-panel'));
}

const SPORT_RENDERERS = {
  football: () => {
    renderCompetitionControls();
    renderFootball();
  },
  f1: renderF1,
  nba: renderNBA,
};

function renderSportOnce(route) {
  if (initializedRoutes.has(route)) return;
  SPORT_RENDERERS[route]?.();
  initializedRoutes.add(route);
}

function setRoute(route) {
  state.route = route;
  $$('.view').forEach((view) => {
    const active = view.dataset.view === route;
    view.hidden = !active;
    view.classList.toggle('active-view', active);
  });
  $$('.nav-button').forEach((button) => {
    const active = button.dataset.route === route;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $('#mobile-nav').hidden = true;
  $('#menu-button').setAttribute('aria-expanded', 'false');
  renderSportOnce(route);
  if (route === 'admin') renderAdmin();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', route === 'home' ? '#inicio' : `#${route}`);
}

function renderAdmin() {
  const counts = Object.fromEntries(EDITORIAL_STATUSES.map((status) => [status, Object.values(state.editorial).filter((value) => value === status).length]));
  const colors = ['#96a1a4', '#f6c85f', '#2dbb83', '#ff7d46', '#697477'];
  $('#admin-summary').innerHTML = EDITORIAL_STATUSES.map((status, index) => `<div class="summary-card" style="--summary-color:${colors[index]}"><span>${status}</span><b>${counts[status]}</b><i></i></div>`).join('');
  $('#queue-count').textContent = ARTICLES.length;
  $('#log-count').textContent = state.log.length;
  $('#review-list').innerHTML = ARTICLES.map((article) => `<button class="review-item ${state.selectedArticle === article.id ? 'active' : ''}" data-review-id="${article.id}" style="--item-color:${sportConfig(article.sport).accent}"><i></i><span><b>${article.title}</b><small>${article.source} · ${article.reviewed}</small></span><span class="state-pill">${state.editorial[article.id]}</span></button>`).join('');
  $$('.review-item').forEach((button) => button.addEventListener('click', () => {
    state.selectedArticle = button.dataset.reviewId;
    renderAdmin();
    renderReviewDetail(state.selectedArticle);
  }));
  if (state.selectedArticle) renderReviewDetail(state.selectedArticle);
  $('#change-log').innerHTML = state.log.length ? state.log.map((entry) => `<p class="log-entry"><b>${entry.title}</b> · ${entry.action}<time>${entry.time}</time></p>`).join('') : '<p class="empty-line">Todavía no hay cambios en esta sesión.</p>';
}

function renderReviewDetail(id) {
  const article = ARTICLES.find((item) => item.id === id);
  if (!article) return;
  const checks = [
    'La información sigue vigente',
    'La fuente es confiable y el enlace funciona',
    'No existe una noticia duplicada',
    'El resumen está escrito con palabras propias',
    'No contiene imágenes sin permiso de uso',
  ];
  const editorialCategory = article.sport === 'football' ? competitionById(article.competition)?.name : sportName(article.sport);
  $('#review-panel').innerHTML = `<div class="review-detail"><h3>${article.title}</h3><p>${article.summary}</p><div class="review-meta"><div><small>Deporte y competición</small><b>${editorialCategory}</b></div><div><small>Última revisión</small><b>${article.reviewed}</b></div><div><small>Fuente</small><a href="${article.url}" target="_blank" rel="noreferrer">${article.source} ↗</a></div><div><small>Derechos</small><b>${article.rights}</b></div></div><div class="status-select"><label for="editorial-status">Estado editorial</label><select id="editorial-status">${EDITORIAL_STATUSES.map((status) => `<option ${state.editorial[id] === status ? 'selected' : ''}>${status}</option>`).join('')}</select></div><div class="editorial-checklist"><b>Checklist obligatorio</b>${checks.map((check, index) => `<label><input type="checkbox" data-check="${index}"><span>${check}</span></label>`).join('')}</div><button class="save-review" id="save-review" disabled>Registrar revisión</button></div>`;
  const checkboxes = $$('[data-check]', $('#review-panel'));
  const save = $('#save-review');
  const validate = () => { save.disabled = !checkboxes.every((checkbox) => checkbox.checked); };
  checkboxes.forEach((checkbox) => checkbox.addEventListener('change', validate));
  save.addEventListener('click', () => {
    const newStatus = $('#editorial-status').value;
    state.editorial[id] = newStatus;
    initializedRoutes.delete(article.sport);
    renderHomeNews();
    state.log.unshift({ title: article.title, action: `revisión registrada · ${newStatus}`, time: new Date().toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' }) });
    renderAdmin();
  });
}

function globalResults(query) {
  if (query.length < 2) return [];
  const normalized = query.toLowerCase();
  const articles = ARTICLES.filter((item) => `${item.title} ${item.summary} ${item.source}`.toLowerCase().includes(normalized)).map((item) => ({ title: item.title, detail: `${item.source} · ${sportName(item.sport)}`, url: item.url }));
  const competitions = COMPETITIONS.filter((item) => `${item.name} ${item.region}`.toLowerCase().includes(normalized)).map((item) => ({ title: item.name, detail: `${item.region} · Fuente oficial`, url: item.url }));
  return [...articles, ...competitions];
}

function bindSportTabs(sport) {
  const attribute = `data-${sport}-tab`;
  $$(`[${attribute}]`).forEach((button) => button.addEventListener('click', () => {
    $$(`[${attribute}]`).forEach((item) => item.classList.toggle('active', item === button));
    const tab = button.dataset[`${sport}Tab`];
    const targetId = `${sport}-${tab}-panel`;
    $$(`.${sport}-panel`).forEach((panel) => { panel.hidden = panel.id !== targetId; });
    hydrateTeamLogos($(`#${targetId}`));
  }));
}

function bindEvents() {
  $$('[data-route]').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    setRoute(button.dataset.route);
  }));

  $$('[data-home-filter]').forEach((button) => button.addEventListener('click', () => {
    state.homeFilter = button.dataset.homeFilter;
    $$('[data-home-filter]').forEach((item) => item.classList.toggle('active', item === button));
    renderHomeNews();
  }));

  const positionMobileNav = () => {
    const header = $('.site-header');
    if (!header) return;
    $('#mobile-nav').style.top = `${Math.round(header.getBoundingClientRect().bottom)}px`;
  };

  const openMobileNav = () => {
    positionMobileNav();
    $('#mobile-nav').hidden = false;
    $('#menu-button').setAttribute('aria-expanded', 'true');
  };

  const closeMobileNav = () => {
    $('#mobile-nav').hidden = true;
    $('#menu-button').setAttribute('aria-expanded', 'false');
  };

  $('#menu-button').addEventListener('click', () => {
    if ($('#mobile-nav').hidden) openMobileNav();
    else closeMobileNav();
  });

  $('#menu-button').addEventListener('mouseenter', openMobileNav);

  $('#mobile-nav').addEventListener('mouseleave', closeMobileNav);

  $('#contenido').addEventListener('mouseenter', closeMobileNav);

  window.addEventListener('scroll', () => {
    if (!$('#mobile-nav').hidden) positionMobileNav();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!$('#mobile-nav').hidden) positionMobileNav();
  });

  $$('[data-event-scroll]').forEach((button) => button.addEventListener('click', () => {
    const track = document.getElementById(button.dataset.eventScroll);
    if (!track) return;
    const direction = Number(button.dataset.scrollDirection || 1);
    track.scrollBy({ left: direction * Math.min(track.clientWidth * .82, 720), behavior: 'smooth' });
  }));

  $('#competition-rail').addEventListener('click', (event) => {
    const button = event.target.closest('[data-competition]');
    if (!button) return;
    state.competition = button.dataset.competition;
    state.resultLeague = state.competition;
    state.resultClub = 'all';
    $('#competition-filter').value = state.competition;
    $$('.competition-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
    renderFootball();
  });

  $('#competition-filter').addEventListener('change', (event) => {
    state.competition = event.target.value;
    state.resultLeague = state.competition;
    state.resultClub = 'all';
    $$('.competition-chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.competition === state.competition));
    renderFootball();
  });
  $('#region-filter').addEventListener('change', (event) => {
    state.region = event.target.value;
    const selectedCompetition = competitionById(state.competition);
    if (selectedCompetition && state.region !== 'all' && selectedCompetition.region !== state.region) state.competition = 'all';
    const selectedResultLeague = competitionById(state.resultLeague);
    if (selectedResultLeague && state.region !== 'all' && selectedResultLeague.region !== state.region) state.resultLeague = 'all';
    state.resultClub = 'all';
    renderCompetitionControls();
    renderFootball();
  });
  $('#football-search').addEventListener('input', debounce((event) => {
    state.footballSearch = event.target.value.trim();
    renderFootball();
  }));
  $('#clear-football-filters').addEventListener('click', () => {
    state.competition = 'all'; state.region = 'all'; state.footballSearch = ''; state.resultLeague = 'all'; state.resultClub = 'all';
    $('#region-filter').value = 'all'; $('#football-search').value = '';
    renderCompetitionControls();
    renderFootball();
  });

  $('#result-league-filter').addEventListener('change', (event) => {
    state.resultLeague = event.target.value;
    state.resultClub = 'all';
    renderFootball();
  });

  $('#result-club-filter').addEventListener('change', (event) => {
    state.resultClub = event.target.value;
    renderFootball();
  });

  $('#football-standings').addEventListener('click', (event) => {
    const button = event.target.closest('[data-standing-competition]');
    if (!button) return;
    state.competition = button.dataset.standingCompetition;
    state.resultLeague = state.competition;
    state.resultClub = 'all';
    renderCompetitionControls();
    renderFootball();
  });

  $$('[data-football-tab]').forEach((button) => button.addEventListener('click', () => {
    $$('[data-football-tab]').forEach((item) => { item.classList.toggle('active', item === button); item.setAttribute('aria-selected', String(item === button)); });
    const targetId = `football-${button.dataset.footballTab}-panel`;
    $$('.tab-panel').forEach((panel) => { panel.hidden = panel.id !== targetId; });
    hydrateTeamLogos($(`#${targetId}`));
  }));

  bindSportTabs('f1');
  bindSportTabs('nba');

  const overlay = $('#search-overlay');
  const openSearch = () => {
    overlay.hidden = false;
    $('#mobile-nav').hidden = true;
    $('#menu-button').setAttribute('aria-expanded', 'false');
    $('#global-search').focus();
  };
  $('#open-search').addEventListener('click', openSearch);
  $('#open-menu-search').addEventListener('click', openSearch);
  $('.search-close').addEventListener('click', () => { overlay.hidden = true; });
  $('#global-search').addEventListener('input', debounce((event) => {
    const query = event.target.value.trim();
    const results = globalResults(query);
    $('#search-count').textContent = query.length < 2 ? 'Escribí al menos dos caracteres.' : `${results.length} resultado${results.length === 1 ? '' : 's'}`;
    $('#search-results').innerHTML = results.map((item) => `<a class="search-result" href="${item.url}" target="_blank" rel="noreferrer"><b>${item.title}</b><span>${item.detail} ↗</span></a>`).join('');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { overlay.hidden = true; if ($('#legal-dialog').open) $('#legal-dialog').close(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); overlay.hidden = false; $('#global-search').focus(); }
  });

  $$('[data-legal]').forEach((button) => button.addEventListener('click', () => {
    const copy = LEGAL_COPY[button.dataset.legal];
    $('#legal-content').innerHTML = `<p class="overline">INFORMACIÓN DEL PROTOTIPO</p><h2>${copy.title}</h2>${copy.body}`;
    $('#legal-dialog').showModal();
  }));
  $('.dialog-close').addEventListener('click', () => $('#legal-dialog').close());
  ['#reject-cookies', '#accept-cookies'].forEach((selector) => $(selector).addEventListener('click', () => { $('#cookie-banner').hidden = true; }));
}

function init() {
  renderHomeNews();
  bindEvents();
  const initialRoute = location.hash.replace('#', '');
  if ([...SPORT_ROUTES, 'admin'].includes(initialRoute)) setRoute(initialRoute);
}

init();
