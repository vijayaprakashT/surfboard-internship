import { Module } from '@nestjs/common';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'entity/environment';

@Module({
  imports: [
    
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AppModule {}
