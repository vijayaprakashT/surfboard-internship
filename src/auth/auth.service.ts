import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { dataSource } from '../entity/environment';
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
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../entity/environment';
import { generateID } from '@jetit/id';
import { Logger } from '@nestjs/common';
import { TokenService } from './tokenservice';
import { tokenvalidation } from './tokenvalidation';
import { error } from 'console';


@Injectable()
export class AuthService {

async signup(data: IUserDetails ): Promise<{status: string;data?: IUserDetails;access_token?: string;error?: string;message?: string;}> {
    try {
      if (typeof data.userName !== 'string') {
        return { status: 'Entered name is not applicable' };
      }
      if (typeof data.userEmail !== 'string') {
        return { status: 'Email is not applicable' };
      }
      if (typeof data.userRole !== 'string') {
        return { status: 'invalid role ' };
      }
      if (typeof data.userPassword !== 'string') {
        return { status: 'Try another password' };
      }

      const id = generateID('HEX');
      data.userId = id;

      const password = await bcrypt.hash(data.userPassword, 10);
      const newUserQuery = `INSERT INTO user_details(user_id , user_name , user_email, user_role, user_password) 
                            VALUES ('${data.userId}','${data.userName}', '${data.userEmail}','${data.userRole}' ,
                            '${password}')`;

      await dataSource.query(newUserQuery);

      Logger.debug('Signed up successfully');
      const generateTokens = {
        userEmail: data.userEmail,
        password: password,
      };

      const jwt = new JwtService();

      const token = await jwt.signAsync(generateTokens, {
        secret: jwtConstants.secret,
      });

      return {
        status: 'SUCCESS',
        message: 'Signed up successfully',
        data: { token },
      };
    } catch (error) {
      return {
        status: 'ERROR',
        message: 'Something went wrong',
        error: error.message,
      };
    }
  }

async login(data: ILoginDetails): Promise<{status: string;access_token?: string;data?: ILoginDetails;error?: string;message?: string;}> {
    try {
      const get_id = `SELECT * FROM user_details 
                      WHERE user_email ='${data.userEmail}' 
                      AND is_deleted = false `;

      const getQuery = await dataSource.query(get_id);
      Logger.debug('Query Result: ', getQuery);

      if (getQuery.length === 0) {
        return { status: 'ERROR', message: 'user not found' };
      }

      const retrieve = getQuery[0];

      Logger.debug('Retrieved User Data: ', retrieve);
      Logger.debug('User Password from input: ', data.userPassword);
      Logger.debug('User Password from database: ', retrieve.user_password);

      const passwordValid = await bcrypt.compare(
        data.userPassword,
        retrieve.user_password,
      );
      // console.log('Password Valid: ', passwordValid);

      if (!passwordValid) {
        return { status: 'ERROR', message: 'invalid password' };
      }

      Logger.debug('Logged in successfully');

      const generatedTokens = {
        userEmail: retrieve.user_email,
        userpassword: retrieve.user_password,
      };

      Logger.debug('Generated Tokens: ', generatedTokens);

      const jwt = new JwtService();

      const token = await jwt.signAsync(generatedTokens, {
        secret: jwtConstants.secret,
      });

      return {
        status: 'SUCCESS',
        message: 'Logged in successfully',
        data: { token },
      };
    } catch (error) {
      Logger.debug('Login Error: ', error.message);
      return { status: 'ERROR', message: 'Login failed', error: error.message };
    }
  }

async addNotes(data: IAddNotes, token: string): Promise<{ status: string; data?: IAddNotes; err?: string; message?: string| { userEmail: string } }> {
    try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);
  
      if (validateToken.status !== 'SUCCESS') {
        Logger.debug('INVALID TOKEN:', validateToken);
        return { status: 'ERROR', message: 'Validation failed' };
      }
  
      Logger.debug('Decoded Token:', validateToken.data);
     const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
     const useremail = typeof tokenValidation.message === 'string' 
     ? tokenValidation.message
     : (tokenValidation.message as { userEmail: string }).userEmail;

     console.log('extracted useremail ' , useremail)
     const getUserId = `SELECT user_id FROM user_details
                         WHERE user_email = '${useremail}' AND is_deleted = false`
      const userResult = await dataSource.query(getUserId)
  
