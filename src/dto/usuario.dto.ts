export class CriarUsuarioDto {
    public email: string;
    public senha: string;

    constructor(email: string, senha: string) {
        if (!email || !this.validarEmail(email)) {
            throw new Error("E-mail inválido.");
        }
        if (!senha || senha.trim().length < 6) {
            throw new Error("Senha deve ter pelo menos 6 caracteres.");
        }

        this.email = email;
        this.senha = senha;
    }

    //(exemplo@email.com)
    private validarEmail(email: string): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email);
    }
    
}

export class AtualizarUsuarioDto {
    public email?: string;
    public senha?: string;

    constructor(email?: string, senha?: string) {
        if (email && !this.validarEmail(email)) {
            throw new Error("E-mail inválido.");
        }
        if (senha && senha.trim().length < 6) {
            throw new Error("Senha deve ter pelo menos 6 caracteres.");
        }

        this.email = email;
        this.senha = senha;
    }

    //(exemplo@email.com)
    private validarEmail(email: string): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email);
    }    
}
