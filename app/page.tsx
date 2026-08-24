import { SPORTS } from './config/sports.js';
import { SiteInitializer } from './client/initializer';
import { HOME_VIEW } from './views/home';
import { FOOTBALL_VIEW } from './views/football';
import { FORMULA1_VIEW } from './views/formula1';
import { NBA_VIEW } from './views/nba';

const sports = Object.values(SPORTS);
const primarySportNav = sports.map((sport) => `<button class="nav-button ${sport.route}" data-route="${sport.route}" aria-pressed="false"><span>${sport.navIndex}</span> ${sport.name}</button>`).join('');
const mobileSportNav = sports.map((sport) => `<button data-route="${sport.route}">${sport.name}</button>`).join('');

const PROTOTYPE_HTML = String.raw`
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <div class="prototype-bar"><span><i></i> BETA PÚBLICA</span><p>Noticias resumidas · Datos con fuente y revisión editorial</p><time datetime="2026-08-24">Revisión: 24 AGO 2026</time></div>
  <header class="site-header">
    <a class="brand" href="#inicio" data-route="home" aria-label="ScolariX, portada"><span class="brand-icon">SX</span><span><b>SCOLARIX</b><small>SPORTS INTELLIGENCE</small></span></a>
    <nav class="primary-nav" aria-label="Navegación principal"><button class="nav-button active" data-route="home" aria-pressed="true"><span>00</span> Portada</button>${primarySportNav}</nav>
    <div class="header-actions"><button class="icon-button" id="open-search" aria-label="Abrir buscador">⌕</button><button class="menu-button" id="menu-button" aria-label="Abrir menú" aria-expanded="false">Menú</button></div>
  </header>
  <div class="mobile-nav" id="mobile-nav" hidden><button data-route="home">Portada</button>${mobileSportNav}</div>
  <main id="contenido" tabindex="-1">
    ${HOME_VIEW}
    ${FOOTBALL_VIEW}
    ${FORMULA1_VIEW}
    ${NBA_VIEW}
  </main>
  <footer><div class="footer-top"><a class="brand" href="#inicio" data-route="home"><span class="brand-icon">SX</span><span><b>SCOLARIX</b><small>SPORTS INTELLIGENCE</small></span></a><p>Información deportiva resumida, trazable y conectada con su fuente original.</p><div class="footer-status"><i></i> BETA PÚBLICA</div></div><div class="footer-bottom"><span>© 2026 SCOLARIX</span><nav aria-label="Información legal"><button data-legal="legal">Aviso legal</button><button data-legal="privacy">Privacidad</button><button data-legal="cookies">Cookies</button><button data-legal="takedown">Solicitar retirada</button></nav><span>ES · PY</span></div></footer>
  <dialog id="legal-dialog"><button class="dialog-close" aria-label="Cerrar">×</button><div id="legal-content"></div></dialog>
  <div class="search-overlay" id="search-overlay" hidden><button class="search-close" aria-label="Cerrar buscador">×</button><div><p class="overline">BUSCADOR GLOBAL</p><label for="global-search">¿Qué querés encontrar?</label><input id="global-search" type="search" placeholder="Noticias, competiciones, pilotos…" autocomplete="off"><p id="search-count">Escribí al menos dos caracteres.</p><div id="search-results"></div></div></div>
  <div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Preferencias de cookies"><div><b>Cookies en esta beta</b><p>Solo usamos funcionamiento esencial. Las preferencias no se guardan fuera de esta sesión.</p></div><button id="reject-cookies">Solo esenciales</button><button class="accept" id="accept-cookies">Aceptar</button></div>
`;

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: PROTOTYPE_HTML }} />
      <SiteInitializer />
    </>
  );
}
