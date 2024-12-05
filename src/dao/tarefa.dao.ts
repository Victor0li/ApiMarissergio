import { RowDataPacket } from "mysql2"
import { Tarefa, tarefaProps } from "../model/tarefa.model"
import pool from "../util/conexao.util"

export class TarefaDao {
    public constructor() { }

    // Criar Tarefas
    public async criarTarefa(tarefa: Tarefa) {
        try {
            await pool.query(
                "INSERT INTO tarefas(id,titulo,descricao,status) values(?, ?, ?, ?)",
                [tarefa.props.id, tarefa.props.titulo, tarefa.props.descricao, tarefa.props.status]
            )
        } catch (error) {
            console.log("Erro ao criar tarefa: ", error)
            throw error
        }
    }

    // Listar Tarefas
    public async listarTarefas(): Promise<Tarefa[]> {
        try {
            const [resultado] = await pool.query<tarefaProps[] & RowDataPacket[]>("SELECT * FROM tarefas")
            const tarefa: Tarefa[] = resultado.map((tarefas) => { // A querry retorna um array e esse array será mapeado p criar instâncias
                const { id, titulo, descricao, status } = tarefas
                return Tarefa.assemble(id, titulo, descricao, status)
            })
            return tarefa
        } catch (error) {
            console.log("Erro ao listar livros: ", error)
            throw error
        }
    }

    // Buscar tarefa por ID
    public async buscarTarefa(id: string): Promise<Tarefa | null> {
        try {
            const [resultado] = await pool.query<(tarefaProps & RowDataPacket)[]>("SELECT * FROM tarefas WHERE id = ?", [id]) // Passa o ID como parametro
            const { id: tarefaId, titulo, descricao, status } = resultado[0];
            const tarefa: Tarefa = Tarefa.assemble(tarefaId, titulo, descricao, status);
            return tarefa;
        } catch (error) {
            console.log("Erro ao buscar tarefa: ", error)
            throw error
        }

    }

    // Editar tarefa
    public async editarTarefa(tarefa: tarefaProps) {
        try {
            await pool.query("UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?", [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.id]);
        } catch (error) {
            console.log("Erro ao editar tarefa: ", error)
            throw error
        }
    }

    // Deletar tarefa
    public async deletarTarefa(id: string) {
        try {
            await pool.query("DELETE FROM tarefas WHERE id = ?", [id])
        } catch (error) {
            console.log("Erro ao deletar tarefa: ", error)
            throw error
        }
    }

    
}