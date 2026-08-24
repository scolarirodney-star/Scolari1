export const SPORTS = {
  football: {
    route: 'football',
    name: 'Fútbol',
    contentLabel: 'Fútbol',
    navIndex: '01',
    accent: '#2ee6a6',
    featuredKey: 'all',
    spotlightTarget: '#football-player-spotlight',
    profession: 'footballer',
    home: {
      label: 'FÚTBOL',
      button: 'Explorar fútbol',
      buttonClass: 'primary-action',
      entryClass: 'football-entry',
      title: 'Seis competiciones.<br>Una sola vista.',
      description: 'Noticias, tablas con identidad visual y resultados filtrables.',
    },
    media: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Well_lit_soccer_stadium_%28Unsplash%29.jpg',
      alt: 'Estadio de fútbol iluminado durante la noche',
      credit: 'Imagen ilustrativa · Mario Klassen · CC0',
      source: 'https://commons.wikimedia.org/wiki/File:Well_lit_soccer_stadium_(Unsplash).jpg',
    },
  },
  f1: {
    route: 'f1',
    name: 'Fórmula 1',
    contentLabel: 'Fórmula 1',
    navIndex: '02',
    accent: '#ff4036',
    featuredKey: 'formula1',
    spotlightTarget: '#f1-player-spotlight',
    profession: 'racing driver',
    home: {
      label: 'F1',
      button: 'Entrar a F1',
      buttonClass: 'secondary-action',
      entryClass: 'f1-entry',
      title: 'Cada vuelta.<br>Cada punto.',
      description: 'Resultado completo, pilotos, equipos y constructores.',
    },
    media: {
      url: 'https://images.pexels.com/photos/11211273/pexels-photo-11211273.jpeg?auto=compress&dpr=1&h=750&w=1260',
      alt: 'Monoplaza de competición en un circuito',
      credit: 'Imagen ilustrativa · PRAT clement · Pexels',
      source: 'https://www.pexels.com/photo/a-formula-1-car-on-a-race-track-11211273/',
    },
  },
  nba: {
    route: 'nba',
    name: 'NBA',
    contentLabel: 'Básquetbol',
    navIndex: '03',
    accent: '#17408b',
    featuredKey: 'nba',
    spotlightTarget: '#nba-player-spotlight',
    profession: 'basketball player',
    home: {
      label: 'NBA',
      button: 'Ver NBA',
      buttonClass: 'secondary-action nba-action',
      entryClass: 'nba-entry',
      title: 'Cada cancha.<br>Cada posesión.',
      description: 'Noticias, calendario, resultados, conferencias y los 30 equipos.',
    },
    media: {
      url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The-Yum-Center.jpg?width=1200',
      alt: 'Arena cubierta configurada para un partido de básquetbol',
      credit: 'Imagen ilustrativa · Acdixon · CC0',
      source: 'https://commons.wikimedia.org/wiki/File:The-Yum-Center.jpg',
    },
  },
};

export const SPORT_ROUTES = Object.keys(SPORTS);

export const FEATURED_PEOPLE = {
  champions: ['Kylian Mbappé', 'Lamine Yamal', 'Erling Haaland', 'Ousmane Dembélé', 'Jude Bellingham'],
  ligue1: ['Ousmane Dembélé', 'Khvicha Kvaratskhelia', 'Vitinha', 'João Neves', 'Achraf Hakimi'],
  laliga: ['Kylian Mbappé', 'Lamine Yamal', 'Vinícius Júnior', 'Jude Bellingham', 'Rodri'],
  premier: ['Erling Haaland', 'Bruno Fernandes', 'Gabriel Magalhães', 'João Pedro', 'Cole Palmer'],
  bundesliga: ['Harry Kane', 'Michael Olise', 'Luis Díaz', 'Joshua Kimmich', 'Jamal Musiala'],
  paraguay: ['Roque Santa Cruz', 'Derlis González', 'Óscar Cardozo', 'Lorenzo Melgarejo', 'Sebastián Ferreira'],
  formula1: ['George Russell', 'Kimi Antonelli', 'Lando Norris', 'Oscar Piastri', 'Max Verstappen'],
  nba: ['Shai Gilgeous-Alexander', 'Jalen Brunson', 'Victor Wembanyama', 'Luka Dončić', 'Nikola Jokić'],
};

export function sportConfig(route) {
  return SPORTS[route] || SPORTS.football;
}

export function sportName(route) {
  return sportConfig(route).name;
}
