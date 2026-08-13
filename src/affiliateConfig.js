// ─────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE ENLACES DE AFILIADOS
// ─────────────────────────────────────────────────────────────
// Sustituye los valores de abajo por tus propios enlaces de afiliado
// una vez te hayas dado de alta en cada programa. No hace falta tocar
// nada más del código: estos valores se usan automáticamente en la
// landing page.
//
// 1) AMAZON — Amazon Afiliados / Amazon Associates
//    Regístrate en https://afiliados.amazon.es
//    Una vez aprobado, te dan un "ID de seguimiento" (tag), tipo "tublog-21".
//    Sustituye AMAZON_TAG por el tuyo. El enlace de abajo es una búsqueda
//    del juego en Amazon.es, que es más seguro que enlazar a un ASIN
//    concreto (el ASIN puede cambiar de edición o quedarse sin stock).
const AMAZON_TAG = "juegaresdiver-21"; // ⚠️ sustituye esto por tu tag real

export const AMAZON_URL = `https://www.amazon.es/s?k=7+Wonders+Architects&tag=${AMAZON_TAG}`;

// 2) OTRAS TIENDAS — ideas de programas de afiliados adicionales,
//    útiles sobre todo para audiencia española/europea:
//
//    · Zacatrus (tienda española especializada en juegos de mesa)
//      Programa de afiliados vía red Awin: https://www.zacatrus.es (buscar "afiliados" en el footer)
//    · Philibert (gran tienda francesa que envía a España, muy usada por reseñadores)
//      Programa propio de afiliados: https://www.philibertnet.com
//    · GameOn / La Cuarta Pared / Ludonauta — tiendas españolas más pequeñas,
//      algunas ofrecen acuerdos de afiliación directos si las contactas.
//
//    Añade aquí cada una según vayas dándote de alta. Dejo la estructura
//    lista para que solo tengas que rellenar "url".
export const OTHER_STORES = [
  {
    name: "Zacatrus",
    url: "", // pega aquí tu enlace de afiliado de Zacatrus cuando lo tengas
    note: "Tienda española especializada en juegos de mesa",
  },
  {
    name: "Philibert",
    url: "", // pega aquí tu enlace de afiliado de Philibert cuando lo tengas
    note: "Gran catálogo, envíos a toda Europa",
  },
];

// Vídeo oficial de reglas, publicado por Repos Production (el estudio
// creador del juego) en su propia web: https://www.rprod.com/en/7-wonders-architects/video
export const OFFICIAL_VIDEO_ID = "SJvGd1MCMNE";
