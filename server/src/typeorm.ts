import { Connection, createConnection } from 'typeorm';
import { User } from './entity/User';
import { Role } from './entity/Role';
import { Todo } from './entity/Todo';
import { Attachment } from './entity/Attachment';

async function connect(): Promise<Connection> {
    const todo_db = Object.assign({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        cli: {
            migrationsDir: [__dirname + process.env.TYPEORM_MIGRATIONS_DIR],
            entitiesDir: [__dirname + process.env.TYPEORM_ENTITIES_DIR]
        },

        entities: [User, Role, Todo, Attachment],
        migrations: [__dirname + process.env.TYPEORM_MIGRATIONS],
    });

    const connection: Connection = await createConnection(todo_db);
    return connection;
}

export { connect };