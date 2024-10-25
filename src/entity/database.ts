import { Logger } from '@nestjs/common';
import { dataSource } from './environment';
// import { datasource } from './environment';

export const userDB = `CREATE TABLE IF NOT EXISTS user_details(
                                        username VARCHAR(100) NOT NULL,
                                        useremail varchar(50) CHECK (useremail LIKE '%@%'),
                                        userpassword VARCHAR(100) NOT NULL
                                        )`;

export async function createDataBase() {
  await dataSource.query(userDB);
  Logger.debug('Database Created Successfully');
  return;
}
