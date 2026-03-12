export default function DiarioPage() {
  const diarios = [
    { emocao: "Raiva", reflexao: "Senti que voltei a ser pequena ao falar com minha mãe." },
    { emocao: "Tristeza", reflexao: "Tenho medo de repetir o afastamento que vi na família." },
  ];

  return (
    <main style={page}>
      <div style={container}>
        <h1 style={title}>Diário Sistêmico</h1>
        <p style={subtitle}>Registros emocionais do cliente.</p>

        <div style={{ display: "grid", gap: "14px", marginTop: "20px" }}>
          {diarios.map((item, i) => (
            <div key={i} style={card}>
              <div style={{ fontWeight: 700 }}>{item.emocao}</div>
              <div style={{ color: "#666", marginTop: "6px" }}>{item.reflexao}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const page = { minHeight: "100vh", background: "#f5f6f2", fontFamily: "Arial, sans-serif", padding: "40px" } as const;
const container = { maxWidth: "1000px", margin: "0 auto" } as const;
const title = { fontSize: "36px", color: "#111", marginBottom: "8px" } as const;
const subtitle = { color: "#666" } as const;
const card = { background: "#fff", border: "1px solid #ddd", borderRadius: "16px", padding: "18px" } as const;