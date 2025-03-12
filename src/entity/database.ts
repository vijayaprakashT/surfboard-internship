import { Logger } from '@nestjs/common';
import { dataSource } from './environment';


export const userDB = `CREATE TABLE IF NOT EXISTS user_details(
                                        user_id VARCHAR(100) PRIMARY KEY, 
                                        user_name VARCHAR(100) NOT NULL,
                                        user_email varchar(50) NOT NULL CHECK (user_email LIKE '%@%'),
                                        user_role varchar(50)  NOT NULL,
                                        user_password VARCHAR(100) NOT NULL,
                                        is_deleted BOOLEAN NOT NULL DEFAULT false
                                        )`;

export const notes =`CREATE TABLE IF NOT EXISTS note_app(
                                        user_id VARCHAR(100) PRIMARY KEY,
                                        title VARCHAR(100),
                                        description VARCHAR(100),
                                        folder VARCHAR(100) NULL ,
                                        date TIMESTAMP,
                                        pinned_file BOOLEAN NOT NULL DEFAULT false,
                                        note_deleted BOOLEAN NOT NULL DEFAULT false,
                                        deleted_date TIMESTAMP 
)`

export async function createDataBase() {

  await dataSource.query(userDB);
  await dataSource.query(notes);
  Logger.debug('Database Created Successfully');
  return;
}


// export const folder = `CREATE TABLE IF NOT EXISTS  folder(
//   folder_name varchar(500),
//   ref_id VARCHAR(300) PRIMARY KEY,
//   file_title varchar(300),
//   file_description varchar(300),
//   file_date TIMESTAMP,
//   folder_file_pinned BOOLEAN NOT NULL DEFAULT false,
//   folder_file_deleted BOOLEAN NOT NULL DEFAULT false,
//   deleted_date TIMESTAMP
// )`

// export const recentDel= `CREATE TABLE IF NOT EXISTS recent_delete(
//   ref_id VARCHAR(300) PRIMARY KEY,
//   deleted_foldername VARCHAR(300) NULL,
//   deleted_titleName VARCHAR(300),
//   deleted_at TIMESTAMP,
//   set_daysto_delete  VARCHAR(300),
//   is_deleted BOOLEAN NOT NULL DEFAULT false
// )`


