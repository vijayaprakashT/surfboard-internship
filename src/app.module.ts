import { Module } from '@nestjs/common';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
//import { datasource } from 'entity/environment';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
