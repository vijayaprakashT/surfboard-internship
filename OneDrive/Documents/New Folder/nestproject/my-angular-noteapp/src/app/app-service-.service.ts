import { Injectable } from '@angular/core';
import {
  getUserNotes,
  IAddNotes,
  IDelNotes,
  IGetDetails,
  IGetTitle,
  ILoginDetails,
  IUpdateNotes,
  IUserDetails,
} from './interface';
import axios from 'axios';

@Injectable({providedIn: 'root'})

export class ApiService {
  private apiUrl: string = 'http://localhost:5000/auth';

  constructor() {}

async signUp(data: IUserDetails){
    try {
      const response = await axios.post(`${this.apiUrl}/signup`, data);
      console.log('logged successfully', response);
      return response.data; 
    } catch (error) {
      console.error('Something went wrong during login', error);
      throw error; 
    }
  }

  
async login(login: ILoginDetails): Promise<{ data: { token: string } }> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, login);
      console.log('logged successfully', response);
      return response.data; 
    } catch (error) {
      console.error('Something went wrong during login', error);
      throw error; 
    }
  }
  

async addNotes(data: IAddNotes): Promise<{data :{token:string , page : number}}> {
    try {
      const token = localStorage.getItem('token')
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/addnotes',
        data: data,
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      console.log('Add Notes Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in addNotes:', error);
      throw error;
    }
  }
  

async getUserAllNotes() {
    try {
      const token = localStorage.getItem('token')
      const data ={
        filter :'asc'
        ,page :1
      }
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/usernote',
        data: data,
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      console.log('getuser all Notes Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in addNotes:', error);
      throw error;
    }
  }

   
async getUserNote(data: IGetTitle): Promise<{data :{token:string}}> {
    try {
      const token= localStorage.getItem('token')
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/getnotes',
        data: data,
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      console.log('getuser  Note Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in addNotes:', error);
      throw error;
    }
  }

async updateNote(userData : IUpdateNotes) {
    try {
      const token= localStorage.getItem('token')

      const data ={
        pin: "pin",
        title:"magnum notes",
        description :"magnum"
      }
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/updatenote',
        data: data,
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      console.log(' update Note Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in updatenotes:', error);
      throw error;
    }
  
  }


async deleteNote(userData : IDelNotes){
    try {
      const token= localStorage.getItem('token')

      const data = {
        title: "mager"
      };
       const response = await axios({
         method: 'DELETE',
         url: 'http://localhost:5000/auth/delnote',
         data: data,
         headers: {
           Authorization: `Bearer ${token}` 
         }
       });
    
       console.log(' update Note Response:', response.data);
       return response.data;
    } catch (error) {
       console.error('Error in updatenotes:', error);
       throw error;
      } 


  


}


async getUser(userData?: any ) {
    try {
      const token= localStorage.getItem('token')
      const data ={
        userEmail: "dexith@gmail.com",
	      userPassword: "dexith@015"
      }
      const response = await axios({
         method: 'GET',
         url: 'http://localhost:5000/auth/getdetails',
         data: data,
         headers: {
           Authorization: `Bearer ${token}` 
         }
       });
    
       console.log(' get user details Response:', response.data);
       return response.data;
    } catch (error) {
       console.error('Error in get user:', error);
       throw error;
      }
}

async delUser(){
  try {
    const token= localStorage.getItem('token')
    const data ={
      userEmail: "denver@gmail.com",
      userPassword: "denver@123"
    }
    const response = await axios({
       method: 'DELETE',
       url: 'http://localhost:5000/auth/deleteuser',
       data: data,
       headers: {
         Authorization: `Bearer ${token}` 
       }
     });
  
     console.log(' delete user details Response:', response.data);
     return response.data;
  } catch (error) {
     console.error('Error in deleting user:', error);
     throw error;
    }

}


async updateDetails(){
  try {
    const token= localStorage.getItem('token')
    const data ={
      userEmail: "denver@gmail.com",
      userPassword: "denver@123"
    }
    const response = await axios({
       method: 'PATCH',
       url: 'http://localhost:5000/auth/deleteuser',
       data: data,
       headers: {
         Authorization: `Bearer ${token}` 
       }
     });
  
     console.log(' update user details Response:', response.data);
     return response.data;
  } catch (error) {
     console.error('Error in updating user:', error);
     throw error;
    }
}



async showFolder(){
  try {
    const token= localStorage.getItem('token')
    const data ={
      filter : "ASC",
      pageSet : 1
    }
    const response = await axios({
       method: 'POST',
       url: 'http://localhost:5000/auth/allfolders',
       data: data,
       headers: {
         Authorization: `Bearer ${token}` 
       }
     });
  
     console.log('  all folder Response:', response.data);
     return response.data;
  } catch (error) {
     console.error('Error in fetching folder:', error);
     throw error;
    }
}


}
