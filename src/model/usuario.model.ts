export type usuarioProps = {
    id: string;
    email: string;
    senha: string;
    tarefas?: Tarefa[];
};

import { Tarefa } from './tarefa.model'; // Importa a classe Tarefa

export class Usuario {
    private constructor(readonly props: usuarioProps) {}

    // Método estático para criar um novo usuário
    public static build(email: string, senha: string): Usuario {
        if (!email || !senha) {
            throw new Error("Email e senha são obrigatórios");
        }

        const props: usuarioProps = {
            id: crypto.randomUUID().toString(), // Gera um ID único
            email,
            senha,
            tarefas: [] // Inicialmente sem tarefas
        };
        return new Usuario(props);
    }

    public static assemble(id: string, email: string, senha: string, tarefas?: Tarefa[]): Usuario {
        const props: usuarioProps = {
            id,
            email,
            senha,
            tarefas: tarefas || []
        };
        return new Usuario(props);
    }

    public addTarefa(tarefa: Tarefa): Usuario {
        const tarefasAtualizadas = [...(this.props.tarefas || []), tarefa];
        return Usuario.assemble(this.props.id, this.props.email, this.props.senha, tarefasAtualizadas);
    }

    public getTarefas(): Tarefa[] {
        return this.props.tarefas || [];
    }
}
