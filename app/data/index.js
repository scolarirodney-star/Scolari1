export {
  COMPETITIONS,
  FOOTBALL_RESULTS,
  FOOTBALL_UPCOMING,
  FOOTBALL_STANDINGS,
  FOOTBALL_ARTICLES,
} from './football.js';

export {
  F1_UPCOMING,
  F1_DRIVERS,
  F1_CONSTRUCTORS,
  F1_RACE_RESULTS,
  F1_PROFILES,
  F1_ARTICLES,
} from './formula1.js';

export {
  NBA_UPCOMING,
  NBA_RESULTS,
  NBA_STANDINGS,
  NBA_TEAMS,
  NBA_ARTICLES,
} from './nba.js';

import { NBA_ARTICLES } from './nba.js';
import { FOOTBALL_ARTICLES } from './football.js';
import { F1_ARTICLES } from './formula1.js';

// El orden se conserva idéntico al catálogo original: NBA, luego el bloque
// de Fútbol previo a los artículos de Fórmula 1, luego F1 y el resto de
// Fútbol. Ver docs/SPORTS_MODULES.md para el procedimiento de edición.
export const ARTICLES = [
  ...NBA_ARTICLES,
  ...FOOTBALL_ARTICLES.slice(0, 19),
  ...F1_ARTICLES,
  ...FOOTBALL_ARTICLES.slice(19),
];

export const EDITORIAL_STATUSES = ['Borrador', 'Pendiente de revisión', 'Publicada', 'Requiere actualización', 'Archivada'];

export const LEGAL_COPY = {
  legal: { title: 'Aviso legal', body: '<p>Este sitio es un prototipo no comercial. No representa ni está afiliado con las organizaciones enlazadas. Los nombres de competiciones se utilizan únicamente para identificar categorías informativas.</p><p>No se publican artículos completos, fotografías, videos, logotipos ni otros materiales protegidos de terceros.</p>' },
  privacy: { title: 'Política de privacidad', body: '<p>El prototipo no registra cuentas ni recopila datos personales. Una versión pública deberá detallar responsable, finalidad, base jurídica, conservación, destinatarios y derechos del usuario.</p>' },
  cookies: { title: 'Política de cookies', body: '<p>Esta demostración solo utiliza estado temporal en la página. No instala cookies analíticas o publicitarias. Cualquier incorporación futura requerirá consentimiento y un inventario actualizado.</p>' },
  takedown: { title: 'Solicitud de retirada', body: '<p>Una versión publicada deberá ofrecer un canal visible para informar enlaces rotos, errores, material sin permiso o solicitudes de retirada.</p><ol><li>Identificar el contenido y su URL.</li><li>Explicar el motivo de la solicitud.</li><li>Aportar un medio de contacto y, si corresponde, prueba de titularidad.</li><li>Registrar la revisión y la resolución editorial.</li></ol>' },
};
