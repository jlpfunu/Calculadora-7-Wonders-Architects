import React from "react";
import { Play, Users, Clock, ShoppingCart, ExternalLink, ArrowRight } from "lucide-react";
import { AMAZON_URL, OTHER_STORES, OFFICIAL_VIDEO_ID } from "./affiliateConfig.js";

const C = {
  pageBg: "#12141f",
  pageBgTop: "#20253a",
  card: "#1b1f2e",
  cardBorder: "#2f3548",
  text: "#e7e2d4",
  textDim: "#9a9484",
  textFaint: "#6b6a72",
  gold: "#e8b64a",
  goldBg: "#dba62f",
};

const FEATURES = [
  { icon: Users, label: "2 a 7 jugadores" },
  { icon: Clock, label: "~25 minutos de partida" },
  { icon: Play, label: "A partir de 8 años" },
];

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 20,
        fontWeight: 700,
        color: C.gold,
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  );
}

export default function Landing({ onStart }) {
  const stores = OTHER_STORES.filter((s) => s.url);

  return (
    <div style={{ color: C.text }}>
      {/* Hero */}
      <section className="text-center" style={{ padding: "24px 0 40px" }}>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 34,
            fontWeight: 800,
            color: C.gold,
            lineHeight: 1.15,
            letterSpacing: "0.01em",
          }}
        >
          7 Wonders: Architects
        </h1>
        <p style={{ color: C.textDim, fontSize: 15, maxWidth: 560, margin: "12px auto 0" }}>
          Construye una de las siete maravillas del mundo antiguo, gestiona tus recursos y
          supera a tus vecinos para pasar a la historia. El juego de mesa familiar más accesible
          del universo 7 Wonders.
        </p>

        <div className="flex items-center justify-center flex-wrap gap-4" style={{ marginTop: 20 }}>
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5" style={{ fontSize: 13, color: C.textDim }}>
              <Icon size={15} style={{ color: C.gold }} />
              {label}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onStart}
          className="flex items-center gap-2"
          style={{
            margin: "28px auto 0",
            backgroundColor: C.goldBg,
            color: "#171922",
            fontWeight: 700,
            fontSize: 15,
            padding: "12px 24px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
          }}
        >
          Ir a Calculadora <ArrowRight size={17} />
        </button>
      </section>

      {/* Vídeo oficial */}
      <section style={{ marginBottom: 40 }}>
        <SectionTitle>Cómo se juega (vídeo oficial)</SectionTitle>
        <p style={{ color: C.textFaint, fontSize: 13, marginBottom: 12 }}>
          Explicación oficial de las reglas por Repos Production, el estudio creador del juego.
        </p>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            borderRadius: 12,
            overflow: "hidden",
            border: `1px solid ${C.cardBorder}`,
            backgroundColor: C.card,
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${OFFICIAL_VIDEO_ID}`}
            title="7 Wonders Architects — cómo se juega"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Resumen de reglas */}
      <section style={{ marginBottom: 40 }}>
        <SectionTitle>En qué consiste</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              t: "Construye tu maravilla",
              d: "Cada jugador recibe una maravilla por etapas. Reúne los recursos necesarios para ir levantando cada etapa y suma los puntos que indique.",
            },
            {
              t: "Gestiona recursos",
              d: "Coge cartas de un tablero central compartido para conseguir materiales, monedas, ciencia o poder militar.",
            },
            {
              t: "Compite con tus vecinos",
              d: "El poder militar determina conflictos con los jugadores de al lado: quien tenga más escudos gana una ficha de victoria.",
            },
            {
              t: "Progresa con la ciencia",
              d: "Las fichas de progreso dan habilidades especiales durante la partida y, algunas, puntos extra al final.",
            },
          ].map((b) => (
            <div
              key={b.t}
              style={{
                backgroundColor: C.card,
                border: `1px solid ${C.cardBorder}`,
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{b.t}</div>
              <div style={{ fontSize: 13, color: C.textFaint, lineHeight: 1.4 }}>{b.d}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: C.textFaint, marginTop: 10 }}>
          La partida termina cuando alguien completa su maravilla o se agotan las cartas. Gana
          quien más puntos de victoria sume entre etapas construidas, cartas, conflictos militares
          y fichas de progreso.
        </p>
      </section>

      {/* Dónde comprarlo */}
      <section style={{ marginBottom: 24 }}>
        <SectionTitle>Dónde comprarlo</SectionTitle>
        <div className="flex flex-col gap-3" style={{ maxWidth: 420 }}>
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center justify-between gap-2"
            style={{
              backgroundColor: C.goldBg,
              color: "#171922",
              fontWeight: 700,
              fontSize: 14,
              padding: "12px 16px",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={16} /> Comprar en Amazon
            </span>
            <ExternalLink size={14} />
          </a>

          {stores.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-2"
              style={{
                backgroundColor: "transparent",
                border: `1px solid ${C.cardBorder}`,
                color: C.text,
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 16px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              <span>
                Comprar en {s.name}
                <span style={{ display: "block", fontSize: 11, color: C.textFaint, fontWeight: 400 }}>
                  {s.note}
                </span>
              </span>
              <ExternalLink size={14} />
            </a>
          ))}
        </div>

        <p style={{ fontSize: 11, color: C.textFaint, marginTop: 14, maxWidth: 480 }}>
          Como afiliado de Amazon, obtengo ingresos por compras adscritas que cumplen los
          requisitos aplicables. Esto no supone ningún coste adicional para ti.
        </p>
      </section>
    </div>
  );
}
