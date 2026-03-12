"use client";

import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  name: string;
  theme: string;
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");

  async function carregarClientes() {
    const res = await fetch("/api/clientes");
    const data = await res.json();
    setClientes(data);
  }

  async function criarCliente(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, theme }),
    });

    setName("");
    setTheme("");
    carregarClientes();
  }

  useEffect(() => {
    carregarClientes();
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
          Clientes
        </h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Cadastro real de clientes no banco de dados.
        </p>

        <form
          onSubmit={criarCliente}
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
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do cliente"
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #d9d9d9",
            }}
          />

          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Tema principal"
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
            Salvar cliente
          </button>
        </form>

        <div style={{ display: "grid", gap: "14px" }}>
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "18px" }}>
                {cliente.name}
              </div>
              <div style={{ color: "#666", marginTop: "6px" }}>
                {cliente.theme}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}