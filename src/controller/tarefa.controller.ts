import { Request, Response } from "express";
import { Tarefa, tarefaProps } from "../model/tarefa.model";
import { TarefaDao } from "../dao/tarefa.dao";
import { CriarTarefaDto } from "../dto/tarefa.dto"; // Importando apenas o DTO de criação

export class TarefaController {
    public constructor(readonly tarefaDao: TarefaDao) {}

    // Criar Tarefa
    public async criarTarefa(req: Request, res: Response) {
        try {
            // Valida os dados de entrada usando o DTO
            const { titulo, descricao, id_usuario } = new CriarTarefaDto(
                req.body.titulo,
                req.body.descricao,
                req.body.id_usuario
            );

            const tarefa: Tarefa = Tarefa.build(titulo, descricao, id_usuario);
            await this.tarefaDao.criarTarefa(tarefa);
            res.status(201).send({ message: "Tarefa criada com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ message: "Erro ao criar tarefa", error: error.message });
        }
    }

    // Listar Tarefas
    public async listarTarefasPorUsuario(req: Request, res: Response) {
        const id_usuario = req.params.id_usuario; 
        try {
            const tarefas = await this.tarefaDao.listarTarefasPorUsuario(id_usuario);
            res.status(200).json(tarefas);
        } catch (error: any) {
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
        } catch (error: any) {
            res.status(500).send({ message: "Erro ao buscar tarefa", error: error.message });
        }
    }

    // Editar Tarefa (agora sem o DTO de atualização)
    public async editarTarefa(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const { titulo, descricao, status } = req.body; // Agora obtém os dados diretamente do corpo da requisição

            if (!titulo || !descricao || !status) {
                return res.status(400).send({ message: "Título, descrição e status são obrigatórios." });
            }

            const tarefa = Tarefa.assemble(id, titulo, descricao, status, req.body.id_usuario);
            await this.tarefaDao.editarTarefa(tarefa.props);
            res.status(200).send({ message: "Tarefa editada com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ message: "Erro ao editar tarefa", error: error.message });
        }
    }

    // Deletar Tarefa
    public async deletarTarefa(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.tarefaDao.deletarTarefa(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).send({ message: "Erro ao deletar tarefa", error: error.message });
        }
    }
}