      const userId = userResult[0].user_id;
      
  
      const insertQuery = `
        INSERT INTO NOTE_APP (USER_ID, TITLE, DESCRIPTION, FOLDER, DATE)
        VALUES
        ('${userId}', '${data.title}', '${data.description}', '${data.folderName}', CURRENT_TIMESTAMP)
      `;

      const addedNotes = await dataSource.query(insertQuery);
      if (!addedNotes) {
        return { status: 'ERROR', message: 'No notes were added.' };
      }
  
      if (data.pin === 'pin') {
        const pinNote = `
          UPDATE note_app SET pinned_file = true 
          WHERE title = '${data.title}' OR folder = '${data.folderName}' AND pinned_file = false
        `;
        await dataSource.query(pinNote);
      }
  
      return {
        status: 'SUCCESS',
        message: 'Notes added',
        data: { title: data.title, description: data.description },
      };
    } catch (error) {
      Logger.error('Error in addNotes:', error.message);
      return {
        status: 'ERROR',
        message: 'Something went wrong',
        err: error.message,
      };
    }
  }
  
async getUserNotes(data: getUserNotes, token: string): Promise<{ status: string; data?: getUserNotes[]; error?: string; message?: string; page?: number, userNotes?: number}> {
    try {
        const validateToken = await new tokenvalidation().validateTokenAndPassword(token);
        
        // if (validateToken.status !== 'SUCCESS') {
        //     return {
        //         status: 'ERROR',
        //         message: validateToken.error
                
        //     };
        // }

        const useremail =typeof validateToken.message === 'string' ? validateToken.message : validateToken.message.userEmail;

        console.log("userEmail" , useremail)
        const userQuery = `
            SELECT user_id, user_email 
            FROM user_details 
            WHERE user_email = '${useremail}' AND is_deleted = false
        `;
        
        const userResult = await dataSource.query(userQuery);
        console.log('user details response:' , userResult)
        if (userResult.length === 0) {
            return {
                status: 'ERROR',
                message: 'User not found',
            };
        }

        const userId = userResult[0].user_id;

        const pagination = data.page || 1;
        const pageSize = 20;
        const start = (pagination - 1) * pageSize;

        const sortDetails = data.filter === 'asc' ? 'ASC' : 'DESC';

        const userNoteQuery = `
            SELECT title, description 
            FROM note_app
            WHERE user_id = '${userId}'
            AND note_deleted = false 
            ORDER BY pinned_file ${sortDetails}
            LIMIT ${pageSize} OFFSET ${start}
        `;

        Logger.debug('Executing note query:', userNoteQuery);

        const validNote = await dataSource.query(userNoteQuery);
        
        Logger.debug('Fetched notes:', validNote);

        if (validNote.length === 0) {
            return {
                status: 'ERROR',
                message: 'No notes found for the user',
                page: data.page,
                userNotes: 0
            };
        }

        return {
            status: 'SUCCESS',
            message: 'User notes retrieved successfully',
            page: data.page,
            userNotes: validNote.length,
            data: validNote
        };
    } catch (error) {
        Logger.error('An error occurred:', error.message);
        return {
            status: 'ERROR',
            message: 'Something went wrong',
            error: error.message,
        };
    }
}

async getNote(data: IGetTitle,token: string): Promise<{  status: string;  data?: IGetTitle;  err?: string;  message?: string;}> {
    try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);
  
      if (validateToken.status !== 'SUCCESS') {
        return {
          status: 'ERROR',
          message: 'Invalid token',
          err: validateToken.err,
        };
      }
      const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
  
      const validTitle = `SELECT title, description 
                          FROM note_app 
                          WHERE title = '${data.noteTitle}' OR title LIKE '${data.noteTitle}%'`;

      const valid = await dataSource.query(validTitle);
  
      if (!valid ) {
        return {
          status: 'ERROR',
          message: 'No notes found matching the provided criteria',
        };
      }
  
      const note = valid[0]; 
      Logger.debug('data passed', note);
  
      const shownData = {
        noteTitle: note.title,
        noteDescription: note.description,
      };
  
      return {
        status: 'SUCCESS',
        message: 'User detail retrieved successfully',
        data: shownData,
      };
    } catch (error) {
      return { status: 'ERROR', message: `Something went wrong: ${error}` };
    }
  }

