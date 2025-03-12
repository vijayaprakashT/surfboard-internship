import { Logger } from "@nestjs/common";
import axios from "axios";


export class Validation {
  constructor() {}

  async signup(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
    try {
      
      const data = {
        userName: 'vijay',
        userRole: 'employee',
        userEmail: 'vijay@gmail.com',
        userPassword: 'vijay@12345',
      };
  
        const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/signup',
        data: data,
      });
  
      Logger.debug('Signup response:', response.data); 

       if (
        response.data.userName !== data.userName ||
        response.data.userRole !== data.userRole ||
        response.data.userEmail !== data.userEmail ||
        response.data.userPassword !== data.userPassword) {
        return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
      }
  
      return {
        status: 'SUCCESS',
        message: 'Signed up successfully',
        data: response.data, 
      };
    } catch (error) {
     
      return {
        status: 'ERROR',
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }
  

  async login(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
    try {
      const data = {
        userEmail: 'vijay@gmail.com',
        userPassword: 'vijay@12345',
      };

      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/auth/login',
        data: data,
      });

      Logger.debug('Login response:', response.data);

      if ( response.data.userEmail !== data.userEmail || response.data.userPassword !== data.userPassword) {
        return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
      }

      return {
        status: 'SUCCESS',
        message: 'Logged in successfully',
        data: response.data,
      };
    } catch (error) {
      Logger.error('Login error:', error.message);
      return {
        status: 'ERROR',
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

  // async validateToken(): Promise<{ status?: string; message?: string; data?:string; error?: string }> {
  //   try {
  //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs"
  //     const response = await axios({
  //       method: 'POST',
  //       url: 'http://localhost:5000/auth/getWithTokens',
  //       headers: {
  //           Authorization: `Bearer ${token}`
  //       }    
  //    });
  //    Logger.debug('Token validation response:', response.data);
      
  //    if(response.data.status !=='SUCCESS'){
  //     return{status :'ERROR' , message :'enter the valid token '}
  //   }

  //     return {
  //       status: 'SUCCESS',
  //       message: 'Valid token',
  //       data: response.data,
  //     };
  //   } catch (error) {
  //     Logger.error('Token validation error:', error.message);
  //     return {
  //       status: 'ERROR',
  //       message: 'Something went wrong',
  //       error: error.message,
  //     };
  //   }
  // }

  async addNote(): Promise<{ status?: string; message?: string; data?:string; error?: string }> {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
      
        const data = {
            title: "minar school meeting",
            description: "location-chennai , meeting time - 1hr place : taj palace",
            folderName :"minar folder" ,
            pin :"pin"
        };

         const response = await axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/addnotes',
            data: data,
            headers: {
                Authorization: `Bearer ${token}`  
            }
        });

        Logger.debug('add notes response ' , response.data)
        if (
          response.data.title !== data.title ||
          response.data.description !== data.description || response.data.folderName !== data.folderName
        || response.data.pin !== data.pin) {
          return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
        }

        return {
            status: 'SUCCESS',
            message: 'Notes added successfully',
            data: response.data,
        };
    } catch (error) {
        Logger.error('Add notes error:', error.message);
        return {
            status: 'ERROR',
            message: 'Something went wrong',
            error: error.message,
        };
    }
}


async getNote(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
      const data = { 
        noteTitle: "minar school meeting"
      };

      const response = await axios({
          method: 'GET',
          url: 'http://localhost:5000/auth/getWithTitle',
          data: data, 
          headers: {
            Authorization: `Bearer ${token}`
          }
      });

      Logger.debug('Received response data:', response.data);

      if (response.data.noteTitle !== data.noteTitle) {
          return { 
              status: 'ERROR', 
              message: 'Data mismatch: Sent data and response data are not the same.' 
          };
      }

      return {
          status: 'SUCCESS',
          message: 'Notes found successfully',
          data: response.data,
      };

  } catch (error) {
      Logger.error('Title error:', error.message);
      return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message,
      };
  }
}


 async userNote(filter, page): Promise<{ status?: string; message?: string; data?:string; error?: string }>{
    try{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs"
        const data ={
            filter,page 
        }
           const response = await axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/usernote',
            data : data,
            headers: {
            Authorization: `Bearer ${token}`
          } 

          });
          Logger.debug('usernote response:', response.data);

          if (
            response.data.filter !== data.filter || response.data.page !== data.page) {
            return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
          }

          return {
            status: 'SUCCESS',
            message: 'user found successfully',
            data: response.data,
          };
          

    }
    catch(error){
        Logger.error('user notes error:', error.message);
        return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message,
        };

    }
}

