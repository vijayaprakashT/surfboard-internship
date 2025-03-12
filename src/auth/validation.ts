//validation.ts
import { Logger } from "@nestjs/common";
import { getUserNotes, IAddNotes, IDelFolder, IDelNotes, IDelUser,  IGetAll, IGetDetails, IGetFiles, IGetFolder,  IGetFolders,  IGetRecords,  IGetTitle, ILoginDetails, INewFolder,  IPinnedNotes,  IRefId,  IUpdateNotes, IUserDetails, IUserUpdate } from "./interface";
import { TokenService } from "./tokenservice";

export class Validation{
async  signUp(data:IUserDetails): Promise<{ status?: string; message?: string; data?: string;error?: string;}>{
  try{
    if(!data.userName ){
      return{status:'ERROR' , message :'enter the username '}
    }
    if(!data.userEmail ){
      return{status:'ERROR' , message :'enter the user email '}
    }
    if(!data.userRole ){
      return{status:'ERROR' , message :'enter the role '}
    }
    if(!data.userPassword ){
      return{status:'ERROR' , message :'enter the password '}
    }
    return{status:'SUCCESS' , message :'signup validation passed '}

  }
  catch(error){
    return{status :'ERROR' , error :error.message}

  }

}

async login(data:ILoginDetails): Promise<{status?: string;message?: string;data?: string; error?: string;}>{
  try{
  if(!data.userEmail && !data.userPassword){
    return{status :'ERROR' , message :'enter valid credentials to fetch the data' }
  }
  return{status:'SUCCESS' , message :'login validation passed '}

}
catch(error){
  return{status :'ERROR' , error :error.message}
}

}

async addnote(data: IAddNotes): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    if (!data.title || typeof data.title !== 'string') {
      return { status: 'ERROR', message: 'Enter the title to add' };
    }
    
    if (!data.description || typeof data.description !== 'string') {
      return { status: 'ERROR', message: 'Enter the description to add' };
    }

    if (data.folderName && typeof data.folderName !== 'string') {
      return { status: 'ERROR', message: 'Folder name should be a string if provided' };
    }

    if (data.pin && data.pin !== 'pin') {
      return { status: 'ERROR', message: 'Choose the correct pin option if provided' };
    }

    return { status: 'SUCCESS', message: 'Addnote validation passed' };
  } catch (error) {
    return { status: 'ERROR', error: error.message };
  }
}

async getNote(data:IGetTitle): Promise<{ status?: string; message?: string; data?: string; error?: string;}>{
  try{
    if(!data.noteTitle){
      return{status :'ERROR' , message :'enter the title to fetch the data'}
    }
    return{status:'SUCCESS' , message :'get title validation passed'}


  }
  catch(error){
    return{status:'ERROR' , error :error.message}
  }

}

async getUserNotes(data : getUserNotes, token: string): Promise<{ status?: string; message?: string; data?: string; error?: string }> {
  try {
    console.log('filter' , data.filter , data.page)
    if (!data.filter || !data.page) {
      return { status: 'ERROR', message: 'Filter type or page number not mentioned' };
    }

    if (data.filter !== 'asc' && data.filter !== 'desc') {
      return { status: 'ERROR', message: 'Invalid filter type, must be "asc" or "desc"' };
    }

    if (data.page <= 0) {
      return { status: 'ERROR', message: 'Invalid page number, must be greater than 0' };
    }

    const tokenValidation = await new TokenService().accessWithTokens(token);
    if (tokenValidation.status !== 'SUCCESS') {
      return { status: 'ERROR', message: 'Invalid token', error: tokenValidation.err };
    }

    return { status: 'SUCCESS', message: 'User notes validation passed' };

  } catch (error) {
    return { status: 'ERROR', error: error.message };
  }
}

async getRefId(data : IRefId , token : string): Promise<{ status?: string; message?: string; data?: string; error?: string;}>{
  try{
   if(!data.userId ){
    return{status:'ERROR' , message :'enter the id to fetch the data'}
   }

  
  const tokenValidation = await new TokenService().accessWithTokens(token);
  if (tokenValidation.status !== 'SUCCESS') {
    return { status: 'ERROR', message: 'Invalid token', error: tokenValidation.err };
  }


  return { status: 'SUCCESS', message: 'get with userid  validation passed' };

  }
  catch(error){
    return{status:'ERROR' , error:error.message}

  }

}

async getUserDetail(data :IGetDetails): Promise<{status?: string; message?: string; data?: string; error?: string;}>{
  try{
    if(!data.userEmail && data.userPassword){
      return{status:'ERROR' , message :'enter the valid credentials to fetch the data'}

    }
    return{status:'SUCCESS' , message :'get detail validation passed '}

  }
catch(error){
  return{status:'ERROR' , error:error.message}

}

}

async getAllUsers(filter : string , data:IGetAll): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
    if(!filter && typeof data.page !== 'number'){
      return{status:'ERROR' , message :'enter the details to get the data'}
    }
    return{status:'SUCCESS' , message :'get all validation passed '}

  }
  catch(error){
    return{status:'ERROR' , error : error.message}
  }

}

async userUpdate(data:IUserUpdate): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
    
    if(data.userEmail && !data.userEmail){
      return{status:'ERROR' , message :'enter the mail id '}
    }
  
  
    if(data.userName && !data.userName){
      return{status:'ERROR' , message :'enter the username '}

    }
  
   
    if(data.userRole && !data.userRole){
      return{status:'ERROR' , message :'enter the user role '}

    }
    return{status:'SUCCESS' , message :'user update validation passed '}

  }
catch(error){
  return{status:'ERROR' , error:error.message}
}
}

