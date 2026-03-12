export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f5f6f2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#fff", border: "1px solid #ddd", borderRadius: "20px", padding: "30px" }}>
        <div style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1f6b4f", fontWeight: 700 }}>
          ORIGENS
        </div>
        <h1 style={{ fontSize: "30px", margin: "12px 0 8px", color: "#111" }}>Entrar</h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Acesso para terapeuta e cliente.
        </p>

        <div style={{ display: "grid", gap: "14px" }}>
          <input placeholder="E-mail" style={inputStyle} />
          <input type="password" placeholder="Senha" style={inputStyle} />
          <button style={primaryButton}>Entrar</button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "14px", 
  borderRadius: "12px",
  border: "1px solid #d9d9d9",
  fontSize: "15px",
  outline: "none",
} as const;

const primaryButton = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
} as const;