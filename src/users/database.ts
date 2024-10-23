import { Client } from 'pg';

const dbClient = new Client({
    host: 'localhost',
    port: 3000,
    user: 'postgres',
    password: '123',
    database: 'postgres',
});

async function connectDb() :  Promise<string> {
    const db = await dbClient.connect();

    const result = await dbClient.query(
        `CREATE TABLE IF NOT EXISTS user_details(
         username VARCHAR(100) NOT NULL,
         userpassword VARCHAR(100) NOT NULL
        )`
    );
    return 'userDetails table created successfully' 
}
export { connectDb, dbClient };