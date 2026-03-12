import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#f5f6f2",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#1f6b4f",
              fontWeight: 700,
            }}
          >
            ORIGENS
          </div>
          <h1 style={{ fontSize: "42px", margin: "10px 0", color: "#111" }}>
            Plataforma Sistêmica Digital
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#555",
              maxWidth: "700px",
              lineHeight: 1.6,
            }}
          >
            Primeira versão do sistema online para terapeutas sistêmicos e
            constelação familiar.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          {[
            ["Clientes", "48"],
            ["Sessões", "112"],
            ["Diários", "17"],
            ["Genograma", "7"],
          ].map(([title, value]) => (
            <div
              key={title}
              style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <div style={{ color: "#666", fontSize: "14px" }}>{title}</div>
              <div
                style={{ fontSize: "32px", fontWeight: 700, marginTop: "8px" }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Menu</h2>

            <div style={{ display: "grid", gap: "10px" }}>
              {[
                ["Painel do terapeuta", "/"],
                ["Login", "/login"],
                ["Clientes", "/clientes"],
                ["Sessões", "/sessoes"],
                ["Diário sistêmico", "/diario"],
              ].map(([item, href]) => (
                <Link
                  key={item}
                  href={href}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background:
                      item === "Painel do terapeuta" ? "#edf7f0" : "#f8f8f8",
                    color:
                      item === "Painel do terapeuta" ? "#1f6b4f" : "#444",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
              Painel do terapeuta
            </h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Visão inicial do ORIGENS funcionando dentro do projeto real.
            </p>

            <div style={{ display: "grid", gap: "14px" }}>
              {[
                ["Joyce Renne", "Tema: mãe e pertencimento"],
                ["Carla Menezes", "Tema: relacionamento"],
                ["Rafael Lima", "Tema: pai e prosperidade"],
              ].map(([name, theme]) => (
                <div
                  key={name}
                  style={{
                    border: "1px solid #e3e3e3",
                    borderRadius: "14px",
                    padding: "16px",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{name}</div>
                  <div style={{ color: "#666", marginTop: "6px" }}>{theme}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}