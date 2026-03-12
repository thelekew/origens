"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Membro = {
  id: number;
  name: string;
  relation: string;
};

type Posicao = {
  x: number;
  y: number;
};

export default function CampoPage() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [posicoes, setPosicoes] = useState<Record<number, Posicao>>({});
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const campoRef = useRef<HTMLDivElement | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  async function carregarMembros() {
    const res = await fetch("/api/genograma");
    const data = await res.json();
    setMembros(data);

    const iniciais: Record<number, Posicao> = {};
    data.forEach((membro: Membro, i: number) => {
      iniciais[membro.id] = {
        x: 60 + (i % 4) * 170,
        y: 60 + Math.floor(i / 4) * 120,
      };
    });
    setPosicoes(iniciais);
  }

  useEffect(() => {
    carregarMembros();
  }, []);

  function iniciarArraste(e: React.MouseEvent<HTMLDivElement>, id: number) {
    e.preventDefault();

    const campo = campoRef.current;
    if (!campo) return;

    const campoRect = campo.getBoundingClientRect();
    const pos = posicoes[id] || { x: 0, y: 0 };

    dragOffset.current = {
      x: e.clientX - campoRect.left - pos.x,
      y: e.clientY - campoRect.top - pos.y,
    };

    setDraggingId(id);
  }

  function mover(e: React.MouseEvent<HTMLDivElement>) {
    if (draggingId === null) return;

    const campo = campoRef.current;
    if (!campo) return;

    const campoRect = campo.getBoundingClientRect();

    let novoX = e.clientX - campoRect.left - dragOffset.current.x;
    let novoY = e.clientY - campoRect.top - dragOffset.current.y;

    const larguraBolha = 132;
    const alturaBolha = 58;

    const maxX = campoRect.width - larguraBolha;
    const maxY = campoRect.height - alturaBolha;

    if (novoX < 0) novoX = 0;
    if (novoY < 0) novoY = 0;
    if (novoX > maxX) novoX = maxX;
    if (novoY > maxY) novoY = maxY;

    setPosicoes((prev) => ({
      ...prev,
      [draggingId]: {
        x: novoX,
        y: novoY,
      },
    }));
  }

  function pararArraste() {
    setDraggingId(null);
  }

  function corDoMembro(relacao: string) {
    const r = relacao.toLowerCase();
    if (r.includes("mãe")) return "#1f6b4f";
    if (r.includes("pai")) return "#355c7d";
    if (r.includes("cliente")) return "#111111";
    if (r.includes("avó") || r.includes("avô")) return "#7b5ea7";
    if (r.includes("irmã") || r.includes("irmão")) return "#a35c3a";
    return "#555555";
  }

  const leitura = useMemo(() => {
    const mae = membros.find((m) => m.relation.toLowerCase().includes("mãe"));
    const pai = membros.find((m) => m.relation.toLowerCase().includes("pai"));
    const avo = membros.find(
      (m) =>
        m.relation.toLowerCase().includes("avó") ||
        m.relation.toLowerCase().includes("avô")
    );

    const partes: string[] = [];

    if (mae && pai && posicoes[mae.id] && posicoes[pai.id]) {
      const dx = Math.abs(posicoes[mae.id].x - posicoes[pai.id].x);
      if (dx > 260) {
        partes.push("Mãe e pai aparecem bem distantes no campo.");
      } else {
        partes.push("Mãe e pai aparecem relativamente próximos no campo.");
      }
    }

    if (mae && avo && posicoes[mae.id] && posicoes[avo.id]) {
      const dy = Math.abs(posicoes[mae.id].y - posicoes[avo.id].y);
      if (dy < 120) {
        partes.push("A linha feminina parece muito próxima, talvez com forte influência ancestral.");
      }
    }

    if (partes.length === 0) {
      return "Observe quais membros você sente vontade de aproximar ou afastar. Isso costuma revelar movimentos importantes do sistema.";
    }

    return partes.join(" ");
  }, [membros, posicoes]);

  const mae = membros.find((m) => m.relation.toLowerCase().includes("mãe"));
  const pai = membros.find((m) => m.relation.toLowerCase().includes("pai"));

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#eef1f5",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "34px", marginBottom: "8px", color: "#111" }}>
          Campo Sistêmico
        </h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Arraste os membros para observar proximidade, distância e organização do sistema.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "20px",
          }}
        >
          <div
            ref={campoRef}
            onMouseMove={mover}
            onMouseUp={pararArraste}
            onMouseLeave={pararArraste}
            style={{
              width: "100%",
              height: "650px",
              background: "#fff",
              border: "2px dashed #ccc",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              width="100%"
              height="100%"
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {mae && pai && posicoes[mae.id] && posicoes[pai.id] && (
                <line
                  x1={posicoes[mae.id].x + 66}
                  y1={posicoes[mae.id].y + 29}
                  x2={posicoes[pai.id].x + 66}
                  y2={posicoes[pai.id].y + 29}
                  stroke="#d2d2d2"
                  strokeWidth="2"
                />
              )}
            </svg>

            {membros.map((membro) => {
              const pos = posicoes[membro.id] || { x: 50, y: 50 };

              return (
                <div
                  key={membro.id}
                  onMouseDown={(e) => iniciarArraste(e, membro.id)}
                  style={{
                    position: "absolute",
                    top: pos.y,
                    left: pos.x,
                    minWidth: "132px",
                    textAlign: "center",
                    padding: "16px 22px",
                    background: corDoMembro(membro.relation),
                    color: "#fff",
                    borderRadius: "999px",
                    cursor: draggingId === membro.id ? "grabbing" : "grab",
                    fontWeight: "bold",
                    userSelect: "none",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <div>{membro.name}</div>
                  <div style={{ fontSize: "12px", opacity: 0.85, marginTop: "4px" }}>
                    {membro.relation}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "20px",
              padding: "20px",
              height: "fit-content",
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Leitura reflexiva</h2>
            <p style={{ color: "#555", lineHeight: 1.7 }}>{leitura}</p>

            <div style={{ marginTop: "18px", display: "grid", gap: "10px" }}>
              <div style={{ padding: "12px", borderRadius: "12px", background: "#edf7f0", color: "#1f6b4f", fontWeight: 600 }}>
                Pergunta: quem hoje parece ocupar o centro do seu sistema?
              </div>
              <div style={{ padding: "12px", borderRadius: "12px", background: "#f6f6f6", color: "#444", fontWeight: 600 }}>
                Pergunta: existe alguém que parece distante demais?
              </div>
              <div style={{ padding: "12px", borderRadius: "12px", background: "#f6f6f6", color: "#444", fontWeight: 600 }}>
                Pergunta: qual posição transmite mais peso emocional?
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}