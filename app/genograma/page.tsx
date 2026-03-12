"use client";

import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  name: string;
  theme: string;
};

type Membro = {
  id: number;
  clientId: number;
  name: string;
  relation: string;
};

export default function GenogramaPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [membros, setMembros] = useState<Membro[]>([]);
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");

  async function carregarClientes() {
    const res = await fetch("/api/clientes");
    const data = await res.json();
    setClientes(data);
  }

  async function carregarMembros() {
    const res = await fetch("/api/genograma");
    const data = await res.json();
    setMembros(data);
  }

  async function criarMembro(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/genograma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientId, name, relation }),
    });

    setClientId("");
    setName("");
    setRelation("");
    carregarMembros();
  }

  useEffect(() => {
    carregarClientes();
    carregarMembros();
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
          Genograma
        </h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Cadastro dos membros do sistema familiar.
        </p>

        <form
          onSubmit={criarMembro}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do membro"
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
            }}
          />

          <input
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder="Relação (mãe, pai, avó, irmão...)"
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
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
            Salvar membro
          </button>
        </form>

        <div style={{ display: "grid", gap: "14px" }}>
          {membros.map((membro) => (
            <div
              key={membro.id}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "18px" }}>
                {membro.name}
              </div>
              <div style={{ color: "#666", marginTop: "6px" }}>
                {membro.relation}
              </div>
              <div style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
                Cliente ID: {membro.clientId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}