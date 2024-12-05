import { RowDataPacket } from "mysql2";
import { Usuario, usuarioProps } from "../model/usuario.model";
import pool from "../util/conexao.util";

export class UsuarioDao {
    public constructor() {}

    // Criar Usuário
    public async criarUsuario(usuario: Usuario) {
        try {
            await pool.query(
                "INSERT INTO usuarios (id, email, senha) VALUES (?, ?, ?)",
                [usuario.props.id, usuario.props.email, usuario.props.senha]
            );
        } catch (error) {
            console.log("Erro ao criar usuário: ", error);
            throw error;
        }
    }

    // Listar Usuários
    public async listarUsuarios(): Promise<Usuario[]> {
        try {
            const [resultado] = await pool.query<usuarioProps[] & RowDataPacket[]>(
                "SELECT * FROM usuarios"
            );
            const usuarios: Usuario[] = resultado.map((user) => {
                const { id, email, senha } = user;
                return Usuario.assemble(id, email, senha);
            });
            return usuarios;
        } catch (error) {
            console.log("Erro ao listar usuários: ", error);
            throw error;
        }
    }

    // Buscar Usuário por ID
    public async buscarUsuario(id: string): Promise<Usuario | null> {
        try {
            const [resultado] = await pool.query<(usuarioProps & RowDataPacket)[]>(
                "SELECT * FROM usuarios WHERE id = ?",
                [id]
            );
            if (resultado.length === 0) return null;

            const { id: usuarioId, email, senha } = resultado[0];
            return Usuario.assemble(usuarioId, email, senha);
        } catch (error) {
            console.log("Erro ao buscar usuário: ", error);
            throw error;
        }
    }

    // Editar Usuário
    public async editarUsuario(usuario: usuarioProps) {
        try {
            await pool.query(
                "UPDATE usuarios SET email = ?, senha = ? WHERE id = ?",
                [usuario.email, usuario.senha, usuario.id]
            );
        } catch (error) {
            console.log("Erro ao editar usuário: ", error);
            throw error;
        }
    }

    // Deletar Usuário
    public async deletarUsuario(id: string) {
        try {
            await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        } catch (error) {
            console.log("Erro ao deletar usuário: ", error);
            throw error;
        }
    }
}
