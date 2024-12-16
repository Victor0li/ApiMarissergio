import { Router, Request, Response } from 'express';
import { UsuarioController } from '../controller/usuario.controller';
import { UsuarioDao } from '../dao/usuario.dao';

const router = Router();
const usuarioDao = new UsuarioDao();
const usuarioController = new UsuarioController(usuarioDao);

// Rota para criar usuário
router.post('/usuarios', (req: Request, res: Response) => {
    usuarioController.criarUsuario(req, res);
});

// Rota para listar todos os usuários
router.get('/usuarios', (req: Request, res: Response) => {
    usuarioController.listarUsuarios(req, res);
});

// Rota para buscar usuário por ID
router.get('/usuarios/:id', (req: Request, res: Response) => {
    usuarioController.buscarUsuario(req, res);
});

// Rota para editar usuário
router.put('/usuarios/:id', (req: Request, res: Response) => {
    usuarioController.editarUsuario(req, res);
});

// Rota para deletar usuário
router.delete('/usuarios/:id', (req: Request, res: Response) => {
    usuarioController.deletarUsuario(req, res);
});

export default router;