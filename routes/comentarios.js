const express = require("express");
const router = express.Router();
 
let comentarios = [];
let nextComentarioId = 1;
 
// Middleware de validação para Comentário
const validateComentario = (req, res, next) => {
  const { texto, usuarioId, tarefaId } = req.body;
  if (!texto || !usuarioId || !tarefaId) {
    return res.status(400).json({ message: "Campos 'texto', 'usuarioId' e 'tarefaId' são obrigatórios." });
  }
  next();
};
 
// GET todos os comentários
router.get("/", (req, res) => {
  res.status(200).json(comentarios);
});
 
// GET comentário por ID
router.get("/:id", (req, res) => {
  const comentario = comentarios.find((c) => c.id === parseInt(req.params.id));
  if (!comentario) {
    return res.status(404).json({ message: "Comentário não encontrado." });
  }
  res.status(200).json(comentario);
});
 
// POST novo comentário
router.post("/", validateComentario, (req, res) => {
  const { texto, usuarioId, tarefaId } = req.body;
  const novoComentario = {
    id: nextComentarioId++,
    texto,
    dataCriacao: new Date().toISOString(),
    usuarioId,
    tarefaId,
  };
  comentarios.push(novoComentario);
  res.status(201).json(novoComentario);
});
 
// PUT atualizar comentário
router.put("/:id", validateComentario, (req, res) => {
  const comentarioIndex = comentarios.findIndex((c) => c.id === parseInt(req.params.id));
  if (comentarioIndex === -1) {
    return res.status(404).json({ message: "Comentário não encontrado." });
  }
  const { texto, usuarioId, tarefaId } = req.body;
  const comentarioAtualizado = {
    ...comentarios[comentarioIndex],
    texto,
    usuarioId,
    tarefaId,
  };
  comentarios[comentarioIndex] = comentarioAtualizado;
  res.status(200).json(comentarioAtualizado);
});
 
// DELETE comentário
router.delete("/:id", (req, res) => {
  const initialLength = comentarios.length;
  comentarios = comentarios.filter((c) => c.id !== parseInt(req.params.id));
  if (comentarios.length === initialLength) {
    return res.status(404).json({ message: "Comentário não encontrado." });
  }
  res.status(204).send();
});
 
module.exports = router;
