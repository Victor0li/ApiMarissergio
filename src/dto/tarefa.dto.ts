import { StatusTarefa } from "../model/tarefa.model";

export class CriarTarefaDto {
    public titulo: string;
    public descricao: string;
    public id_usuario: string; // Agora exigido para criar a tarefa

    constructor(titulo: string, descricao: string, id_usuario: string) {
        if (!titulo) {
            throw new Error("Título é obrigatório.");
        }
        if (!descricao) {
            throw new Error("Descrição é obrigatória.");
        }
        if (!id_usuario) {
            throw new Error("ID do usuário é obrigatório.");
        }

        this.titulo = titulo;
        this.descricao = descricao;
        this.id_usuario = id_usuario; // Atribui o ID do usuário
    }
}

export class AtualizarTarefaDto {
    public titulo?: string;
    public descricao?: string;
    public status?: StatusTarefa;

    constructor(titulo?: string, descricao?: string, status?: StatusTarefa) {
        if (titulo && titulo.trim().length === 0) {
            throw new Error("Título inválido.");
        }

        if (descricao && descricao.trim().length === 0) {
            throw new Error("Descrição inválida.");
        }

        if (status && !Object.values(StatusTarefa).includes(status)) {
            throw new Error("Status inválido.");
        }

        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
    }
}
