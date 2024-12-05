import mysql2, { Pool } from "mysql2/promise";

// Configurações do banco de dados
const pool: Pool = mysql2.createPool({
    host: 'localhost', 
    user: 'root',   
    password: 'lab1',
    database: 'listadetarefas',
});

export default pool;