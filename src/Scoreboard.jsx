import React, { useState, useMemo } from "react";
import { Crown, Shield, Sparkles, Trophy, Plus, Minus, RotateCcw, Landmark } from "lucide-react";

const WONDERS = ["Alejandría", "Éfeso", "Olimpia", "Rodas", "Halicarnaso", "Babilonia", "Guiza"];

// Paleta de color central — todo lo que necesita un tono exacto pasa por aquí,
// como estilo en línea, para que siempre se aplique sin depender de un compilador.
const C = {
  pageBg: "#12141f",
  pageBgTop: "#20253a",
  card: "#1b1f2e",
  cardBorder: "#2f3548",
  well: "#12151f",
  wellBorder: "#3a4058",
  track: "#2a2f42",
  knob: "#0b0d16",
  text: "#e7e2d4",
  textDim: "#9a9484",
  textFaint: "#6b6a72",
  gold: "#e8b64a",
  goldDim: "#c99a3a",
  goldBg: "#dba62f",
};

function emptyPlayer(i) {
  return {
    id: i,
    name: `Jugador ${i + 1}`,
    wonder: WONDERS[i % WONDERS.length],
    stagesBuilt: 0,
    stagesVP: 0,
    blueVP: 0,
    hasCat: false,
    militaryTokens: 0,
    progressTotal: 0,
    hasDecor: false,
    wonderComplete: false,
    hasPolitics: false,
    catIcons: 0,
    hasStrategy: false,
    hasEducation: false,
    hasCulture: false,
    cultureCount: 0,
  };
}

function computeTotal(p) {
  const cat = p.hasCat ? 2 : 0;
  const military = p.militaryTokens * 3;
  const decor = p.hasDecor ? (p.wonderComplete ? 6 : 4) : 0;
  const politics = p.hasPolitics ? p.catIcons : 0;
  const strategy = p.hasStrategy ? p.militaryTokens : 0;
  const education = p.hasEducation ? p.progressTotal * 2 : 0;
  const culture = p.hasCulture ? (p.cultureCount >= 2 ? 12 : p.cultureCount === 1 ? 4 : 0) : 0;
  return {
    total: p.stagesVP + p.blueVP + cat + military + decor + politics + strategy + education + culture,
    breakdown: [
      { label: "Etapas", value: p.stagesVP },
      { label: "Cartas azules", value: p.blueVP },
      { label: "Gato", value: cat },
      { label: "Militar", value: military },
      { label: "Decor", value: decor },
      { label: "Política", value: politics },
      { label: "Estrategia", value: strategy },
      { label: "Educación", value: education },
      { label: "Cultura", value: culture },
    ].filter((b) => b.value !== 0),
  };
}

/** Interruptor on/off construido solo con estilos en línea, sin depender de clases arbitrarias. */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      aria-label={label}
      style={{
        position: "relative",
        width: 38,
        height: 22,
        borderRadius: 999,
        border: "none",
        padding: 0,
        cursor: "pointer",
        flexShrink: 0,
        backgroundColor: checked ? C.goldBg : C.track,
        transition: "background-color 0.15s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: C.knob,
          transition: "left 0.15s ease",
        }}
      />
    </button>
  );
}

function NumberField({ label, value, onChange, min = 0, max = 99, icon }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <span className="flex items-center gap-1.5 text-sm" style={{ color: C.textDim }}>
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Restar ${label}`}
          style={{
            width: 24,
            height: 24,
            borderRadius: 999,
            backgroundColor: C.track,
            color: C.gold,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Minus size={12} />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange(Number.isNaN(v) ? 0 : Math.min(max, Math.max(min, v)));
          }}
          style={{
            width: 44,
            textAlign: "center",
            backgroundColor: C.well,
            border: `1px solid ${C.wellBorder}`,
            borderRadius: 8,
            padding: "3px 0",
            color: C.gold,
            fontSize: 14,
            fontWeight: 700,
          }}
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Sumar ${label}`}
          style={{
            width: 24,
            height: 24,
            borderRadius: 999,
            backgroundColor: C.track,
            color: C.gold,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange, children, isFirst }) {
  return (
    <div
      style={{
        borderTop: isFirst ? "none" : `1px solid ${C.cardBorder}`,
        paddingTop: isFirst ? 0 : 6,
        marginTop: isFirst ? 0 : 6,
      }}
    >
      <div className="flex items-center justify-between py-0.5">
        <span className="text-sm font-medium" style={{ color: C.text }}>
          {label}
        </span>
        <Toggle checked={checked} onChange={onChange} label={label} />
      </div>
      {checked && children && <div style={{ paddingLeft: 4, paddingBottom: 4 }}>{children}</div>}
    </div>
  );
}

