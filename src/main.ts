import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDb } from './users/database'; 


async function bootstrap() {

  await connectDb();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
