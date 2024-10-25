import { DataSource } from 'typeorm';

// export async function datasource() {
//   return await new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 3000,
//     database: 'postgres',
//     username: 'postgres',
//     password: '123',
//   });
// }

export const dataSource = new DataSource ({
  type: 'postgres',
  host: 'localhost',
  port: 3000,
  database: 'postgres',
  username: 'postgres',
  password: '123',
})



