import { DataSource } from 'typeorm';


export const dataSource = new DataSource ({
  type: 'postgres',
  host: 'localhost',
  port: 3000,
  database: 'postgres',
  username: 'postgres',
  password: '123',
})
export const jwtConstants = {                                                                   
  secret: 'SECRET KEY TO VERIFY',
};



