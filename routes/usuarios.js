const express = require("express");
const router = express.Router();
 
let usuarios = [];
let nextUsuarioId = 1;
 
// Middleware de validação para Usuário
const validateUsuario = (req, res, next) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ message: "Campos 'nome' e 'email' são obrigatórios." });
  }
  // Validação de formato de email simples
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({ message: "Formato de email inválido." });
  }
  // Verificar se o email já existe (para POST e PUT)
  if (req.method === 'POST' && usuarios.some(u => u.email === email)) {
    return res.status(409).json({ message: "Email já cadastrado." });
  }
  if (req.method === 'PUT') {
    const userId = parseInt(req.params.id);
    const existingUser = usuarios.find(u => u.id === userId);
    if (existingUser && existingUser.email !== email && usuarios.some(u => u.email === email)) {
      return res.status(409).json({ message: "Email já cadastrado por outro usuário." });
    }
  }
  next();
};
 
// GET todos os usuários
router.get("/", (req, res) => {
  res.status(200).json(usuarios);
});
 
// GET usuário por ID
router.get("/:id", (req, res) => {
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!usuario) {
       return res.status(404).json({ message: "Usuário não encontrado." });
  }
  res.status(200).json(usuario);
});
 
// POST novo usuário
router.post("/", validateUsuario, (req, res) => {
  const { nome, email } = req.body;
  const novoUsuario = {
    id: nextUsuarioId++,
    nome,
    email,
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});
 
// PUT atualizar usuário
router.put("/:id", validateUsuario, (req, res) => {
  const usuarioIndex = usuarios.findIndex((u) => u.id === parseInt(req.params.id));
  if (usuarioIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  const { nome, email } = req.body;
  const usuarioAtualizado = {
    ...usuarios[usuarioIndex],
    nome,
    email,
  };
  usuarios[usuarioIndex] = usuarioAtualizado;
  res.status(200).json(usuarioAtualizado);
});
 
// DELETE usuário
router.delete("/:id", (req, res) => {
  const initialLength = usuarios.length;
  usuarios = usuarios.filter((u) => u.id !== parseInt(req.params.id));
  if (usuarios.length === initialLength) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  res.status(204).send();
});
 
module.exports = router;