async getWithRefid(data: IRefId,token: string, ): Promise<{   status: string;   data?: IRefId;   err?: string;   message?: string; }> {
  try {
    const validateToken = await new TokenService().accessWithTokens(token);
   Logger.debug('Validation check:', validateToken);

  if (validateToken.status !== 'SUCCESS') {
   return {
      status: 'ERROR',
      message: 'Invalid token',
      err: validateToken.err,
   };
 }
  const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)

  const refId = `SELECT title, description FROM note_app WHERE user_id ='${data.userId}'`;
  const id = await dataSource.query(refId);
  Logger.debug('ref id found', id);

   return { status: 'SUCCESS', message: 'notes details :', data: id };
} catch (error) {
    Logger.error('error' , error.message)
    return { status: `something wrong: ${error}` };
    }
  }

async getUserDetails(data: IGetDetails,token: string,): Promise<{  status: string;  data?: IUserDetails;  err?: string;  message?: string }> {
    try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);

      if (validateToken.status !== 'SUCCESS') {
        return {
          status: 'ERROR',
          message: 'Invalid token',
          err: validateToken.err,
        };
      }
   const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
  const getWithId = `SELECT USER_ID,USER_NAME,USER_ROLE,USER_PASSWORD
                    FROM	USER_DETAILS
                    WHERE USER_EMAIL = '${data.userEmail}' AND IS_DELETED = FALSE`;

  Logger.debug('getwithid......................................');
  const valid = await dataSource.query(getWithId);
  Logger.debug('valid user', valid);
  const getUser = valid[0];

  if (!getUser) {
    return { status: 'ERROR', message: 'user not found' };
      }

  Logger.debug('input pw', data.userPassword);
  Logger.debug('db pw', getUser.user_password);

  if (!data.userPassword || !getUser.user_password) {
  return {
  status: 'ERROR',
  message: 'Password not provided or user data is incomplete',
    };
  }

 const checkPassword = await bcrypt.compare(data.userPassword,getUser.user_password );

if (!checkPassword) {
   return { status: 'ERROR', message: 'invalid password' };
    }

  const shownData = {
     userId: getUser.user_id,
     userName: getUser.user_name,
     userRole: getUser.user_role,
  };

  Logger.debug('shown data');
    return {
      status: 'SUCCESS',
      message: 'data retrieved',
      data: shownData,
      };

    } catch (error) {
      return {
        status: 'ERROR',
        message: 'data not found',
        err: error.message,
      };
    }
  }

async getAllUser(  data: IGetAll,  filter: string,): Promise<{  status?: string;  data?: IGetAll[];  err?: string;  message?: string; page?: number , users?: number}> {
    try {

    console.log('getall start');
    Logger.error('Received data:', data);

    if (typeof data.page !== 'number') {
      return {
       status: 'ERROR',
       message: 'Invalid input: page is missing or incorrect',
        };
      }

    const pagination = data.page;
    console.log('pagination is set ', pagination);
    const pageSize = 10
    const start = (pagination - 1) * 100;

    Logger.debug('page start', start);

    const sortDetails = filter === 'asc' ? 'ASC' : 'DESC';

    const getAllUser = `SELECT * FROM user_details 
                        ORDER BY user_name ${sortDetails} LIMIT '${pageSize}' 
                        OFFSET ${start} `;

    Logger.debug('executing query', getAllUser);

    const get = await dataSource.query(getAllUser);
    console.log('Query result:', get);

    if (!get) {
      return { status: 'ERROR', message: 'No users found' };
    }

    const finalData = get.filter((user) => user.is_deleted === false).map((user) => ({
          
          userName: user.user_name,
          userRole: user.user_role,
        }));

    return {
        status: 'SUCCESS',
        message: 'Users retrieved successfully',
        page : data.page,
        users : finalData.length,
        data: finalData,
      };

    } catch (error) {
      return {
        status: 'ERROR',
        message: 'Failed to retrieve users',
        err: error.message,
      };
    }
  }

