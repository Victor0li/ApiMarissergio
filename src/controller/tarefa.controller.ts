import { Request, Response } from "express";
import { Tarefa, tarefaProps } from "../model/tarefa.model";
import { TarefaDao } from "../dao/tarefa.dao";

export class TarefaController {
    public constructor(readonly tarefaDao: TarefaDao) {}

    // Criar Tarefa
    public async criarTarefa(req: Request, res: Response) {
        const { titulo, descricao, id_usuario } = req.body;
        try {
            const tarefa: Tarefa = Tarefa.build(titulo, descricao, id_usuario);
            await this.tarefaDao.criarTarefa(tarefa);
            res.status(201).send({ message: "Tarefa criada com sucesso!" });
        } catch (error: any) { // Type assertion para 'any'
            res.status(500).send({ message: "Erro ao criar tarefa", error: error.message });
        }
    }

    // Listar Tarefas
    public async listarTarefas(req: Request, res: Response) {
        try {
            const tarefas = await this.tarefaDao.listarTarefas();
            res.status(200).json(tarefas);
        } catch (error: any) { // Type assertion para 'any'
            res.status(500).send({ message: "Erro ao listar tarefas", error: error.message });
        }
    }

    // Buscar por ID
    public async buscarTarefa(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const tarefa = await this.tarefaDao.buscarTarefa(id);
            if (!tarefa) {
                return res.status(404).send({ message: "Tarefa não encontrada" });
            }
            res.status(200).json(tarefa);
        } catch (error: any) { // Type assertion para 'any'
            res.status(500).send({ message: "Erro ao buscar tarefa", error: error.message });
        }
    }

    // Editar Tarefa
    public async editarTarefa(req: Request, res: Response) {
        const id = req.params.id;
        const { titulo, descricao, status, id_usuario } = req.body;
        try {
            const tarefa = Tarefa.assemble(id, titulo, descricao, status, id_usuario);
            await this.tarefaDao.editarTarefa(tarefa.props);
            res.status(200).send({ message: "Tarefa editada com sucesso!" });
        } catch (error: any) { // Type assertion para 'any'
            res.status(500).send({ message: "Erro ao editar tarefa", error: error.message });
        }
    }

    // Deletar Tarefa
    public async deletarTarefa(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.tarefaDao.deletarTarefa(id);
            res.status(204).send(); // 204 No Content
        } catch (error: any) { // Type assertion para 'any'
            res.status(500).send({ message: "Erro ao deletar tarefa", error: error.message });
        }
    }
}