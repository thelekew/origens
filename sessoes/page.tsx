"use client";

import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  name: string;
  theme: string;
};

type Sessao = {
  id: number;
  clientId: number;
  date: string;
  summary: string;
};

export default function SessoesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");

  async function carregarClientes() {
    const res = await fetch("/api/clientes");
    const data = await res.json();
    setClientes(data);
  }

  async function carregarSessoes() {
    const res = await fetch("/api/sessoes");
    const data = await res.json();
    setSessoes(data);
  }

  async function criarSessao(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/sessoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientId, date, summary }),
    });

    setClientId("");
    setDate("");
    setSummary("");
    carregarSessoes();
  }

  useEffect(() => {
    carregarClientes();
    carregarSessoes();
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
          Sessões
        </h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Cadastro real de sessões no banco.
        </p>

        <form
          onSubmit={criarSessao}
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
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
            }}
          />

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Resumo da sessão"
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
            Salvar sessão
          </button>
        </form>

        <div style={{ display: "grid", gap: "14px" }}>
          {sessoes.map((sessao) => (
            <div
              key={sessao.id}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <div style={{ fontWeight: 700 }}>
                Cliente ID: {sessao.clientId}
              </div>
              <div style={{ color: "#666", marginTop: "6px" }}>
                {new Date(sessao.date).toLocaleDateString("pt-BR")}
              </div>
              <div style={{ color: "#444", marginTop: "8px" }}>
                {sessao.summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}