async userUpdate( data: IUserUpdate, token: string): Promise<{  status: string;  data?: IUserUpdate;  err?: string;  message?: string; }> {
  try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);
  
      if (validateToken.status !== 'SUCCESS') {
        return {
          status: 'ERROR',
          message: 'Invalid token',
          err: validateToken.err,
        };
      }
  
      const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
  
     
  
      if (data.userEmail) {
        const updateMail = `UPDATE user_details SET user_email = '${data.userEmail}'
                            WHERE IS_DELETED = FALSE`;
        Logger.debug('Updating email');
        await dataSource.query(updateMail);
  
      }
  
      if (data.userName) {
        const updateName = `UPDATE user_details SET user_name = '${data.userName}' 
                            WHERE  IS_DELETED = FALSE`;
        Logger.debug('Updating username:');
        await dataSource.query(updateName);
  
      }
  
      if (data.userRole) {
        const updateRole = `UPDATE user_details SET user_role = '${data.userRole}' 
                            WHERE  IS_DELETED = FALSE`;
        Logger.debug('Updating role:', updateRole);
        await dataSource.query(updateRole);
      }

      if(data.userPassword){
        const password = await bcrypt.hash(data.userPassword, 10);

        const updateRole = `UPDATE user_details SET user_role = '${password}' 
                            WHERE  IS_DELETED = FALSE`;
        Logger.debug('Updating role:', updateRole);
        await dataSource.query(updateRole);
      }
  
      return {
        status: 'SUCCESS',
        message: 'data updated successfully',
      };
    } catch (error) {
      Logger.error('Error in userUpdate:', error);
      return {
        status: 'ERROR',
        message: 'Error updating user details',
        err: error.message,
      };
    }
  }
  
async deleteUser(data: IDelUser,token: string,): Promise<{  status: string;  data?: IDelUser;  err?: string;  message?: string;}> {
  try {
    const validateToken = await new TokenService().accessWithTokens(token);
    Logger.debug('Validation check:', validateToken);

    if (validateToken.status !== 'SUCCESS') {
     return {
      status: 'ERROR',
      message: 'Invalid token',
      err: validateToken.err,
        };
      }

    const deleteData = `SELECT * FROM user_details WHERE user_email = '${data.userEmail}'`;
    const finalData = await dataSource.query(deleteData);
    const finalResult = finalData[0];

  if (finalResult.length === 0) {
      return { status: 'ERROR', message: 'Employee data not found' };
      }

  const passwordValid = await bcrypt.compare(data.userPassword,     finalResult.user_password,   );
      console.log('Password Valid: ', passwordValid);

  if (!passwordValid) {
   return { status: 'ERROR', message: 'invalid password' };
      }
  const updateQuery = `UPDATE user_details SET is_deleted = true WHERE user_email = '${data.userEmail}' `;
  const result = await dataSource.query(updateQuery);
  Logger.debug('data deleted');

  return {
   status: 'SUCCESS',
   message: ' user notes successfully  deleted.',
    };
} catch (error) {
  Logger.error(error.message)
  return {
    status: 'ERROR',
    message: 'employee data not found',
      };
    }
  }

async createFolder(data: INewFolder, token: string): Promise<{   status: string;   data?: INewFolder;   err?: string;   message?: string; }> {
  try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);
  
      if (validateToken.status !== 'SUCCESS') {
        return {
          status: 'ERROR',
          message: 'Invalid token',
          err: validateToken.err,
        };
      }
  
      const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
      const useremail = typeof tokenValidation.message === 'string' 
      ? tokenValidation.message
      : (tokenValidation.message as { userEmail: string }).userEmail;
 
      console.log('extracted useremail ' , useremail)

      const userQuery = `
      SELECT user_id, user_email 
      FROM user_details 
      WHERE user_email = '${useremail}' AND is_deleted = false
  `;
  
     const userResult = await dataSource.query(userQuery);
     console.log('user details response:' , userResult)
     if (userResult.length === 0) {
      return {
          status: 'ERROR',
          message: 'User not found',
      };
     }
     const userId = userResult[0].user_id;

  
     
      const updateFolderQuery = `
        UPDATE note_app 
        SET FOLDER = '${data.folderName}' 
        WHERE TITLE = '${data.title}' AND user_id = '${userId}' AND NOTE_DELETED = FALSE
      `;
      Logger.debug('Folder update query:', updateFolderQuery);
  
      const folderUpdateResult = await dataSource.query(updateFolderQuery);
  
      if (!folderUpdateResult ) {
        return {
          status: 'ERROR',
          message: 'Failed to update folder',
        };
      }
  
      const responseData = {
        folderName: data.folderName,
        title: data.title,
      };
  
      return {
        status: 'SUCCESS',
        message: 'Folder updated successfully',
        data: responseData,
      };
    } catch (error) {
      Logger.error('Error in createFolder:', error.message);
      return {
        status: 'ERROR',
        message: 'Something went wrong',
        err: error.message,
      };
    }
  }
  
