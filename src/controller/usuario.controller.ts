import { Request, Response } from "express";
import { Usuario } from "../model/usuario.model";
import { UsuarioDao } from "../dao/usuario.dao";
import { CriarUsuarioDto } from "../dto/usuario.dto"; // Importando o DTO de criação

export class UsuarioController {
    public constructor(readonly usuarioDao: UsuarioDao) {}

    // Criar Usuário
    public async criarUsuario(req: Request, res: Response) {
        try {
            // Valida os dados de entrada usando o DTO
            const { email, senha } = new CriarUsuarioDto(
                req.body.email,
                req.body.senha
            );

            const usuario: Usuario = Usuario.build(email, senha);
            await this.usuarioDao.criarUsuario(usuario);
            res.status(201).send({ message: "Usuário criado com sucesso!" });
        } catch (error: any) { 
            res.status(400).send({ message: "Erro ao criar usuário", error: error.message });
        }
    }

    // Listar Usuários
    public async listarUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await this.usuarioDao.listarUsuarios();
            res.status(200).json(usuarios);
        } catch (error: any) { 
            res.status(500).send({ message: "Erro ao listar usuários", error: error.message });
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
            res.status(200).json(usuario);
        } catch (error: any) { 
            res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
        }
    }

    // Editar Usuário
    public async editarUsuario(req: Request, res: Response) {
        const id = req.params.id;
        const { email, senha } = req.body;
        try {
            // Valida os dados de entrada usando o DTO
            const usuario = new CriarUsuarioDto(email, senha); // Usando o mesmo DTO para validação
            const usuarioAtualizado = Usuario.assemble(id, usuario.email, usuario.senha);
            await this.usuarioDao.editarUsuario(usuarioAtualizado.props);
            res.status(200).send({ message: "Usuário editado com sucesso!" });
        } catch (error: any) { 
            res.status(400).send({ message: "Erro ao editar usuário", error: error.message });
        }
    }

    // Deletar Usuário
    public async deletarUsuario(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.usuarioDao.deletarUsuario(id);
            res.status(204).send(); 
        } catch (error: any) { 
            res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
        }
    }
}