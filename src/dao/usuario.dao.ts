import { RowDataPacket } from "mysql2";
import { Usuario, usuarioProps } from "../model/usuario.model";
import pool from "../util/conexao.util";

export class UsuarioDao {
    public constructor() {}

    // Criar Usuário
    public async criarUsuario(usuario: Usuario): Promise<void> {
        try {
            await pool.query(
                "INSERT INTO usuarios (id, email, senha) VALUES (?, ?, ?)",
                [usuario.props.id, usuario.props.email, usuario.props.senha]
            );
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            throw new Error("Erro ao criar usuário.");
        }
    }

    // Listar Usuários
    public async listarUsuarios(): Promise<Usuario[]> {
        try {
            const [resultado] = await pool.query<usuarioProps[] & RowDataPacket[]>(
                "SELECT * FROM usuarios"
            );
            return resultado.map((user) => {
                const { id, email, senha } = user;
                return Usuario.assemble(id, email, senha);
            });
        } catch (error) {
            console.error("Erro ao listar usuários: ", error);
            throw new Error("Erro ao listar usuários.");
        }
    }

    // Buscar Usuário por ID
    public async buscarUsuario(id: string): Promise<Usuario | null> {
        try {
            const [resultado] = await pool.query<(usuarioProps & RowDataPacket)[]>(
                "SELECT * FROM usuarios WHERE id = ?",
                [id]
            );
            if (resultado.length === 0) return null; // Retorna null caso não encontre o usuário

            const { id: usuarioId, email, senha } = resultado[0];
            return Usuario.assemble(usuarioId, email, senha);
        } catch (error) {
            console.error("Erro ao buscar usuário: ", error);
            throw new Error("Erro ao buscar usuário.");
        }
    }

    // Editar Usuário
    public async editarUsuario(usuario: usuarioProps): Promise<void> {
        try {
            await pool.query(
                "UPDATE usuarios SET email = ?, senha = ? WHERE id = ?",
                [usuario.email, usuario.senha, usuario.id]
            );
        } catch (error) {
            console.error("Erro ao editar usuário: ", error);
            throw new Error("Erro ao editar usuário.");
        }
    }

    // Deletar Usuário
    public async deletarUsuario(id: string): Promise<void> {
        try {
            await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        } catch (error) {
            console.error("Erro ao deletar usuário: ", error);
            throw new Error("Erro ao deletar usuário.");
        }
    }
}
