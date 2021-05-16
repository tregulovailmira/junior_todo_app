import { Connection, createConnection } from 'typeorm';

async function connect(): Promise<Connection> {
    const todo_db = Object.assign({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [__dirname + '/entity/*.ts']
    });

    const connection: Connection = await createConnection(todo_db);
    return connection;
}

export { connect };