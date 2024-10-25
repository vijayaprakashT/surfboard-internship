// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common'; 
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {  
  constructor(private authService: AuthService) {}   

  @Post('/signup')   
  signup(@Body() userData: {userName: string, userEmail: string , userPassword : string}) {    
    console.log("data signup:" , userData) 
    return this.authService.signup(userData);   
  } 

  @Post('/login')
  login(@Body() userData: {userEmail: string, userPassword: string}) {
    console.log("data login:" , userData) 
    return this.authService.login(userData);
  }
}