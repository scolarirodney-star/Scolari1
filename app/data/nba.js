export const NBA_UPCOMING = [
  { date: '20 oct 2026', time: '15:00', zone: 'ET', away: 'Boston Celtics', home: 'Detroit Pistons', phase: 'Opening Night', source: 'NBA.com', url: 'https://www.nba.com/news/2026-27-schedule-announced' },
  { date: '20 oct 2026', time: '19:00', zone: 'ET', away: 'Philadelphia 76ers', home: 'New York Knicks', phase: 'Opening Night', source: 'NBA.com', url: 'https://www.nba.com/news/2026-27-schedule-announced' },
  { date: '20 oct 2026', time: '21:30', zone: 'ET', away: 'Oklahoma City Thunder', home: 'San Antonio Spurs', phase: 'Opening Night', source: 'NBA.com', url: 'https://www.nba.com/news/2026-27-schedule-announced' },
];

export const NBA_RESULTS = [
  { game: 1, away: 'San Antonio Spurs', awayScore: 95, home: 'New York Knicks', homeScore: 105 },
  { game: 2, away: 'San Antonio Spurs', awayScore: 104, home: 'New York Knicks', homeScore: 105 },
  { game: 3, away: 'New York Knicks', awayScore: 111, home: 'San Antonio Spurs', homeScore: 115 },
  { game: 4, away: 'New York Knicks', awayScore: 107, home: 'San Antonio Spurs', homeScore: 106 },
  { game: 5, away: 'New York Knicks', awayScore: 94, home: 'San Antonio Spurs', homeScore: 90 },
];

export const NBA_STANDINGS = {
  east: [
    { pos: 1, team: 'Detroit Pistons', wins: 60, losses: 22, pct: '.732', gb: '—' },
    { pos: 2, team: 'Boston Celtics', wins: 56, losses: 26, pct: '.683', gb: '4' },
    { pos: 3, team: 'New York Knicks', wins: 53, losses: 29, pct: '.646', gb: '7' },
    { pos: 4, team: 'Cleveland Cavaliers', wins: 52, losses: 30, pct: '.634', gb: '8' },
    { pos: 5, team: 'Toronto Raptors', wins: 46, losses: 36, pct: '.561', gb: '14' },
    { pos: 6, team: 'Atlanta Hawks', wins: 46, losses: 36, pct: '.561', gb: '14' },
    { pos: 7, team: 'Philadelphia 76ers', wins: 45, losses: 37, pct: '.549', gb: '15' },
    { pos: 8, team: 'Orlando Magic', wins: 45, losses: 37, pct: '.549', gb: '15' },
  ],
  west: [
    { pos: 1, team: 'Oklahoma City Thunder', wins: 64, losses: 18, pct: '.780', gb: '—' },
    { pos: 2, team: 'San Antonio Spurs', wins: 62, losses: 20, pct: '.756', gb: '2' },
    { pos: 3, team: 'Denver Nuggets', wins: 54, losses: 28, pct: '.659', gb: '10' },
    { pos: 4, team: 'Los Angeles Lakers', wins: 53, losses: 29, pct: '.646', gb: '11' },
    { pos: 5, team: 'Houston Rockets', wins: 52, losses: 30, pct: '.634', gb: '12' },
    { pos: 6, team: 'Minnesota Timberwolves', wins: 49, losses: 33, pct: '.598', gb: '15' },
    { pos: 7, team: 'Phoenix Suns', wins: 45, losses: 37, pct: '.549', gb: '19' },
    { pos: 8, team: 'Portland Trail Blazers', wins: 42, losses: 40, pct: '.512', gb: '22' },
  ],
};

