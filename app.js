// app.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota de teste inicial
app.get("/", (req, res) => {
  res.send("API de Gerenciamento de Tarefas está funcionando!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
