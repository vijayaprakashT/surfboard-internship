import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { jwtConstants } from '../entity/environment';
import { ITokenPayload } from './interface';

export class TokenService {
  private jwt: JwtService;

  constructor() {
    this.jwt = new JwtService(); 
  }

  async accessWithTokens(token: string ): Promise<{ status: string; data?: ITokenPayload; err?: string; message?: string }> {
    try {
      console.log('Access with tokens............................ ', token);
      
      const tokenValue = token.startsWith('Bearer') ? token.slice(7) : token; 
      console.log('Token value:', tokenValue);

      const validToken = await this.jwt.verifyAsync(tokenValue, {
        secret: jwtConstants.secret,  
      });
      Logger.debug('Valid token:', validToken);

      return { status: 'SUCCESS', message: 'Access granted', data: validToken };
      
    } catch (error) {
      Logger.error('Token verification failed:', error.message);
      return { status: 'ERROR', message: 'Invalid token', err: error.message };
    }
  }

}

