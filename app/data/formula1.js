export const F1_UPCOMING = [
  { round: 13, country: 'Italia', race: "Gran Premio de Italia", circuit: 'Monza', dates: '4–6 sep 2026', source: 'Formula1.com', url: 'https://www.formula1.com/en/racing/2026' },
  { round: 14, country: 'España', race: 'Gran Premio de España', circuit: 'Madring', dates: '11–13 sep 2026', source: 'Formula1.com', url: 'https://www.formula1.com/en/racing/2026' },
  { round: 15, country: 'Azerbaiyán', race: 'Gran Premio de Azerbaiyán', circuit: 'Bakú', dates: '24–26 sep 2026', source: 'Formula1.com', url: 'https://www.formula1.com/en/racing/2026' },
];

// Instantaneas revisadas manualmente para el prototipo. No representan una
// conexion en tiempo real: cada bloque conserva su fuente y hora de revision.

export const F1_DRIVERS = [
  { rank: 1, name: 'Kimi Antonelli', code: 'ANT', team: 'Mercedes', points: 242 },
  { rank: 2, name: 'George Russell', code: 'RUS', team: 'Mercedes', points: 183 },
  { rank: 3, name: 'Lewis Hamilton', code: 'HAM', team: 'Ferrari', points: 183 },
  { rank: 4, name: 'Lando Norris', code: 'NOR', team: 'McLaren', points: 159 },
  { rank: 5, name: 'Charles Leclerc', code: 'LEC', team: 'Ferrari', points: 155 },
  { rank: 6, name: 'Max Verstappen', code: 'VER', team: 'Red Bull Racing', points: 112 },
  { rank: 7, name: 'Oscar Piastri', code: 'PIA', team: 'McLaren', points: 104 },
  { rank: 8, name: 'Isack Hadjar', code: 'HAD', team: 'Red Bull Racing', points: 68 },
  { rank: 9, name: 'Liam Lawson', code: 'LAW', team: 'Red Bull Racing', points: 49 },
  { rank: 10, name: 'Pierre Gasly', code: 'GAS', team: 'Alpine', points: 44 },
  { rank: 11, name: 'Arvid Lindblad', code: 'LIN', team: 'Racing Bulls', points: 23 },
  { rank: 12, name: 'Franco Colapinto', code: 'COL', team: 'Alpine', points: 19 },
  { rank: 13, name: 'Oliver Bearman', code: 'BEA', team: 'Haas F1 Team', points: 18 },
  { rank: 14, name: 'Gabriel Bortoleto', code: 'BOR', team: 'Audi', points: 10 },
  { rank: 15, name: 'Nico Hulkenberg', code: 'HUL', team: 'Audi', points: 6 },
  { rank: 16, name: 'Carlos Sainz', code: 'SAI', team: 'Williams', points: 6 },
  { rank: 17, name: 'Alexander Albon', code: 'ALB', team: 'Williams', points: 5 },
  { rank: 18, name: 'Esteban Ocon', code: 'OCO', team: 'Haas F1 Team', points: 3 },
  { rank: 19, name: 'Fernando Alonso', code: 'ALO', team: 'Aston Martin', points: 3 },
  { rank: 20, name: 'Yuki Tsunoda', code: 'TSU', team: 'Racing Bulls', points: 0 },
  { rank: 21, name: 'Lance Stroll', code: 'STR', team: 'Aston Martin', points: 0 },
  { rank: 22, name: 'Valtteri Bottas', code: 'BOT', team: 'Cadillac', points: 0 },
  { rank: 23, name: 'Sergio Perez', code: 'PER', team: 'Cadillac', points: 0 },
];

