import { Request, Response } from 'express';
import { Tarefa, tarefaProps } from '../model/tarefa.model';
import { TarefaDao } from '../dao/tarefa.dao';

export class TarefaController {
    public constructor(readonly tarefaDao: TarefaDao) { } // Recebe o DAO(q é quem acessa o banco)

    //Criar Tarefa
    public async criarTarefa(req: Request, res: Response) {
        const { titulo, descricao } = req.body
        const tarefa: Tarefa = Tarefa.build(titulo, descricao)
        try {
            this.tarefaDao.criarTarefa(tarefa)
            res.status(201).send({ message: 'Tarefa criada com sucesso!' })
        } catch (error) {
            res.status(500).send({ message: 'Erro ao criar tarefa', error });
        }
    }

    //Listar Tarefas
    public async listarTarefas(res: Response) {
        try {
            const tarefa = await this.tarefaDao.listarTarefas()
            res.status(200).json({ tarefa }).send()
        } catch {
            res.status(500).send({ message: 'Erro ao listar tarefa:' })
        }
    }

    //Buscar por ID
    public async buscarTarefa(req: Request, res: Response) {
        const id = req.params.id
        try {
            const tarefa = await this.tarefaDao.buscarTarefa(id)
            res.status(200).json({ tarefa }).send
        } catch {
            res.status(404).send({ message: 'Tarefa não encontrada' })
        }

    }

    //Editar tarefa
    public async editarTarefa(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { titulo, descricao, status } = req.body;

            const tarefa = Tarefa.assemble(id, titulo, descricao, status);
            await this.tarefaDao.editarTarefa(tarefa.props)

            return res.status(200).send({ message: 'Tarefa editada com sucesso!' })

        } catch (error) {
            res.status(404).send({ message: 'Tarefa não encontrada' })
        }
    }

    // Deletar tarefa
    public async deletarTarefa(req: Request, res: Response) {
        const id = req.params.id
        try {
            await this.tarefaDao.deletarTarefa(id)
            res.status(200).send({ message: 'Tarefa deletada com sucesso!' })
        } catch {
            res.status(404).send({ message: 'Tarefa não encontrada' })
        }
    }
}