async pinnedNotes(data: IPinnedNotes,token: string): Promise<{  status: string;  data?: IPinnedNotes[];  err?: string;  message?: string; page?: number , pinnedNote?: number}> {
  try {
      const validateToken = await new TokenService().accessWithTokens(token);
      console.log('Validation check:', validateToken);
  
      if (validateToken.status !== 'SUCCESS') {
        return {
          status: 'ERROR',
          message: 'Invalid token',
          err: validateToken.err,
        };
      }
  
     const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
     const useremail = typeof tokenValidation.message === 'string' 
     ? tokenValidation.message
     : (tokenValidation.message as { userEmail: string }).userEmail;
 
     console.log('extracted useremail ' , useremail)
     const userQuery = `
     SELECT user_id, user_email 
     FROM user_details 
     WHERE user_email = '${useremail}' AND is_deleted = false
 `;
 
    const userResult = await dataSource.query(userQuery);
    console.log('user details response:' , userResult)
    if (userResult.length === 0) {
     return {
         status: 'ERROR',
         message: 'User not found',
     };
    }
 
    const userId = userResult[0].user_id;

     
  
      if (data.title) {
        const pinnedFile = `
                            SELECT title, description 
                            FROM note_app 
                            WHERE title ='${data.title}' AND user_id ='${userId}' AND  note_deleted = false
                            AND pinned_file = true 
                            ORDER BY date DESC
        `;

        const selected = await dataSource.query(pinnedFile);
        Logger.debug('Pinned notes by title', selected);
  
        if (!selected) {
          return {
            status: 'ERROR',
            message: 'Pinned notes not found',
          };
        }
  
        return {
          status: 'SUCCESS',
          message: 'Pinned notes retrieved successfully',
          pinnedNote : selected.length,
          data: selected,
        };
      }
  
      if (data.folderName) {
        const pinnedFile = `SELECT  title, description 
                            FROM note_app 
                            WHERE folder = '${data.folderName}' AND user_id ='${userId}' AND note_deleted = false
                            AND pinned_file = true 
                            ORDER BY date DESC
        `;
        const selected = await dataSource.query(pinnedFile);
        Logger.debug('Pinned notes by folder', selected);
  
        if (!selected) {
          return {
            status: 'ERROR',
            message: 'Pinned folders not found',
          };
        }
  
        return {
          status: 'SUCCESS',
          message: 'Pinned folder notes retrieved successfully',
          data: selected,
        };
      }
  
      return {
        status: 'ERROR',
        message: 'Invalid request. Please provide a valid title or folderName.',
      };
    } 
  catch (error) {
      Logger.debug('Error', error.message);
      return {
        status: 'ERROR',
        message: 'Something went wrong',
      };
    }
  }
  
async getAllFolder(data: IGetFolders,token: string,): Promise<{ status: string; data?: IGetFolders[]; err?: string; message?: string; page?:number ; records?: number}> {
    try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);

      if (validateToken.status !== 'SUCCESS') {
        return {
          status: 'ERROR',
          message: 'Invalid token',
          err: validateToken.err,
        };
      }

    const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
    const useremail = typeof tokenValidation.message === 'string' 
    ? tokenValidation.message
    : (tokenValidation.message as { userEmail: string }).userEmail;

    console.log('extracted useremail ' , useremail)
    const userQuery = `
    SELECT user_id, user_email 
    FROM user_details 
    WHERE user_email = '${useremail}' AND is_deleted = false
`;

   const userResult = await dataSource.query(userQuery);
   console.log('user details response:' , userResult)
   if (userResult.length === 0) {
    return {
        status: 'ERROR',
        message: 'User not found',
    };
   }
   const userId = userResult[0].user_id;

    

      Logger.debug('getall notes');
      Logger.debug('page value:', data.pageSet);

      const page = data.pageSet;
      const pageSize = 10
      const start = (page - 1) * pageSize;
      Logger.debug('page start', start);
      const sortDetails = data.filter === 'asc' ? 'ASC' : 'DESC';

      const getAllUser = `
                            SELECT folder FROM note_app
                            WHERE user_id = '${userId}' AND note_deleted = false
                            ORDER BY pinned_file ${sortDetails}
                            LIMIT '${pageSize}' OFFSET ${start} 
    `;

      Logger.debug('executing query', getAllUser);

      const get = await dataSource.query(getAllUser);
      Logger.debug('Query result:', get);

      if (!get) {
        return { status: 'ERROR', message: 'No users found' };
      }

      return { status: 'SUCCESS', message: 'data retreived', 
        page :page ,
        records : get.length,
        data: get };
    } catch (error) {
      return {
        status: 'ERROR',
        message: 'data not retreived..',
        err: error.message,
      };
    }
  }