function PlayerCard({ player, onChange, onRemove, canRemove, rank }) {
  const { total, breakdown } = computeTotal(player);
  const set = (field) => (val) => onChange({ ...player, [field]: val });

  const borderColor = rank === 1 ? C.gold : rank === 2 ? "#a8a29e" : rank === 3 ? "#b45309" : C.cardBorder;
  const borderWidth = rank && rank <= 3 && total > 0 ? 2 : 1;

  return (
    <div
      className="relative flex flex-col p-4 rounded-xl"
      style={{
        backgroundColor: C.card,
        border: `${borderWidth}px solid ${borderColor}`,
      }}
    >
      {rank === 1 && total > 0 && (
        <div
          className="absolute flex items-center gap-1 font-bold rounded-full"
          style={{
            top: -12,
            left: 16,
            backgroundColor: C.goldBg,
            color: "#171922",
            fontSize: 10,
            padding: "2px 8px",
            letterSpacing: "0.04em",
          }}
        >
          <Crown size={11} /> LÍDER
        </div>
      )}
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Eliminar jugador"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            color: C.textFaint,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      )}

      <div className="flex items-start justify-between gap-2 mb-2 pr-4">
        <div className="flex-1 min-w-0">
          <input
            value={player.name}
            onChange={(e) => set("name")(e.target.value)}
            style={{
              backgroundColor: "transparent",
              color: C.gold,
              fontWeight: 700,
              fontSize: 16,
              width: "100%",
              outline: "none",
              border: "none",
              borderBottom: "1px solid transparent",
              fontFamily: "'Cinzel', serif",
              paddingBottom: 2,
            }}
          />
          <select
            value={player.wonder}
            onChange={(e) => set("wonder")(e.target.value)}
            style={{
              marginTop: 4,
              backgroundColor: "transparent",
              fontSize: 11,
              color: C.textDim,
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {WONDERS.map((w) => (
              <option key={w} value={w} style={{ backgroundColor: C.card, color: C.text }}>
                {w}
              </option>
            ))}
          </select>
        </div>
        <div className="text-right shrink-0">
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 800, color: C.gold, lineHeight: 1 }}>
            {total}
          </div>
          <div style={{ fontSize: 10, color: C.textFaint, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            PV
          </div>
        </div>
      </div>

      <NumberField
        label="Etapas construidas"
        value={player.stagesBuilt}
        onChange={set("stagesBuilt")}
        max={5}
        icon={<Landmark size={13} style={{ color: C.textFaint }} />}
      />
      <NumberField label="PV de etapas" value={player.stagesVP} onChange={set("stagesVP")} max={60} />
      <NumberField label="PV cartas azules" value={player.blueVP} onChange={set("blueVP")} max={60} />
      <NumberField
        label="Fichas militares (×3)"
        value={player.militaryTokens}
        onChange={set("militaryTokens")}
        max={12}
        icon={<Shield size={13} style={{ color: C.textFaint }} />}
      />
      <NumberField
        label="Fichas de progreso (total)"
        value={player.progressTotal}
        onChange={set("progressTotal")}
        max={15}
        icon={<Sparkles size={13} style={{ color: C.textFaint }} />}
      />

      <div className="flex items-center justify-between py-1">
        <span className="flex items-center gap-1.5 text-sm" style={{ color: C.textDim }}>
          <span style={{ fontSize: 14, lineHeight: 1 }} role="img" aria-label="gato">
            🐱
          </span>
          Peón del Gato (+2)
        </span>
        <Toggle checked={player.hasCat} onChange={set("hasCat")} label="Peón del Gato" />
      </div>

      <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.cardBorder}` }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: C.textFaint, marginBottom: 4 }}>
          Fichas de progreso con PV
        </div>

        <ToggleRow label="Decor" checked={player.hasDecor} onChange={set("hasDecor")} isFirst>
          <div className="flex items-center justify-between py-1" style={{ fontSize: 12, color: C.textDim }}>
            <span>Maravilla completada</span>
            <Toggle checked={player.wonderComplete} onChange={set("wonderComplete")} label="Maravilla completada" />
          </div>
          <div style={{ fontSize: 11, color: C.textFaint }}>{player.wonderComplete ? "+6 PV" : "+4 PV"}</div>
        </ToggleRow>

        <ToggleRow label="Política (×icono de gato)" checked={player.hasPolitics} onChange={set("hasPolitics")}>
          <NumberField label="Iconos de gato en cartas azules" value={player.catIcons} onChange={set("catIcons")} max={10} />
        </ToggleRow>

        <ToggleRow label="Estrategia (= fichas militares)" checked={player.hasStrategy} onChange={set("hasStrategy")}>
          <div style={{ fontSize: 11, color: C.textFaint }}>
            +{player.militaryTokens} PV (según fichas militares arriba)
          </div>
        </ToggleRow>

        <ToggleRow label="Educación (×2 fichas progreso)" checked={player.hasEducation} onChange={set("hasEducation")}>
          <div style={{ fontSize: 11, color: C.textFaint }}>
            +{player.progressTotal * 2} PV (según total de fichas arriba)
          </div>
        </ToggleRow>

        <ToggleRow label="Cultura" checked={player.hasCulture} onChange={set("hasCulture")}>
          <div className="flex gap-1.5 py-1">
            {[0, 1, 2].map((n) => {
              const active = player.cultureCount === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => set("cultureCount")(n)}
                  style={{
                    flex: 1,
                    fontSize: 11,
                    padding: "4px 0",
                    borderRadius: 8,
                    border: `1px solid ${active ? C.goldBg : C.wellBorder}`,
                    backgroundColor: active ? C.goldBg : "transparent",
                    color: active ? "#171922" : C.textDim,
                    fontWeight: active ? 700 : 400,
                    cursor: "pointer",
                  }}
                >
                  {n === 0 ? "0 fichas" : n === 1 ? "1 ficha (+4)" : "2 fichas (+12)"}
                </button>
              );
            })}
          </div>
        </ToggleRow>
      </div>

      {breakdown.length > 0 && (
        <div
          className="flex flex-wrap gap-x-3 gap-y-1"
          style={{ marginTop: 12, paddingTop: 8, borderTop: `1px solid ${C.cardBorder}` }}
        >
          {breakdown.map((b) => (
            <span key={b.label} style={{ fontSize: 10, color: C.textFaint }}>
              {b.label} <span style={{ color: C.goldDim, fontWeight: 600 }}>{b.value}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Scoreboard({ onBack }) {
  const [players, setPlayers] = useState([emptyPlayer(0), emptyPlayer(1), emptyPlayer(2), emptyPlayer(3)]);

  const ranked = useMemo(() => {
    return players
      .map((p) => ({ ...p, ...computeTotal(p) }))
      .sort((a, b) => b.total - a.total || b.stagesBuilt - a.stagesBuilt);
  }, [players]);

  const rankOf = (id) => {
    const idx = ranked.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    if (ranked[idx].total === 0) return null;
    if (idx > 0 && ranked[idx].total === ranked[idx - 1].total && ranked[idx].stagesBuilt === ranked[idx - 1].stagesBuilt) {
      return rankOf(ranked[idx - 1].id);
    }
    return idx + 1;
  };

  const addPlayer = () => {
    if (players.length >= 7) return;
    setPlayers([...players, emptyPlayer(players.length)]);
  };
  const removePlayer = (id) => setPlayers(players.filter((p) => p.id !== id));
  const updatePlayer = (id, next) => setPlayers(players.map((p) => (p.id === id ? next : p)));
  const resetAll = () => setPlayers(players.map((p, i) => emptyPlayer(i)));

  return (
    <div>
      <header className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: C.textFaint,
              fontSize: 12,
              cursor: "pointer",
              padding: 0,
              marginBottom: 6,
            }}
          >
            ← Volver a la explicación del juego
          </button>
          <h1
            className="flex items-center gap-2"
            style={{ fontFamily: "'Cinzel', serif", fontSize: 26, fontWeight: 700, color: C.gold, letterSpacing: "0.02em" }}
          >
            <Trophy style={{ color: C.gold }} size={26} />
            7 Wonders: Architects
          </h1>
          <p style={{ color: C.textFaint, fontSize: 13, marginTop: 2 }}>Marcador de puntuación final</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addPlayer}
              disabled={players.length >= 7}
              className="flex items-center gap-1"
              style={{
                fontSize: 12,
                backgroundColor: C.track,
                color: C.gold,
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                cursor: players.length >= 7 ? "not-allowed" : "pointer",
                opacity: players.length >= 7 ? 0.4 : 1,
              }}
            >
              <Plus size={13} /> Jugador
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="flex items-center gap-1"
              style={{
                fontSize: 12,
                backgroundColor: C.track,
                color: C.textDim,
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              <RotateCcw size={13} /> Reiniciar
            </button>
          </div>
        </header>

        {ranked.some((p) => p.total > 0) && (
          <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: C.card, border: `1px solid ${C.cardBorder}` }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: C.textFaint, marginBottom: 8 }}>
              Clasificación
            </div>
            <div className="space-y-1.5">
              {ranked.map((p, idx) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div style={{ width: 24, textAlign: "center", fontSize: 13, fontWeight: 700, color: idx === 0 && p.total > 0 ? C.gold : C.textFaint }}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 truncate" style={{ fontSize: 13, color: C.text }}>
                    {p.name}
                  </div>
                  <div className="hidden sm:block" style={{ fontSize: 11, color: C.textFaint }}>
                    {p.wonder}
                  </div>
                  <div style={{ fontSize: 11, color: C.textFaint }}>{p.stagesBuilt}/5 etapas</div>
                  <div style={{ width: 40, textAlign: "right", fontFamily: "'Cinzel', serif", fontWeight: 700, color: C.gold }}>
                    {p.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((p) => (
            <PlayerCard
              key={p.id}
              player={p}
              onChange={(next) => updatePlayer(p.id, next)}
              onRemove={() => removePlayer(p.id)}
              canRemove={players.length > 2}
              rank={rankOf(p.id)}
            />
          ))}
        </div>

      <footer style={{ marginTop: 32, textAlign: "center", fontSize: 11, color: C.textFaint }}>
        Fichas militares = 3 PV cada una · Peón del Gato = 2 PV · Empates se resuelven por más etapas construidas
      </footer>
    </div>
  );
}
