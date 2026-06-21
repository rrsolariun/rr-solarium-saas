import React, { useState } from "react";

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function entrar() {
    try {
      const resposta = await fetch(
  "https://turbo-parakeet-qv7r445x756qhxgx5-3000.app.github.dev/login",
  {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario,
          senha
        })
      });

      const dados = await resposta.json();

      if (dados.sucesso) {
        setMensagem(`Bem-vindo! Perfil: ${dados.perfil}`);
      } else {
        setMensagem("Usuário ou senha inválidos");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor");
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>☀️ RR Solarium</h1>

      <input
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br />
      <br />

      <button onClick={entrar}>
        Entrar
      </button>

      <p>{mensagem}</p>
    </div>
  );
}