async getFolder(data: IGetFolder, token: string): Promise<{ status: string; data?: IGetFolder; err?: string; message?: string; page ?: number , records ?: number}> {
    try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);

      if (validateToken.status !== 'SUCCESS') {
        return {
          status: 'ERROR',
          message: 'Invalid token',
          err: validateToken.err,
        };
      }
     const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
     const useremail = typeof tokenValidation.message === 'string' 
     ? tokenValidation.message
     : (tokenValidation.message as { userEmail: string }).userEmail;
 
     console.log('extracted useremail ' , useremail)
     const userQuery = `
     SELECT user_id, user_email 
     FROM user_details 
     WHERE user_email = '${useremail}' AND is_deleted = false
    `;
 
    const userResult = await dataSource.query(userQuery);
    console.log('user details response:' , userResult)
    if (userResult.length === 0) {
     return {
         status: 'ERROR',
         message: 'User not found',
     };
    }
       const userId = userResult[0].user_id;

   
    

      const pagination = data.page;
      console.log('pagination is set ', pagination);
      const pageSize = 10;
      const start = (pagination - 1) * pageSize;
  
      Logger.debug('page start', start);
  
      const sortDetails = data.filter === 'asc' ? 'ASC' : 'DESC';


      const folders = ` SELECT title , description FROM note_app
                        WHERE folder ='${data.folderName}' AND user_id ='${userId}' AND note_deleted = false
                        ORDER BY pinned_file ${sortDetails}
                        LIMIT ${pageSize} OFFSET ${start}`;

      const allFolder = await dataSource.query(folders);
      Logger.debug('fetched', allFolder);

      if (!allFolder) {
        return { status: 'ERROR', message: 'no folders' };
      }
      return {
        status: 'SUCCESS',
        message: 'User folder retrieved successfully',
        page : pagination,
        records : allFolder.length,
        data: allFolder,
      };
    } catch (error) {
      return {
        status: 'ERROR',
        message: 'something went wrong',
        err: error.message,
      };
    }
  }

async getFolderTitle( data: IGetFiles, token: string, ): Promise<{   status: string;   data?: IGetFiles;   err?: string;   message?: string; }> {
  try {
        const validateToken = await new TokenService().accessWithTokens(token);
        Logger.debug('Validation check:', validateToken);
    
        if (validateToken.status !== 'SUCCESS') {
          return {
            status: 'ERROR',
            message: 'Invalid token',
            err: validateToken.err,
          };
        }
    
        const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)  
        
        const useremail = typeof tokenValidation.message === 'string' 
        ? tokenValidation.message
        : (tokenValidation.message as { userEmail: string }).userEmail;
    
        console.log('extracted useremail ' , useremail)
        const userQuery = `
        SELECT user_id, user_email 
        FROM user_details 
        WHERE user_email = '${useremail}' AND is_deleted = false
    `;
    
       const userResult = await dataSource.query(userQuery);
       console.log('user details response:' , userResult)
       if (userResult.length === 0) {
        return {
            status: 'ERROR',
            message: 'User not found',
        };
       }
    
          const userId = userResult[0].user_id;

    
        Logger.debug('getall start');
       
    
        const getAllUser = `
              SELECT title FROM note_app
              WHERE folder ='${data.folderName}' AND title ='${data.title}' AND user_id ='${userId}' AND note_deleted = false
          `;
        Logger.debug('Executing query:', getAllUser);
    
        const get = await dataSource.query(getAllUser);
        Logger.debug('Query result:', get);
    
        if (!get ) {
          return { status: 'ERROR', message: 'No files found' };
        }
    
        const finalData = get.map((folder) => ({
          title: folder.title,
          description : folder.description
        }));
    
        return { status: 'SUCCESS', message: 'data retrieved', data: finalData };
      } 
  catch (error) {
        Logger.error('getAllFiles error:', error.message);
        return {
          status: 'ERROR',
          message: 'Data retrieval failed',
          err: error.message,
        };
      }
  }
    
  
