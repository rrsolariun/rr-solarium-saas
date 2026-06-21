const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [
  {
    usuario: "admin",
    senha: "123456",
    perfil: "Administrador"
  },
  {
    usuario: "vendedor",
    senha: "123456",
    perfil: "Vendedor"
  },
  {
    usuario: "consultor",
    senha: "123456",
    perfil: "Consultor"
  }
];

app.get("/", (req, res) => {
  res.json({
    sistema: "RR Solarium",
    status: "online"
  });
});

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  const user = usuarios.find(
    u => u.usuario === usuario && u.senha === senha
  );

  if (!user) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Usuário ou senha inválidos"
    });
  }

  res.json({
    sucesso: true,
    perfil: user.perfil
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});