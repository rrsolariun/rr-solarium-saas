import React, { useState } from "react";

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [consumo, setConsumo] = useState("");

  const [clientes, setClientes] = useState([]);

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
        }
      );

      const dados = await resposta.json();

      if (dados.sucesso) {
        setLogado(true);
      } else {
        alert("Usuário ou senha inválidos");
      }
    } catch {
      alert("Erro ao conectar com servidor");
    }
  }

  function cadastrarCliente() {
    const novoCliente = {
      nome,
      telefone,
      cidade,
      consumo
    };

    setClientes([...clientes, novoCliente]);

    setNome("");
    setTelefone("");
    setCidade("");
    setConsumo("");
  }

  if (!logado) {
    return (
      <div style={{ padding: 40 }}>
        <h1>☀️ RR Solarium</h1>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br /><br />

        <button onClick={entrar}>
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>☀️ RR Solarium CRM</h1>

      <h2>Cadastro de Clientes</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Consumo kWh"
        value={consumo}
        onChange={(e) => setConsumo(e.target.value)}
      />

      <br /><br />

      <button onClick={cadastrarCliente}>
        Salvar Cliente
      </button>

      <hr />

      <h2>Clientes Cadastrados</h2>

      {clientes.map((cliente, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <strong>{cliente.nome}</strong><br />
          📞 {cliente.telefone}<br />
          📍 {cliente.cidade}<br />
          ⚡ {cliente.consumo} kWh
        </div>
      ))}
    </div>
  );
}