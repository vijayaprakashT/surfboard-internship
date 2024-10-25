import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDataBase } from 'entity/database';
import { Logger } from '@nestjs/common';
import { dataSource } from 'entity/environment';
// import { datasource } from 'entity/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await dataSource.initialize();
  await createDataBase().catch((e) => {
    Logger.error(`Fail to create Database with error message,${e}`);
    return e.message;
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
