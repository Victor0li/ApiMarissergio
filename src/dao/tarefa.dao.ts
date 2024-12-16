import { RowDataPacket } from "mysql2";
import { Tarefa, tarefaProps } from "../model/tarefa.model";
import pool from "../util/conexao.util";

export class TarefaDao {
    public constructor() { }

    // Criar Tarefas
    public async criarTarefa(tarefa: Tarefa): Promise<void> {
        try {
            await pool.query(
                "INSERT INTO tarefas(id, titulo, descricao, status, id_usuario) values(?, ?, ?, ?, ?)",
                [tarefa.props.id, tarefa.props.titulo, tarefa.props.descricao, tarefa.props.status, tarefa.props.id_usuario] // Adicionando o id_usuario
            );
        } catch (error) {
            console.error("Erro ao criar tarefa: ", error);
            throw new Error("Erro ao criar tarefa.");
        }
    }

    // Listar Tarefas
    public async listarTarefas(): Promise<Tarefa[]> {
        try {
            const [resultado] = await pool.query<tarefaProps[] & RowDataPacket[]>("SELECT * FROM tarefas");
            return resultado.map((tarefa) => {
                const { id, titulo, descricao, status, id_usuario } = tarefa;
                return Tarefa.assemble(id, titulo, descricao, status, id_usuario); // Incluindo o id_usuario
            });
        } catch (error) {
            console.error("Erro ao listar tarefas: ", error);
            throw new Error("Erro ao listar tarefas.");
        }
    }

    // Buscar tarefa por ID
    public async buscarTarefa(id: string): Promise<Tarefa | null> {
        try {
            const [resultado] = await pool.query<(tarefaProps & RowDataPacket)[]>("SELECT * FROM tarefas WHERE id = ?", [id]);
            if (resultado.length === 0) {
                return null; // Caso a tarefa não seja encontrada
            }
            const { id: tarefaId, titulo, descricao, status, id_usuario } = resultado[0];
            return Tarefa.assemble(tarefaId, titulo, descricao, status, id_usuario);
        } catch (error) {
            console.error("Erro ao buscar tarefa: ", error);
            throw new Error("Erro ao buscar tarefa.");
        }
    }

    // Editar tarefa
    public async editarTarefa(tarefa: tarefaProps): Promise<void> {
        try {
            await pool.query(
                "UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?",
                [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.id]
            );
        } catch (error) {
            console.error("Erro ao editar tarefa: ", error);
            throw new Error("Erro ao editar tarefa.");
        }
    }

    // Deletar tarefa
    public async deletarTarefa(id: string): Promise<void> {
        try {
            await pool.query("DELETE FROM tarefas WHERE id = ?", [id]);
        } catch (error) {
            console.error("Erro ao deletar tarefa: ", error);
            throw new Error("Erro ao deletar tarefa.");
        }
    }
}
