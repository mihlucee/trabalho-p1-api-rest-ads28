const express = require("express");
const router = express.Router();
 
let categorias = [];
let nextCategoriaId = 1;
 
// Middleware de validação para Categoria
const validateCategoria = (req, res, next) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: "Campo 'nome' é obrigatório." });
  }
  next();
};
 
// GET todas as categorias
router.get("/", (req, res) => {
  res.status(200).json(categorias);
});
 
// GET categoria por ID
router.get("/:id", (req, res) => {
  const categoria = categorias.find((c) => c.id === parseInt(req.params.id));
  if (!categoria) {
    return res.status(404).json({ message: "Categoria não encontrada." });
  }
  res.status(200).json(categoria);
});
 
// POST nova categoria
router.post("/", validateCategoria, (req, res) => {
  const { nome } = req.body;
  const novaCategoria = {
    id: nextCategoriaId++,
    nome,
  };
  categorias.push(novaCategoria);
  res.status(201).json(novaCategoria);
});
 
// PUT atualizar categoria
router.put("/:id", validateCategoria, (req, res) => {
  const categoriaIndex = categorias.findIndex((c) => c.id === parseInt(req.params.id));
  if (categoriaIndex === -1) {
    return res.status(404).json({ message: "Categoria não encontrada." });
  }
  const { nome } = req.body;
  const categoriaAtualizada = {
    ...categorias[categoriaIndex],
    nome,
  };
  categorias[categoriaIndex] = categoriaAtualizada;
  res.status(200).json(categoriaAtualizada);
});
 
// DELETE categoria
router.delete("/:id", (req, res) => {
  const initialLength = categorias.length;
  categorias = categorias.filter((c) => c.id !== parseInt(req.params.id));
  if (categorias.length === initialLength) {
    return res.status(404).json({ message: "Categoria não encontrada." });
  }
  res.status(204).send();
});
 
module.exports = router;
