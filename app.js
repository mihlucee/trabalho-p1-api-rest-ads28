const express = require("express");
const app = express();
const PORT = 3000;
 
// Importar rotas
const tarefasRoutes = require("./routes/tarefas");
const usuariosRoutes = require("./routes/usuarios");
const projetosRoutes = require("./routes/projetos");
const categoriasRoutes = require("./routes/categorias");
const comentariosRoutes = require("./routes/comentarios");
 
app.use(express.json());
 
// Usar rotas
app.use("/tarefas", tarefasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/projetos", projetosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/comentarios", comentariosRoutes);
 
app.get("/", (req, res) => {
  res.send("API de Gerenciamento de Tarefas está funcionando!");
});
 
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
