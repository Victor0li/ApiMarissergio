import express from "express"; // Importando o Express
import tarefaRoutes from './api/tarefa.api'

const app = express(); //Criando uma instância do servidor 

app.use(express.json()); // Pra dizer que o servidor vai receber dados em formato JSON
app.use('/api', tarefaRoutes); // As rotas estão em /api

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});