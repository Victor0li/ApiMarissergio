export enum StatusTarefa {
    PENDENTE = "pendente",
    EM_ANDAMENTO = "em andamento",
    CONCLUIDA = "concluída"
}

export type tarefaProps = { // Definir a estrutura da tarefa
    id: string;
    titulo: string;
    descricao: string;
    status: StatusTarefa;
    id_usuario: string; // Associado a um usuário existente
}

export class Tarefa { // Exportar a classe
    private constructor(readonly props: tarefaProps) {} // Imutável
    
    // Método para criar uma nova tarefa
    public static build(titulo: string, descricao: string, id_usuario: string): Tarefa {
        if (!titulo || !id_usuario) {
            throw new Error("Título e ID do usuário são obrigatórios");
        }

        const props: tarefaProps = {
            id: crypto.randomUUID().toString(), // Gera automaticamente o ID da tarefa
            titulo,
            descricao,
            status: StatusTarefa.PENDENTE,
            id_usuario // Associado ao usuário fornecido
        };
        return new Tarefa(props);
    }
    
    // Método para consultar dados já existentes
    public static assemble(id: string, titulo: string, descricao: string, status: StatusTarefa, id_usuario: string): Tarefa {
        const props: tarefaProps = {
            id,
            titulo,
            descricao,
            status,
            id_usuario
        };
        return new Tarefa(props);
    }
}