async getRefid(): Promise<{ status?: string; message?: string; data?:string; error?: string }> {
  Logger.debug('getRefid method called'); // Start log

  try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
      const data = { refId: "82b38e5ea842180f" };

      const response = await axios({
          method: 'POST',
          url: 'http://localhost:5000/auth/refid',
          data: data,
          headers: { Authorization: `Bearer ${token}` },
      });

      Logger.debug('Received response data:', response.data); // Log response

      if (response.data.refId !== data.refId) {
          return { status: 'ERROR', message: 'Data mismatch: Sent data and response data are not the same.' };
      }

      return {
          status: 'SUCCESS',
          message: 'User found successfully',
          data: response.data,
      };
  } catch (error) {
      Logger.error('Ref ID error:', error.message); // Log error
      return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message,
      };
  }
}


async getDetail(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0OTA2NjB9.l0c-eg_NaMKOgizOMa2g6WRE6je8IQb3MNlVyyTW-hU"; 
      const data = {
         userEmail: "wikki@gmail.com",
	       userPassword: "wikki@45"
      };

      const userDetailResponse = await axios({
          method: 'GET',
          url: 'http://localhost:5000/auth/getdetails',
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      Logger.debug('User Detail Response Data:', userDetailResponse.data); 

      
      if (userDetailResponse.data.userEmail !== data.userEmail || userDetailResponse.data.userPassword !== data.userPassword) {
          return { status: 'ERROR', message: 'Data mismatch: Sent data and response data are not the same.' };
      }


      
      // const filteredData = {
      //     userId: userData.user_id,
      //     userName: userData.user_name,
      //     userRole: userData.role
      // };

      // if (userData.id !== filteredData.userId || userData.name !==filteredData.userName || userData.role !== filteredData.userRole) {
      //     console.log('Missing fields in response data:', filteredData);
      //     return { status: 'ERROR', message: 'Missing required fields in response data.' };
      // }

      return {
          status: 'SUCCESS',
          message: 'User details retrieved successfully',
          data: userDetailResponse.data
      };

  } catch (error) {
      Logger.error('Get user detail error:', error.message);
      return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message
      };
  }
}


async getAll(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    const data = {
      filter: "ASC",
      page: 1
    };
    console.log(data)

      const response = await axios({
      method: 'GET',
      url: 'http://localhost:5000/auth/getall',
      data: data
    });

    Logger.debug('get all response', response.data)

    if ( response.data.filter !== data.filter && response.data.page !== data.page  ) {
      return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
    }
    
   return {
      status: 'SUCCESS',
      message: 'Valid user detail',
      data: response.data
    };

  } catch (error) {
    Logger.error('get all error:', error.message);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message
    };
  }
}

async userUpdate(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
    const data = {
      userName: "markie",  
    };

    const response = await axios({
      method: 'PATCH',
      url: 'http://localhost:5000/auth/updateuser',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Logger.debug('User update response:', response.data);

    if (response.data.userName !== data.userName) {
      return { status: 'ERROR', message: 'Data mismatch: Sent data and response data are not the same.' };
    }


    return {
      status: 'SUCCESS',
      message: 'Details updated successfully',
      data: response.data,
    };
  } catch (error) {
    Logger.error('User update error:', error);

    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message ,
    };
  }
}



async delUser(): Promise<{ status?: string; message?: string; data?:string; error?: string }>{

    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";

    
        const data = {
         userEmail: "vijay@gmail.com",
	      userPassword: "vijay@12345"  
        };

        
    
        const response = await axios({
          method: 'DELETE',
          url: 'http://localhost:5000/auth/deleteuser',
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Logger.debug('delete user response:', response.data);

        if ( response.data.userEmail !== data.userEmail && response.data.userPassword !== data.userPassword ) {
          return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
        }
    
    
        return {
          status: 'SUCCESS',
          message: 'Details deleted successfully',
          data: response.data,
        };
      } catch (error) {
        Logger.error('User delete error:', error.message);
        return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message,
        };
      }
    }

async delNote(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs"; 
        
        const data = {
          setDays: "30",
          noteTitle: "mahi school meeting",
        };
    
        if (!data.setDays || !data.noteTitle) {
          return { status: 'ERROR', message: 'Enter the existing values for deletion' };
        }
    
        const response = await axios({
          method: 'DELETE',
          url: 'http://localhost:5000/auth/delnote',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: data,
          
        });
        Logger.debug('delete note response:', response.data);

        if (response.data.noteTitle !== data.noteTitle || response.data.setDays !== data.setDays) {
          return { status: 'ERROR', message: 'Data mismatch: Sent data and response data are not the same.' };
        }
    
    
        return {
          status: 'SUCCESS',
          message: 'Notes deleted successfully',
          data: response.data,
        };
      } catch (error) {
        Logger.error('delete notes error:', error.message);
    
        return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message,
        };
      }
    }
    
