import React, { useState } from "react";
import Landing from "./Landing.jsx";
import Scoreboard from "./Scoreboard.jsx";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap');`;

const C = {
  pageBg: "#12141f",
  pageBgTop: "#20253a",
  text: "#e7e2d4",
};

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "score"

  return (
    <div
      className="min-h-full w-full"
      style={{
        background: `radial-gradient(ellipse at top, ${C.pageBgTop} 0%, ${C.pageBg} 60%)`,
        fontFamily: "'Work Sans', sans-serif",
        color: C.text,
      }}
    >
      <style>{FONT_IMPORT}</style>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {view === "landing" ? (
          <Landing onStart={() => setView("score")} />
        ) : (
          <Scoreboard onBack={() => setView("landing")} />
        )}
      </div>
    </div>
  );
}