async updateNotes(data: IUpdateNotes,token: string,): Promise<{  status: string;  data?: IUpdateNotes;  err?: string;  message?: string;  }> {
  try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);
    
        if (validateToken.status !== 'SUCCESS') {
          return {
            status: 'ERROR',
            message: 'Invalid token',
            err: validateToken.err,
          };
        }
        const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
        const useremail = typeof tokenValidation.message === 'string' 
        ? tokenValidation.message
        : (tokenValidation.message as { userEmail: string }).userEmail;
    
        console.log('extracted useremail ' , useremail)
        const userQuery = `
        SELECT user_id, user_email 
        FROM user_details 
        WHERE user_email = '${useremail}' AND is_deleted = false
       `;
    
       const userResult = await dataSource.query(userQuery);
       console.log('user details response:' , userResult)
       if (userResult.length === 0) {
        return {
            status: 'ERROR',
            message: 'User not found',
        };
       }
          const userId = userResult[0].user_id;

    
    
        if (data.pin) {
          if (data.pin === 'pin') {
            if (data.folderName) {
              const pinNote = `UPDATE note_app SET pinned_file = true 
                               WHERE folder ='${data.folderName}' AND user_id ='${userId}' AND note_deleted = false
                               AND pinned_file = false `;
              Logger.debug('pinned the file ', pinNote);
              await dataSource.query(pinNote);
              Logger.debug('file pinned');
              return {
                status: 'SUCCESS',
                message: 'Pinned the file successfully',
              };
            }
    
            if (data.title) {
              const pinNote = `UPDATE note_app SET pinned_file = true 
                               WHERE title ='${data.title}' AND user_id ='${userId}' AND note_deleted = false
                                AND pinned_file = false `;
              Logger.debug('pinned the file ', pinNote);
              await dataSource.query(pinNote);
              Logger.debug('file pinned');
              return {
                status: 'SUCCESS',
                message: 'Pinned the file successfully',
              };
            }
          }
        }
    
        if (data.title) {
          const updateTitle = `UPDATE note_app SET title = '${data.title}' 
                               WHERE user_id ='${userId}' AND note_deleted = false `;
          Logger.debug('updating title ', updateTitle);
          await dataSource.query(updateTitle);
          Logger.debug('title updated');
          return {
            status: 'SUCCESS',
            message: 'Title updated successfully',
          };
        }
    
        if (data.description) {
          const updateDesc = `UPDATE note_app SET description = '${data.description}' 
                              WHERE user_id ='${userId}' AND note_deleted = false `;
          Logger.debug('updating description ', updateDesc);
          await dataSource.query(updateDesc);
          Logger.debug('description updated');
          return {
            status: 'SUCCESS',
            message: 'Description updated successfully',
          };
        }
    
        if (data.folderName) {
          const updateFolder = `UPDATE note_app SET folder = '${data.folderName}' 
                                WHERE user_id ='${userId}' AND  note_deleted = false `;
          Logger.debug('updating folder name ', updateFolder);
          await dataSource.query(updateFolder);
          Logger.debug('folder updated');
          return {
            status: 'SUCCESS',
            message: 'Folder updated successfully',
          };
        }
    
        return { status: 'SUCCESS', message: 'Note updated successfully' };
      } catch (error) {
        return { status: 'ERROR', message: 'Not updated', err: error.message };
      }
  }
    
