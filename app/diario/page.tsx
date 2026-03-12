"use client";

import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  name: string;
  theme: string;
};

type Diario = {
  id: number;
  clientId: number;
  emotion: string;
  text: string;
  created: string;
};

export default function DiarioPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [diarios, setDiarios] = useState<Diario[]>([]);
  const [clientId, setClientId] = useState("");
  const [emotion, setEmotion] = useState("");
  const [text, setText] = useState("");

  async function carregarClientes() {
    const res = await fetch("/api/clientes");
    const data = await res.json();
    setClientes(data);
  }

  async function carregarDiarios() {
    const res = await fetch("/api/diario");
    const data = await res.json();
    setDiarios(data);
  }

  async function criarDiario(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/diario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientId, emotion, text }),
    });

    setClientId("");
    setEmotion("");
    setText("");
    carregarDiarios();
  }

  useEffect(() => {
    carregarClientes();
    carregarDiarios();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f6f2",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", color: "#111", marginBottom: "8px" }}>
          Diário Sistêmico
        </h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Registro emocional do cliente entre sessões.
        </p>

        <form
          onSubmit={criarDiario}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "16px",
            padding: "20px",
            display: "grid",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
            }}
          >
            <option value="">Selecione o cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.name}
              </option>
            ))}
          </select>

          <input
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="Emoção predominante"
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
            }}
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Reflexão do cliente"
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
              minHeight: "120px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Salvar diário
          </button>
        </form>

        <div style={{ display: "grid", gap: "14px" }}>
          {diarios.map((diario) => (
            <div
              key={diario.id}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <div style={{ fontWeight: 700 }}>{diario.emotion}</div>
              <div style={{ color: "#666", marginTop: "6px" }}>
                Cliente ID: {diario.clientId}
              </div>
              <div style={{ color: "#444", marginTop: "8px" }}>
                {diario.text}
              </div>
              <div style={{ color: "#888", marginTop: "8px", fontSize: "14px" }}>
                {new Date(diario.created).toLocaleDateString("pt-BR")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}