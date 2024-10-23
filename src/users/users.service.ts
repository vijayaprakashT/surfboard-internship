import { Injectable } from '@nestjs/common';
import {  dbClient } from './database';
import * as bcrypt from 'bcrypt';


export interface userDetails{
    userName : string,
    userPassword : string
}
@Injectable()
export class UsersService {
    
     async addUser(data : userDetails) : Promise <string> {

        try{  

        if(typeof data.userName !== 'string'){
            return 'unexpected username'
        }

        if(typeof data.userPassword !== 'string'){
            return ' unexpected password'
        }
      const hashedPassword = await bcrypt.hash(data.userPassword, 10);
      const user = `INSERT INTO user_details(username , userpassword) VALUES('${data.userName}' , '${hashedPassword}')`
      const signed = await dbClient.query(user);
      console.log("signed in " , signed)

      const check = `SELECT username FROM user_details WHERE username = '${data.userName}'`
      const checked = await dbClient.query(check)
      console.log("======" , checked)

      if(!check){
      return  " already exists ";
      }
     else{
     return 'signed successfully'
     }
     }

    catch(error){
       return 'something went wrong';
    }
 }
    async findOne(userName : string): Promise<userDetails> {
        try {
          const query = `SELECT  username, userpassword FROM user_details WHERE username = '${userName}'`;
          const result = await dbClient.query(query);
    
          if (result.rowCount > 0) {
            return result.rows[0]; //  row contains userId, username, and password
          }
     } 
        catch (error) {
          console.error('Error fetching user:', error);
         }
      }
    }

