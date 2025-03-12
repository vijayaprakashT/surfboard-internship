  // auth.controller.ts
  import {
    Controller,
    Post,
    Body,
    Get,
    Headers,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import {
    getUserNotes,
    IAddNotes,
    IDelNotes,
    IDelUser,
    IGetAll,
    IGetDetails,
    IGetFiles,
    IGetFolder,
    IGetFolders,
    IGetRecords,
    IGetTitle,
    ILoginDetails,
    INewFolder,
    IPinnedNotes,
    IRefId,
    IUpdateNotes,
    IUserDetails,
    IUserUpdate,
  } from './interface';
  import { Logger } from '@nestjs/common';
  import { Validation } from './validation';  

  @Controller('auth')
  export class AuthController {
    
    constructor(private readonly authService: AuthService) {}

@Post('/signup')
async signup(@Body() data: IUserDetails) {
  Logger.debug('data signup:', data);
    try {
    const validation = await new Validation().signUp(data);
    if (validation.status === 'ERROR') {
          return validation; 
        }
    const res = await this.authService.signup(data);
    console.log("Signed up successfully:", res);
    return res; 
  } catch (error) {
    Logger.error('Error during signup:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during signup. Please try again later.' 
    }; 
      }
    }
    

@Post('/login')
async login(@Body() data: ILoginDetails) {
    Logger.debug('data login:', data);
    try{
    const valid = new Validation()
    const validation = await valid.login(data)
    if (validation.status === 'ERROR') {
      return validation;
    }
    return this.authService.login(data);
  }
  catch(error){
    Logger.error('Error during login:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during login. Please try again later.' 
    };
  }
  }


@Post('/addnotes')
async addNotes(@Body() data: IAddNotes, @Headers('authorization') token: string) {
    Logger.debug('notes added :', data);
  try{
    const valid = new Validation()
      const validation = await valid.addnote(data)
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.addNotes(data, token);
  }
  catch(error){
    Logger.error('Error during add notes:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during add notes. Please try again later.' 
    };
  }
}

@Post('/usernote')
async getUserNotes(@Body()   data : getUserNotes ,  @Headers('authorization') token: string) {
    Logger.debug('get user notes found');
  try{
    const valid = new Validation()
      const validation = await valid.getUserNotes( data,token  )
      if (validation.status === 'ERROR') {
        return validation;
      }
    
    return this.authService.getUserNotes(data, token );
  }
catch(error){
  Logger.error('Error during get user notes:', error); 
  return { 
    status: 'ERROR', 
    message: 'An error occurred during get user notes. Please try again later.' 
  };
}
  }

@Get('/getnotes')
async getNotes( @Body() data: IGetTitle, @Headers('authorization') token: string,) {
    Logger.debug('get notes', data);
    try{
    const valid = new Validation()
      const validation = await valid.getNote(data)
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.getNote(data, token);
  }
  catch(error){
    Logger.error('Error during get  notes:', error); 
  return { 
    status: 'ERROR', 
    message: 'An error occurred during get  notes. Please try again later.' 
  };
  }
}

@Post('/refid')
async getWithRefid(@Body() data: IRefId, @Headers('authorization') token: string) {
    Logger.debug('user id exist', data);
    try{
    const valid = new Validation()
      const validation = await valid.getRefId(data , token )
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.getWithRefid(data, token);
  }
  catch(error){
    Logger.error('Error during refId:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during userId. Please try again later.' 
    };
  }
}

@Get('/getdetails')
async getUserDetails(@Body() data: IGetDetails,@Headers('authorization') token: string,) {
    Logger.debug('get details found', data);
    try{
    const valid = new Validation()
      const validation = await valid.getUserDetail(data)
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.getUserDetails(data, token);
  }
  catch(error){
    Logger.error('Error during get details:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during get details. Please try again later.' 
    };
  }
}

@Get('/getall')
async getAllUser(@Body() data: IGetAll ,filter: string) {
    Logger.debug('get all user details retreived ');
    try{
    const valid = new Validation()
      const validation = await valid.getAllUsers(  filter , data)
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.getAllUser(data, filter);
  }
  catch(error){
    Logger.error('Error during get all user details:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during getall user details. Please try again later.' 
    };
  }
}

@Patch('/updateuser')
async userUpdate(  @Body() data: IUserUpdate, @Headers('authorization') token: string,) {
    Logger.debug('update user details', data);
    try{
    const valid = new Validation()
      const validation = await valid.userUpdate(data)
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.userUpdate(data, token);
  }
  catch(error){
    Logger.error('Error during user update:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during user update. Please try again later.' 
    };
  }
}

@Delete('/deleteuser')
async deleteUser(@Body() data: IDelUser, @Headers('authorization') token: string) {
    Logger.debug('delete user data ', data);
    try{
    const valid = new Validation()
    const validation = await valid.delUser(data)
    if (validation.status === 'ERROR') {
      return validation;
    }
    return this.authService.deleteUser(data, token);
  }
  catch(error){
    Logger.error('Error during delete user:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during delete user. Please try again later.' 
    };
  }
}

 
@Post('/pinnotes')
async pinnedNotes(@Body() data: IPinnedNotes,@Headers('authorization') token: string ) {
  Logger.debug('pinned notes')
    const valid = new Validation()
  try{
    const validation = await valid.pinnedNotes( data )
    Logger.debug(data.title , data.folderName)

    if (validation.status === 'ERROR') {
      return validation;
    }
    Logger.debug('note pinned');
    return this.authService.pinnedNotes(data, token);
  }
  catch(error){
    Logger.error('Error during pinned notes:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during pinned notes. Please try again later.' 
    };
  }
}

@Post('/newfolder')
async createFolder(@Body() data: INewFolder, @Headers('authorization') token: string) {
    Logger.debug('new folder added');
    try{
    const valid = new Validation()
      const validation = await valid.createFolder(data)
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.createFolder(data, token);
  }
  catch(error){
    Logger.error('Error during create folder:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during create folder. Please try again later.' 
    };
  }
}


@Post('/allfolders')
async getAllFolder(@Body() data : IGetFolders ,  @Headers('authorization') token: string){
   Logger.debug("all folders")
 try{
   const valid = new Validation()
   const validation = await valid.getAllFolder( data  , token)
   if (validation.status === 'ERROR') {
     return validation;
   }
   return this.authService.getAllFolder(data, token);
 }
 catch(error){
  Logger.error('Error during get all folders:', error); 
  return { 
    status: 'ERROR', 
    message: 'An error occurred during get all folders. Please try again later.' 
  };
 }
}

 @Post('/allfolder')
async getFolder(@Body() data: IGetFolder,  @Headers('authorization') token: string) {

    Logger.debug('all folder');
    try{
    const valid = new Validation()
    const validation = await valid.getFolder( data  , token)
    if (validation.status === 'ERROR') {
      return validation;
    }
    return this.authService.getFolder(data, token);
  }
  catch(error){
    Logger.error('Error during get folder:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during get folder. Please try again later.' 
    };
  }
}

@Post('/foldertitle')
async getFolderTitle(@Body() data : IGetFiles  ,@Headers('authorization') token: string){
  Logger.debug('folder title')
  try{
  const valid = new Validation()
  const validation = await valid.getFolderTitle( data  , token)
  if (validation.status === 'ERROR') {
    return validation;
  }
  return this.authService.getFolderTitle(data, token);
 }
 catch(error){
  Logger.error('Error during get folder with title:', error); 
  return { 
    status: 'ERROR', 
    message: 'An error occurred during get with title. Please try again later.' 
  };
 }
}
  
  
@Delete('/delnote')
async delNotes(@Body() data: IDelNotes, @Headers('authorization') token: string) {
    Logger.debug('delete notes', data);
    try{
    const valid = new Validation()
      const validation = await valid.delNote(data)
      if (validation.status === 'ERROR') {
        return validation;
      }
    return this.authService.delNotes(data, token);
  }
  catch(error){
    Logger.error('Error during delete notes:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during delete notes. Please try again later.' 
    };
  }
}

@Post('/updatenote')
async updateNotes( @Body() data: IUpdateNotes, @Headers('authorization') token: string, ) {
  try{
    const valid = new Validation()
    const validation = await valid.updateNote( data)
    if (validation.status === 'ERROR') {
      return validation;
    }
    Logger.debug('all files', data);
    return this.authService.updateNotes(data, token);
  }
  catch(error){
    Logger.error('Error during update notes:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during update notes. Please try again later.' 
    };
  }
}

@Post('/oldrecords')
async oldRecord(@Body() data: IGetRecords ){
  try{
    const valid = new Validation()
    const validation = await valid.oldRecord(data)
    
    return this.authService.oldRecords(data);

  }
  catch(error){
    Logger.error('Error during old records:', error); 
    return { 
      status: 'ERROR', 
      message: 'An error occurred during get old records. Please try again later.' 
    };
  }
}
  }