async delUser(data:IDelUser): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
    if(!data.userEmail && !data.userPassword){
      return{status:'ERROR' , message :'enter the valid credentails to delete the data'}
    }
    return{status:'SUCCESS' , message :'delete user validation passed '}

  }
  catch(error){
  return{status:'ERROR' , error:error.message}
}
}

async pinnedNotes(data: IPinnedNotes): Promise<{ status?: string; message?: string; data?: string; error?: string; }> {
  try {
    console.log('started', data.title, data.folderName);

    if (!data.title && !data.folderName) {
      return { status: 'ERROR', message: 'Enter the title or folder to get pinned details' };
    }

    if (data.title && !data.folderName) {
      return { status: 'SUCCESS', message: 'Pinned notes validation passed with title' };
    }

    if (data.title && data.folderName) {
      return { status: 'SUCCESS', message: 'Pinned notes validation passed with title and folder' };
    }

    if (!data.title && data.folderName) {
      return { status: 'ERROR', message: 'Enter the title to get pinned details' };
    }

  } catch (error) {
    return { status: 'ERROR', error: error.message };
  }
}

async createFolder(data:INewFolder): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
  if(!data.folderName){
    return{status:'ERROR' ,message :'enter the foldername'}
  }
  if(!data.title){
    return{status:'ERROR' ,message :'enter the title'}
  }
  
  return{status:'SUCCESS' , message :'add folder validation passed '}

}
  catch(error){
    return{status:'ERROR' ,error : error.message}

  }
}

async delNote(data:IDelNotes): Promise<{status?: string;message?: string; data?: string; error?: string;}>{
  try{
    if(!data.title){
      return{status:'ERROR' , message :'enter the title to delete notes'}
    }
    return{status:'SUCCESS' , message :'del note validation passed '}


  }
  catch(error){
    return{status:'ERROR' , error:error.message}

  }

}

async getFolder(data: IGetFolder , token : string): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
    if(!data.filter){
      return{status:'ERROR' , message :'enter the foldername to fetch the folder'}
    }
    if(!data.page){
      return{status:'ERROR' , message :'enter the title to fetch the folder details'}

    }

    const tokenValidation = await new TokenService().accessWithTokens(token);
    if (tokenValidation.status !== 'SUCCESS') {
      return { status: 'ERROR', message: 'Invalid token', error: tokenValidation.err };
    }

  return{status:'SUCCESS' , message :'get folder validation passed '}

  }
  catch(error){
    return{status:'ERROR' , error:error.message}

  }

}

async getAllFolder(data : IGetFolders , token : string): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
    if(!data.filter){
      return{status:'ERROR' , message :'enter the foldername to fetch the folder'}
    }
    if(!data.pageSet){
      return{status:'ERROR' , message :'enter the title to fetch the folder details'}

    }

    const tokenValidation = await new TokenService().accessWithTokens(token);
    if (tokenValidation.status !== 'SUCCESS') {
      return { status: 'ERROR', message: 'Invalid token', error: tokenValidation.err };
    }

  return{status:'SUCCESS' , message :'get folder validation passed '}

  }
  catch(error){
    return{status:'ERROR' , error:error.message}

  }



}

async getFolderTitle(data:IGetFiles ,  token : string): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
    if(!data.folderName){
      return{status:'ERROR' , message :'enter the foldername to fetch the folder'}
    }

    if(!data.filter){
      return{status:'ERROR' , message :'enter the filter to get in order '}
    }

    if(!data.title){
      return{status:'ERROR' , message :'enter the title to fetch the folder details'}
    }

    
    const tokenValidation = await new TokenService().accessWithTokens(token);
    if (tokenValidation.status !== 'SUCCESS') {
      return { status: 'ERROR', message: 'Invalid token', error: tokenValidation.err };
    }

  return{status:'SUCCESS' , message :'get folder validation passed '}

  }
  catch(error){
    return{status:'ERROR' , error:error.message}

  }


}

async delFolder(data:IDelFolder): Promise<{status?: string;message?: string;data?: string;error?: string;}>{
  try{
    if(!data.folderName ){
      return{status:'ERROR' , message :'enter the foldername'}
    }
    if(!data.title ){
      return{status:'ERROR' , message :'enter the title'}
    }

    if(data.setDays < 0){
      return{status:'ERROR' , message :'enter the days delete peramanently'}
    }
    return{status:'SUCCESS' , message :'delete folder validation passed '}

  }
  catch(error){
    return{status:'ERROR' , error :error.message}

  }

}


async updateNote(data: IUpdateNotes): Promise<{ status: string; message?: string; error?: string }> {
  try {
    if (data.title && (typeof data.title !== 'string' || !data.title.trim())) {
      return { status: 'ERROR', message: 'Enter the title to update' };
    }

    if (data.description && (typeof data.description !== 'string' || !data.description.trim())) {
      return { status: 'ERROR', message: 'Enter the description to update' };
    }

    if (data.pin && (typeof data.pin !== 'string' || data.pin !== 'pin')) {
      return { status: 'ERROR', message: 'Invalid pin value. Expected value: "pin"' };
    }

    return { status: 'SUCCESS', message: 'Update note validation passed' };
  } catch (error) {
    return { status: 'ERROR', error: error.message };
  }
}


async oldRecord(data :IGetRecords): Promise<{status: string; message?: string;data?: string;error?: string;}>{
  try{
     if(!data.setTime){
      return{status :'ERROR' , message :'enter the valid number to fetch old records '}
     }
  }
  catch(error){
    Logger.error('error in old records ' , error )
    return{status :'ERROR' , message : 'something went wrong'}
  }

}

}