export const NBA_TEAMS = [
  ['Atlanta Hawks', 'Este'], ['Boston Celtics', 'Este'], ['Brooklyn Nets', 'Este'], ['Charlotte Hornets', 'Este'], ['Chicago Bulls', 'Este'],
  ['Cleveland Cavaliers', 'Este'], ['Detroit Pistons', 'Este'], ['Indiana Pacers', 'Este'], ['Miami Heat', 'Este'], ['Milwaukee Bucks', 'Este'],
  ['New York Knicks', 'Este'], ['Orlando Magic', 'Este'], ['Philadelphia 76ers', 'Este'], ['Toronto Raptors', 'Este'], ['Washington Wizards', 'Este'],
  ['Dallas Mavericks', 'Oeste'], ['Denver Nuggets', 'Oeste'], ['Golden State Warriors', 'Oeste'], ['Houston Rockets', 'Oeste'], ['LA Clippers', 'Oeste'],
  ['Los Angeles Lakers', 'Oeste'], ['Memphis Grizzlies', 'Oeste'], ['Minnesota Timberwolves', 'Oeste'], ['New Orleans Pelicans', 'Oeste'], ['Oklahoma City Thunder', 'Oeste'],
  ['Phoenix Suns', 'Oeste'], ['Portland Trail Blazers', 'Oeste'], ['Sacramento Kings', 'Oeste'], ['San Antonio Spurs', 'Oeste'], ['Utah Jazz', 'Oeste'],
].map(([name, conference]) => ({ name, conference }));

export const NBA_ARTICLES = [
  {
    id: 'nba-schedule-2026-27', sport: 'nba', visual: 'NBA',
    title: 'La NBA publicó el calendario completo de la temporada 2026/27',
    summary: 'La liga confirmó el inicio para el 20 de octubre y presentó el recorrido de la fase regular. Este resumen conserva el acceso a la programación oficial por fecha y por equipo.',
    published: '13 ago 2026', publishedISO: '2026-08-13', source: 'NBA.com',
    url: 'https://www.nba.com/news/2026-27-nba-regular-season-schedule', reviewed: '24 ago 2026 · 17:30',
    status: 'Publicada', rights: 'Resumen propio · Imagen ilustrativa CC0',
  },
  {
    id: 'nba-key-dates-2026-27', sport: 'nba', visual: '26/27',
    title: 'Las fechas clave ordenan el camino hacia la nueva temporada',
    summary: 'La agenda oficial reúne pretemporada, fase regular, NBA Cup y eventos internacionales. Los horarios definitivos deben confirmarse siempre en el calendario de NBA.com.',
    published: '22 jul 2026', publishedISO: '2026-07-22', source: 'NBA.com',
    url: 'https://www.nba.com/news/key-dates', reviewed: '24 ago 2026 · 17:30',
    status: 'Publicada', rights: 'Resumen propio · Imagen ilustrativa CC0',
  },
  {
    id: 'nba-season-review-2025-26', sport: 'nba', visual: 'RECAP',
    title: 'La temporada 2025/26 cerró con Nueva York en lo más alto',
    summary: 'El repaso oficial reúne al campeón, los líderes estadísticos, los premios y cada serie de playoffs. La publicación completa permanece disponible en la fuente original.',
    published: '29 jun 2026', publishedISO: '2026-06-29', source: 'NBA.com',
    url: 'https://www.nba.com/news/season-review-2025-26', reviewed: '24 ago 2026 · 17:30',
    status: 'Publicada', rights: 'Resumen propio · Imagen ilustrativa CC0',
  },
  {
    id: 'nba-knicks-champions-2026', sport: 'nba', visual: 'FINALS',
    title: 'Los Knicks conquistaron el título tras imponerse 4-1 en las Finales',
    summary: 'Nueva York cerró la serie ante San Antonio en cinco partidos. El marcador de cada encuentro y la crónica del juego decisivo pueden consultarse en NBA.com.',
    published: '14 jun 2026', publishedISO: '2026-06-14', source: 'NBA.com',
    url: 'https://www.nba.com/news/knicks-rally-win-nba-title', reviewed: '24 ago 2026 · 17:30',
    status: 'Publicada', rights: 'Resumen propio · Imagen ilustrativa CC0',
  },
];
