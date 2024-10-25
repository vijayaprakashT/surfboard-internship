import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { dataSource } from 'entity/environment';



@Injectable()
export class AuthService {
  // private users = [];
  // this.users.push(userData);
  
  async signup(userData: { userName: string; userEmail: string; userPassword: string }) {
    try {
      if (typeof userData.userName !== 'string') {
        return { message: 'Entered name is not applicable' };
      }
      if (typeof userData.userEmail !== 'string') {
        return { message: 'Email is not applicable' };
      }
      if (typeof userData.userPassword !== 'string') {
        return { message: 'Try another password' };
      }
  
      const existingUserQuery = `SELECT userEmail FROM user_details WHERE userEmail = '${userData.userEmail}'`;
      const existingUser = await dataSource.query(existingUserQuery);
      
      if (existingUser.length > 0) {
        return { message: 'User detail already exists in the database' };
      }
  
      const password = await bcrypt.hash(userData.userPassword, 10);
      const newUserQuery = `INSERT INTO user_details(username, userEmail, userPassword) VALUES ('${userData.userName}', '${userData.userEmail}', '${password}')`;
      await dataSource.query(newUserQuery); // Await this to ensure user is added to the DB.
  
      console.log("Signed up successfully");
      return { message: 'Signed up successfully', user: userData };
    } catch (error) {
      return { message: 'Something went wrong', error };
    }
  }
  
  async login(userData: { userEmail: string ,userPassword :string}) {

  try{
   

    const getUser =`SELECT * FROM user_details WHERE useremail ='${userData.userEmail}'`
    const get = await dataSource.query(getUser)
    console.log("query" , get)

    if(userData.userEmail !==  get.useremail){
      return {  message: 'invalid mail id ' };
   }
    
   if(!get){
      return {  message: 'user not found' };
 }
    
    const passwordValid = await bcrypt.compare(userData.userPassword, get.password);
    if (!passwordValid){
      return {  message: 'invalid password' };
    }
    
    if(passwordValid){
      console.log("logged successfully")
      return {  message: 'Logged in successfully',  user: get };
    }

  }catch(error){
     return { message: 'Login failed', error: 'User not found'  , err: error};
  }
}
}