/**
 * Esquema relacional propuesto para Cloudflare D1.
 * Cada cadena contiene una sola sentencia para ejecutarla con DB.prepare().
 */
export const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS sports (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
  )`,
  `CREATE TABLE IF NOT EXISTS competitions (
    id TEXT PRIMARY KEY,
    sport_id TEXT NOT NULL REFERENCES sports(id),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    region TEXT,
    official_url TEXT,
    locale TEXT NOT NULL DEFAULT 'es-PY',
    active INTEGER NOT NULL DEFAULT 1
  )`,
  `CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    base_url TEXT NOT NULL UNIQUE,
    source_type TEXT NOT NULL,
    trusted INTEGER NOT NULL DEFAULT 0,
    license_notes TEXT,
    last_checked_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    sport_id TEXT NOT NULL REFERENCES sports(id),
    competition_id TEXT REFERENCES competitions(id),
    source_id TEXT NOT NULL REFERENCES sources(id),
    locale TEXT NOT NULL DEFAULT 'es-PY',
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    source_url TEXT NOT NULL,
    source_fingerprint TEXT NOT NULL,
    published_at TEXT,
    reviewed_at TEXT,
    editorial_status TEXT NOT NULL,
    rights_status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_source_fingerprint
    ON articles(source_fingerprint)`,
  `CREATE INDEX IF NOT EXISTS idx_articles_status_published
    ON articles(editorial_status, published_at)`,
  `CREATE INDEX IF NOT EXISTS idx_articles_competition_locale
    ON articles(competition_id, locale)`,
  `CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    competition_id TEXT REFERENCES competitions(id),
    name TEXT NOT NULL,
    short_name TEXT,
    external_id TEXT,
    locale TEXT NOT NULL DEFAULT 'es-PY'
  )`,
  `CREATE TABLE IF NOT EXISTS people (
    id TEXT PRIMARY KEY,
    sport_id TEXT NOT NULL REFERENCES sports(id),
    name TEXT NOT NULL,
    code TEXT,
    nationality TEXT,
    external_id TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    competition_id TEXT NOT NULL REFERENCES competitions(id),
    season TEXT NOT NULL,
    starts_at TEXT,
    status TEXT NOT NULL,
    home_team_id TEXT REFERENCES teams(id),
    away_team_id TEXT REFERENCES teams(id),
    home_score INTEGER,
    away_score INTEGER,
    source_id TEXT NOT NULL REFERENCES sources(id),
    external_id TEXT,
    verified_at TEXT,
    updated_at TEXT NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_events_source_external
    ON events(source_id, external_id)`,
  `CREATE INDEX IF NOT EXISTS idx_events_competition_start
    ON events(competition_id, starts_at)`,
  `CREATE TABLE IF NOT EXISTS standings (
    id TEXT PRIMARY KEY,
    competition_id TEXT NOT NULL REFERENCES competitions(id),
    season TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    position INTEGER NOT NULL,
    points REAL NOT NULL,
    source_id TEXT NOT NULL REFERENCES sources(id),
    verified_at TEXT,
    UNIQUE(competition_id, season, entity_type, entity_id)
  )`,
  `CREATE TABLE IF NOT EXISTS editorial_checks (
    id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL REFERENCES articles(id),
    check_key TEXT NOT NULL,
    passed INTEGER NOT NULL DEFAULT 0,
    checked_by TEXT,
    checked_at TEXT,
    UNIQUE(article_id, check_key)
  )`,
  `CREATE TABLE IF NOT EXISTS change_log (
    id TEXT PRIMARY KEY,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL,
    previous_value TEXT,
    next_value TEXT,
    actor TEXT,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_change_log_entity
    ON change_log(entity_type, entity_id, created_at)`,
];
