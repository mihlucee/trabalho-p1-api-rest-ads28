// routes/tarefas.js
const express = require("express");
const router = express.Router();

let tarefas = [];
let nextTarefaId = 1;

// Middleware de validação para Tarefa
const validateTarefa = (req, res, next) => {
  const { titulo, status, usuarioId, projetoId } = req.body;
  if (!titulo || !status || !usuarioId || !projetoId) {
    return res.status(400).json({ message: "Campos 'titulo', 'status', 'usuarioId' e 'projetoId' são obrigatórios." });
  }
  const statusValidos = ["pendente", "em andamento", "concluída"];
  if (!statusValidos.includes(status)) {
    return res.status(400).json({ message: "Status inválido. Use 'pendente', 'em andamento' ou 'concluída'." });
  }
  next();
};

// GET todas as tarefas
router.get("/", (req, res) => {
  res.status(200).json(tarefas);
});

// GET tarefa por ID
router.get("/:id", (req, res) => {
  const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
  if (!tarefa) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }
  res.status(200).json(tarefa);
});

// POST nova tarefa
router.post("/", validateTarefa, (req, res) => {
  const { titulo, descricao, status, usuarioId, projetoId } = req.body;
  const novaTarefa = {
    id: nextTarefaId++,
    titulo,
    descricao: descricao || null,
    status,
    dataCriacao: new Date().toISOString(),
    dataConclusao: status === "concluída" ? new Date().toISOString() : null,
    usuarioId,
    projetoId,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// PUT atualizar tarefa
router.put("/:id", validateTarefa, (req, res) => {
  const tarefaIndex = tarefas.findIndex((t) => t.id === parseInt(req.params.id));
  if (tarefaIndex === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }
  const { titulo, descricao, status, usuarioId, projetoId } = req.body;
  const tarefaAtualizada = {
    ...tarefas[tarefaIndex],
    titulo,
    descricao: descricao || tarefas[tarefaIndex].descricao,
    status,
    usuarioId,
    projetoId,
    dataConclusao: status === "concluída" && !tarefas[tarefaIndex].dataConclusao
      ? new Date().toISOString()
      : tarefas[tarefaIndex].dataConclusao,
  };
  tarefas[tarefaIndex] = tarefaAtualizada;
  res.status(200).json(tarefaAtualizada);
});

// DELETE tarefa
router.delete("/:id", (req, res) => {
  const initialLength = tarefas.length;
  tarefas = tarefas.filter((t) => t.id !== parseInt(req.params.id));
  if (tarefas.length === initialLength) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }
  res.status(204).send();
});

module.exports = router;

