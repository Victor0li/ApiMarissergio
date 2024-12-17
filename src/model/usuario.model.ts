import { Tarefa } from './tarefa.model'; // Importa a classe Tarefa

export type usuarioProps = {
    id: string;
    email: string;
    senha: string;
    tarefas?: Tarefa[]; // As tarefas do usuário  ("?" pq é opcional)
};

export class Usuario {
    private constructor(readonly props: usuarioProps) {}

    // Método estático para criar um novo usuário
    public static build(email: string, senha: string): Usuario {
        if (!email || !senha) {
            throw new Error("Email e senha são obrigatórios");
        }

        const props: usuarioProps = {
            id: crypto.randomUUID().toString(),
            email,
            senha,
            tarefas: [] // Começa sem tarefa associada 
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

    // Método para adicionar uma tarefa ao usuário
    public addTarefa(tarefa: Tarefa): Usuario {
        const tarefasAtualizadas = [...(this.props.tarefas || []), tarefa]; //"..." é um operaddor de espalhamento -> ele vai copiar os elementos recebidos e armazenar em um novo array
        return Usuario.assemble(this.props.id, this.props.email, this.props.senha, tarefasAtualizadas);
    }

    // Método para consultar as tarefas do usuário
    public getTarefas(): Tarefa[] {
        return this.props.tarefas || [];
    }
}