export const F1_CONSTRUCTORS = [
  { rank: 1, name: 'Mercedes', points: 425 },
  { rank: 2, name: 'Ferrari', points: 338 },
  { rank: 3, name: 'McLaren', points: 263 },
  { rank: 4, name: 'Red Bull Racing', points: 186 },
  { rank: 5, name: 'Racing Bulls', points: 66 },
  { rank: 6, name: 'Alpine', points: 63 },
  { rank: 7, name: 'Haas F1 Team', points: 21 },
  { rank: 8, name: 'Audi', points: 16 },
  { rank: 9, name: 'Williams', points: 11 },
  { rank: 10, name: 'Aston Martin', points: 3 },
  { rank: 11, name: 'Cadillac', points: 0 },
];

export const F1_RACE_RESULTS = {
  race: 'Gran Premio de Países Bajos', date: '23 ago 2026', updated: '24 ago 2026 · 16:10',
  source: 'Formula1.com', url: 'https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result',
  rows: [
    { pos: '1', driver: 'Lando Norris', code: 'NOR', team: 'McLaren', laps: 72, result: '2:04:44.859', points: 25 },
    { pos: '2', driver: 'Kimi Antonelli', code: 'ANT', team: 'Mercedes', laps: 72, result: '+11.536s', points: 18 },
    { pos: '3', driver: 'George Russell', code: 'RUS', team: 'Mercedes', laps: 72, result: '+15.906s', points: 15 },
    { pos: '4', driver: 'Lewis Hamilton', code: 'HAM', team: 'Ferrari', laps: 72, result: '+16.755s', points: 12 },
    { pos: '5', driver: 'Charles Leclerc', code: 'LEC', team: 'Ferrari', laps: 72, result: '+17.258s', points: 10 },
    { pos: '6', driver: 'Oscar Piastri', code: 'PIA', team: 'McLaren', laps: 72, result: '+32.332s', points: 8 },
    { pos: '7', driver: 'Liam Lawson', code: 'LAW', team: 'Red Bull Racing', laps: 72, result: '+79.915s', points: 6 },
    { pos: '8', driver: 'Nico Hulkenberg', code: 'HUL', team: 'Audi', laps: 71, result: '+1 vuelta', points: 4 },
    { pos: '9', driver: 'Fernando Alonso', code: 'ALO', team: 'Aston Martin', laps: 71, result: '+1 vuelta', points: 2 },
    { pos: '10', driver: 'Pierre Gasly', code: 'GAS', team: 'Alpine', laps: 71, result: '+1 vuelta', points: 1 },
    { pos: '11', driver: 'Yuki Tsunoda', code: 'TSU', team: 'Racing Bulls', laps: 71, result: '+1 vuelta', points: 0 },
    { pos: '12', driver: 'Arvid Lindblad', code: 'LIN', team: 'Racing Bulls', laps: 71, result: '+1 vuelta', points: 0 },
    { pos: '13', driver: 'Gabriel Bortoleto', code: 'BOR', team: 'Audi', laps: 71, result: '+1 vuelta', points: 0 },
    { pos: '14', driver: 'Franco Colapinto', code: 'COL', team: 'Alpine', laps: 70, result: '+2 vueltas', points: 0 },
    { pos: '15', driver: 'Sergio Perez', code: 'PER', team: 'Cadillac', laps: 70, result: '+2 vueltas', points: 0 },
    { pos: '16', driver: 'Carlos Sainz', code: 'SAI', team: 'Williams', laps: 70, result: '+2 vueltas', points: 0 },
    { pos: '17', driver: 'Alexander Albon', code: 'ALB', team: 'Williams', laps: 66, result: 'DNF', points: 0 },
    { pos: 'NC', driver: 'Valtteri Bottas', code: 'BOT', team: 'Cadillac', laps: 61, result: 'DNF', points: 0 },
    { pos: 'NC', driver: 'Esteban Ocon', code: 'OCO', team: 'Haas F1 Team', laps: 52, result: 'DNF', points: 0 },
    { pos: 'NC', driver: 'Lance Stroll', code: 'STR', team: 'Aston Martin', laps: 45, result: 'DNF', points: 0 },
    { pos: 'NC', driver: 'Oliver Bearman', code: 'BEA', team: 'Haas F1 Team', laps: 2, result: 'DNF', points: 0 },
    { pos: 'NC', driver: 'Max Verstappen', code: 'VER', team: 'Red Bull Racing', laps: 0, result: 'DNF', points: 0 },
  ],
};

