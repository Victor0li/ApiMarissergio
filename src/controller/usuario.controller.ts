import { Request, Response } from "express";
import { Usuario, usuarioProps } from "../model/usuario.model";
import { UsuarioDao } from "../dao/usuario.dao";

export class UsuarioController {
    public constructor(readonly usuarioDao: UsuarioDao) {} // Recebe o DAO que acessa o banco

    // Criar Usuário
    public async criarUsuario(req: Request, res: Response) {
        const { email, senha } = req.body;
        try {
            const usuario: Usuario = Usuario.build(email, senha);
            await this.usuarioDao.criarUsuario(usuario);
            res.status(201).send({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao criar usuário", error });
        }
    }

    // Listar Usuários
    public async listarUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await this.usuarioDao.listarUsuarios();
            res.status(200).json({ usuarios }).send();
        } catch (error) {
            res.status(500).send({ message: "Erro ao listar usuários", error });
        }
    }

    // Buscar Usuário por ID
    public async buscarUsuario(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const usuario = await this.usuarioDao.buscarUsuario(id);
            if (!usuario) {
                return res.status(404).send({ message: "Usuário não encontrado" });
            }
            res.status(200).json({ usuario }).send();
        } catch (error) {
            res.status(500).send({ message: "Erro ao buscar usuário", error });
        }
    }

    // Editar Usuário
    public async editarUsuario(req: Request, res: Response) {
        const id = req.params.id;
        const { email, senha } = req.body;
        try {
            const usuario = Usuario.assemble(id, email, senha);
            await this.usuarioDao.editarUsuario(usuario.props);
            res.status(200).send({ message: "Usuário editado com sucesso!" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao editar usuário", error });
        }
    }

    // Deletar Usuário
    public async deletarUsuario(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.usuarioDao.deletarUsuario(id);
            res.status(200).send({ message: "Usuário deletado com sucesso!" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao deletar usuário", error });
        }
    }
}
