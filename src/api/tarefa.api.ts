import { Router } from 'express';
import { TarefaController } from '../controller/tarefa.controller';
import { TarefaDao } from '../dao/tarefa.dao';

const router = Router();

const tarefaDao = new TarefaDao();
const tarefaController = new TarefaController(tarefaDao);

// Rota para criar tarefa
router.post('/tarefas', (req, res) => {
    tarefaController.criarTarefa(req, res)
});

// Rota para listar todas as tarefas
router.get('/tarefas', (req, res) => {
    tarefaController.listarTarefas(res)
});

// Rota para buscar tarefa por ID
router.get('/tarefas/:id', (req, res) => {
    tarefaController.buscarTarefa(req, res)
});

// Rota para editar tarefa
router.put('/tarefas/:id', (req, res) => {
    tarefaController.editarTarefa(req, res)
});

// Rota para deletar tarefa
router.delete('/tarefas/:id', (req, res) => {
    tarefaController.deletarTarefa(req, res)
});

export default router;