export const F1_PROFILES = [
  { code: 'MER', team: 'Mercedes', drivers: 'Kimi Antonelli · George Russell' },
  { code: 'FER', team: 'Ferrari', drivers: 'Lewis Hamilton · Charles Leclerc' },
  { code: 'MCL', team: 'McLaren', drivers: 'Lando Norris · Plantel completo en la fuente' },
  { code: 'RBR', team: 'Red Bull Racing', drivers: 'Max Verstappen · Plantel completo en la fuente' },
];

export const F1_ARTICLES = [
  {
    id: 'f1-zandvoort-analysis', sport: 'f1', competition: 'formula1', visual: 'F1',
    title: 'Zandvoort deja ganadores, perdedores y nuevas preguntas',
    summary: 'El sitio oficial de Fórmula 1 repasa los protagonistas del Gran Premio de Países Bajos. La nota completa permanece disponible en la fuente.',
    published: 'Fecha no visible en portada', publishedISO: '2026-08-24', source: 'Formula1.com',
    url: 'https://www.formula1.com/', reviewed: '24 ago 2026 · 14:20',
    videoUrl: 'https://www.youtube.com/@Formula1',
    status: 'Pendiente de revisión', rights: 'Texto propio · Imagen ilustrativa con licencia · Canal oficial enlazado',
  },
  {
    id: 'f1-norris-conditions', sport: 'f1', competition: 'formula1', visual: 'F1',
    title: 'Las condiciones cambiantes que exigieron lo mejor de Norris',
    summary: 'Una revisión editorial de la explicación publicada por Formula1.com sobre las dificultades estratégicas y deportivas de la carrera neerlandesa.',
    published: 'Fecha no visible en portada', publishedISO: '2026-08-24', source: 'Formula1.com',
    url: 'https://www.formula1.com/', reviewed: '24 ago 2026 · 14:20',
    status: 'Borrador', rights: 'Texto propio · Sin imagen',
  },
  {
    id: 'f1-norris-mclaren-2030', sport: 'f1', competition: 'formula1', visual: 'F1',
    title: 'Norris renueva con McLaren hasta el final de 2030',
    summary: 'El campeón 2025 extendió su vínculo con el equipo, que antes vencía en 2027. El acuerdo alinea su continuidad con la de su compañero Oscar Piastri. Los detalles completos del anuncio están en la fuente oficial.',
    published: '29 ago 2026', publishedISO: '2026-08-29', source: 'Formula1.com',
    url: 'https://www.formula1.com/en/latest/article/lando-norris-commits-future-to-mclaren-as-he-signs-new-deal-until-the-end-of-2030.7ErHTktjoW2mAo5zEEtuA0', reviewed: '29 ago 2026 · 13:47',
    status: 'Pendiente de revisión', rights: 'Resumen propio · Sin imagen',
  },
  {
    id: 'f1-italy-monza-schedule', sport: 'f1', competition: 'formula1', visual: 'F1',
    title: 'Confirmado el cronograma del Gran Premio de Italia en Monza',
    summary: 'Formula1.com publicó los horarios completos del fin de semana del 4 al 6 de septiembre: prácticas, clasificación y una carrera pautada a 53 vueltas o 120 minutos. La grilla horaria detallada permanece en la fuente.',
    published: 'Fecha no visible en portada', publishedISO: '2026-08-29', source: 'Formula1.com',
    url: 'https://www.formula1.com/en/latest/article/formula-1-pirelli-gran-premio-ditalia-2026.7zaXkRgenHXVVXXGb1RGcf', reviewed: '29 ago 2026 · 13:47',
    status: 'Pendiente de revisión', rights: 'Resumen propio · Sin imagen',
  },
];