async notePin(): Promise<{ status?: string; message?: string; data?:string; error?: string }>{
    try {
        
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
        const data = {
        noteTitle:"mina school meeting"
        };

        if(!data.noteTitle ){
          return{status:'ERROR' , message :"enter the title to get pinned"}
        }
    
        const response = await axios({
          method: 'POST',
          url: 'http://localhost:5000/auth/pinnotes',
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if ( response.data.noteTitle !== data.noteTitle ) {
          return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
        }
    
        Logger.debug('note pin response:', response.data);
    
        return {
          status: 'SUCCESS',
          message: 'notes pinned successfully',
          data: response.data,
        };
      } catch (error) {
        Logger.error('note pin error:', error.message);
        return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message,
        };
      }
    }
    

async newFolder(): Promise<{ status?: string; message?: string; data?:string; error?: string }>{
  try {
        
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
     const data = {
    folderName: "mina meeting schedule folder",
	  title: "unde  meet",
	  description: "new project documentation has prepared for upcoming project -surfpay and raising a fund for the company"
    };

      const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/auth/newfolder',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Logger.debug('note pin response:', response.data);

    if ( response.data.folderName !== data.folderName || response.data.title !== data.title || response.data.description !== data.description) {
      return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
    }


    return {
      status: 'SUCCESS',
      message: 'folder added successfully',
      data: response.data,
    };
  } catch (error) {
    Logger.error('add folder error:', error.message);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message,
    };
  }
}
  

async getFolder(): Promise<{ status?: string; message?: string; data?:string; error?: string }>{

    try{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs"
    
        
        const data ={
            filter :"asc",
            page :1
          }
        

        const response = await axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/allfolders',
            data : data,
            headers: {
              Authorization: `Bearer ${token}`
          } 
          });
          Logger.debug('get user folder response ' , response)

          if ( response.data.filter !== data.filter && response.data.page !== data.page ) {
            return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
          }
    
          return {
            status: 'SUCCESS',
            message:' user folder found  successfully',
            data: response.data,
          };
        }
    
    
    catch(error){
        Logger.error(' get user folder  error:', error.message);
        return {
          status: 'ERROR',
          message: 'Something went wrong',
          error: error.message,
        };
    }




}
async getAllFolder(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
 
    const data = {
      filter: "ASC",
      pageSet: 1
    };
      const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/auth/allfiles',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Logger.debug('get all folder files response:', response.data);
    if ( response.data.filter !== data.filter && response.data.pageSet !== data.pageSet ) {
      return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
    }
    

   

    return {
      status: 'SUCCESS',
      message: 'All folder files found',
      data: response.data,
    };

  } catch (error) {
    Logger.error('Error in get all folder files:', error.message);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message,
    };
  }
}

async getAllNotes(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
 
    const data = {
      filter: "ASC",
      pageSet: 1
    };
  
   
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/auth/allnotes',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Logger.debug('get all notes response:', response.data);

    if ( response.data.filter !== data.filter && response.data.pageSet !== data.pageSet ) {
      return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
    }

    

    return {
      status: 'SUCCESS',
      message: 'All notes found',
      data: response.data,
    };

  } catch (error) {
    Logger.error('Error in get all notes:', error.message);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message,
    };
  }
}


async delFolderFile(): Promise<{ status?: string; message?: string; data?:string; error?: string }>{
    
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
    
    const data = {
      folderName: "mark meeting schedule folder",
      title: "business meet",
    };


    
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/auth/deletefolder',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Logger.debug('delete folder response:', response.data);

    if ( response.data.folderName !== data.folderName && response.data.title !== data.title ) {
      return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
    }

   

    return {
      status: 'SUCCESS',
      message: 'folder deleted successfully',
      data: response.data,
    };

  } catch (error) {
    Logger.error('Error in updating folder:', error.message);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message,
    };
  }
}
async updateNote(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
 
   const data = {
      title: "bcbwisnxlmpsd",
    };

      const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/auth/updatenote',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Logger.debug('Update note response:', response.data);

    if ( response.data.title !== data.title  ) {
      return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
    }

   

    return {
      status: 'SUCCESS',
      message: 'Note updated successfully',
      data: response.data,
    };

  } catch (error) {
    Logger.error('Error in updating note:', error.message);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message,
    };
  }
}

async updateFolder(): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ2aWpheUBnbWFpbC5jb20iLCJ1c2VycGFzc3dvcmQiOiIkMmIkMTAkME5BVm03Z2N6c09NNGQ0MVYwMlMuLjVrVDJJQzUveG4wVThaY3BmR2UuaU54Y0tNUGZGNWEiLCJpYXQiOjE3MzE0Nzk1MjF9.wiN0yppjWyqfC1_Vugy6Y88wvhJWCPV4J5qcl6jBWqs";
    
    const data = {
      folderName: "mark meeting schedule folder",
      title: "business meet",
    };

    
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/auth/updatefolder',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Logger.debug('Update folder response:', response.data);
    if ( response.data.folderName !== data.folderName && response.data.title !== data.title ) {
      return { status :'ERROR' , message :'Data mismatch: Sent data and response data are not the same.'}
    }
    
    

    return {
      status: 'SUCCESS',
      message: 'folder updated successfully',
      data: response.data,
    };

  } catch (error) {
    Logger.error('Error in updating folder:', error.message);
    return {
      status: 'ERROR',
      message: 'Something went wrong',
      error: error.message,
    };
  }
}
}
