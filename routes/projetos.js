const express = require("express");
const router = express.Router();
 
let projetos = [];
let nextProjetoId = 1;
 
// Middleware de validação para Projeto
const validateProjeto = (req, res, next) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: "Campo 'nome' é obrigatório." });
  }
  next();
};
 
// GET todos os projetos
router.get("/", (req, res) => {
  res.status(200).json(projetos);
});
 
// GET projeto por ID
router.get("/:id", (req, res) => {
  const projeto = projetos.find((p) => p.id === parseInt(req.params.id));
  if (!projeto) {
    return res.status(404).json({ message: "Projeto não encontrado." });
  }
  res.status(200).json(projeto);
});
 
// POST novo projeto
router.post("/", validateProjeto, (req, res) => {
  const { nome, descricao } = req.body;
  const novoProjeto = {
    id: nextProjetoId++,
    nome,
    descricao: descricao || null,
  };
  projetos.push(novoProjeto);
  res.status(201).json(novoProjeto);
});
 
// PUT atualizar projeto
router.put("/:id", validateProjeto, (req, res) => {
  const projetoIndex = projetos.findIndex((p) => p.id === parseInt(req.params.id));
  if (projetoIndex === -1) {
    return res.status(404).json({ message: "Projeto não encontrado." });
  }
  const { nome, descricao } = req.body;
  const projetoAtualizado = {
    ...projetos[projetoIndex],
    nome,
    descricao: descricao || projetos[projetoIndex].descricao,
  };
  projetos[projetoIndex] = projetoAtualizado;
  res.status(200).json(projetoAtualizado);
});
 
// DELETE projeto
router.delete("/:id", (req, res) => {
  const initialLength = projetos.length;
  projetos = projetos.filter((p) => p.id !== parseInt(req.params.id));
  if (projetos.length === initialLength) {
    return res.status(404).json({ message: "Projeto não encontrado." });
  }
  res.status(204).send();
});
 
module.exports = router;
