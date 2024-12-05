export enum StatusTarefa {
    PENDENTE = "pendente",
    EM_ANDAMENTO = "em andamento",
    CONCLUIDA = "concluída"
}

export type tarefaProps = { //Definir a estrutura da tarefa
    id: string;
    titulo: string;
    descricao: string;
    status: StatusTarefa;
}

export class Tarefa { //Exportar a classe ---------------------↴
    private constructor(readonly props: tarefaProps) {} // mas de um jeito que seja imutável
    // Não daria pra fazer um new Tarefa() por exemlo
    
    public static build(titulo: string, descricao: string) { // Método pra criar nova tarefa
        if (!titulo) {
            throw new Error("Título é obrigatório");
        }

        const props: tarefaProps = {
            id: crypto.randomUUID().toString(), // Aqui gera automático o ID 
            titulo,
            descricao,
            status: StatusTarefa.PENDENTE
        }
        return new Tarefa(props)
    }
    
    // Metodo pra consultar dados já existentes 
    public static assemble(id: string, titulo: string, descricao: string, status: StatusTarefa) { 
        const props: tarefaProps = {
            id,
            titulo,
            descricao,
            status
        }
        return new Tarefa(props)
    }
}