async delNotes(data: IDelNotes,token: string,): Promise<{  status: string;  data?: IDelNotes; err?: string; message?: string; }> {
    try {
      const validateToken = await new TokenService().accessWithTokens(token);
      Logger.debug('Validation check:', validateToken);
  
     if (validateToken.status !== 'SUCCESS') {
      return {
        status: 'ERROR',
        message: 'Invalid token',
        err: validateToken.err,
     };
}
    const tokenValidation = await new tokenvalidation().validateTokenAndPassword(token)
    const useremail = typeof tokenValidation.message === 'string' 
    ? tokenValidation.message
    : (tokenValidation.message as { userEmail: string }).userEmail;

    console.log('extracted useremail ' , useremail)
    const userQuery = `
    SELECT user_id, user_email 
    FROM user_details 
    WHERE user_email = '${useremail}' AND is_deleted = false
`;

   const userResult = await dataSource.query(userQuery);
   console.log('user details response:' , userResult)
   if (userResult.length === 0) {
    return {
        status: 'ERROR',
        message: 'User not found',
    };
   }
             const userId = userResult[0].user_id;


   if(data.title){
    const delnote = `SELECT title , description FROM note_app WHERE title = '${data.title}' AND user_id ='${userId}' AND note_deleted = false`;
    const note = await dataSource.query(delnote);
    Logger.debug('notes found ');
    console.log(note)
  
        if (note.length === 0) {
          return {
            status: 'ERROR',
            message: 'notes already deleted or not found',
          };
        }
    const del = `UPDATE note_app SET note_deleted = true , deleted_date = CURRENT_TIMESTAMP WHERE title ='${data.title}'`;
    const final = await dataSource.query(del);
    Logger.debug('updated', final);
  
  }
  
    if(data.folderName){
      const delNote = `SELECT folder FROM note_app WHERE folder = '${data.folderName}'AND title ='${data.title}' AND user_id ='${userId}' AND note_deleted = false`;
      const finalDel = await dataSource.query(delNote)
      Logger.debug('delete notes' , finalDel)
  
      const del = `UPDATE note_app SET note_deleted = true ,deleted_date = CURRENT_TIMESTAMP WHERE folder ='${data.folderName}'`;
      const final = await dataSource.query(del);
      Logger.debug('updated', final);
  
  
    }
        return { status: 'SUCCESS', message: 'successfully deleted' };
      } catch (error) {
        return {
          status: 'ERROR',
          message: 'something went wrong',
          err: error.message,
        };
      }
  }
  
async oldRecords(data: IGetRecords): Promise<{ status: string; data?: IGetRecords; err?: string; message?: string; NoOfRecords ?: number}> {
    try {
      
      if (data.setTime) {
        const interval = data.setTime > 24 ? `${data.setTime} day`  : `${data.setTime} hour`; 
  
    const getRecord = `
          SELECT  title, description, deleted_date 
          FROM note_app
          WHERE deleted_date > current_timestamp - interval '${interval}';
        `;
        
        const record = await dataSource.query(getRecord);
        Logger.debug('records', record);
  
        if (!record) {
          return { status: 'ERROR', message: 'Records not found' };
        }
  
        return {
         status: 'SUCCESS', 
         message: 'Records found', 
         NoOfRecords : record.length,
         data: record };
      }
  
      return { status: 'ERROR', message: 'No time range specified ' ,
      };
  
    } catch (error) {
      Logger.error('Error', error.message);
      return { status: 'ERROR', message: 'Something went wrong' };
    }
  }
  

}
  

 //  const userQuery = `SELECT user_id FROM user_details WHERE is_deleted = false`;
      //  const userResult = await dataSource.query(userQuery)

    
      //   if (!userResult) {
      //     Logger.error(userResult.error)
      //     return {
      //       status: 'ERROR',
      //       message: 'User not found',
      //       error : userResult.error
      //     };
      //   }
      //  const userId = userResult[0].user_id;
      //   if (typeof data.page !== 'number') {
      //     return {
      //      status: 'ERROR',
      //      message: 'Invalid input: page is missing or incorrect',
      //       };
      //     }
      // const validateToken = await new TokenService().accessWithTokens(token);
      // Logger.debug('Validation check:', validateToken);
    
      // if (validateToken.status !== 'SUCCESS') {
      //     return {
      //       status: 'ERROR',
      //       message: 'Invalid token',
      //       error: validateToken.err,
      //     };
      //   }