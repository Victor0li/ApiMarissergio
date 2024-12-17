import express from "express";
import tarefaRoutes from './api/tarefa.api'
import usuarioRoutes from './api/usuario.api'

const app = express(); //Criando uma instância do servidor 

app.use(express.json()); // Pra dizer que o servidor vai receber dados em formato JSON
app.use('/api', tarefaRoutes); // Rotas das tarefas
app.use('/api', usuarioRoutes); // Rotas dos usuários

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});