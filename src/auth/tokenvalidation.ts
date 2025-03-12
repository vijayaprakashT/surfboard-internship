import { dataSource } from "entity/environment";
import { TokenService } from "./tokenservice";
import { Logger } from "@nestjs/common";

export class tokenvalidation{

async  validateTokenAndPassword( token: string): Promise<{  status: 'SUCCESS' | 'ERROR';  message: string | { userEmail: string }; }> {
try {
      const validateToken = await new TokenService().accessWithTokens(token);
      
          if (validateToken.status !== 'SUCCESS') {
            return { status: 'ERROR', message: 'Invalid token' };
          }

      
          const tokenMail = validateToken.data?.userEmail;
          const tokenPassword = validateToken.data?.userpassword;
          console.log(tokenMail , tokenPassword)
      
          if (!tokenMail || !tokenPassword) {
            return {
              status: 'ERROR',
              message: 'Tokens are invalid or check DB has token data',
            };
          }
      
          const validateUser = `SELECT user_id , user_email , user_password FROM user_details 
                                WHERE user_email ='${tokenMail}'`
         const valid = await dataSource.query(validateUser)
         console.log(valid)
         
          if (!valid) {
            return { status: 'ERROR', message: 'notes does not exist' };
          }
          // const userId = valid[0].user_id
          // console.log('userid:' , userId)
          const Dbpassword = valid[0].user_password;
          console.log(tokenPassword , Dbpassword)
      
          if (tokenPassword !== Dbpassword) {
            return {
              status: 'ERROR',
              message: 'Token password does not match with DB password',
            };
          }
      
          return { status: 'SUCCESS', message: { userEmail: tokenMail } };
        } catch (error) {
          Logger.error('something went wrong tokenvalidation' , error.message)
          return {
            status: 'ERROR',
            message: `Validation failed: ${error.message}`,
          };
        }
      }
    }