import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDataBase } from 'entity/database';
import { Logger } from '@nestjs/common';
import { dataSource } from 'entity/environment';
import { Validation } from 'auth/test.spec';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await dataSource.initialize();
  await createDataBase().catch((e) => {
    Logger.error(`Fail to create Database with error message,${e}`);
    return e.message;
  });
  await app.listen(process.env.PORT ?? 5000);

 const validation = new Validation();
  //await validation.signup();
//   await validation.login();
//   await validation.addNote();
//   await validation.title();
  //await validation.userNote();
//   await validation.getRefid();
//   await validation.getDetail();
//   await validation.getAll();
//   await validation.userUpdate();
//   await validation.delUser();
//   await validation.delNote();
//   await validation.notePin();
//   await validation.newFolder();
//   await validation.folderPin();
//   await validation.getFolder();
//   await validation.getAllFolder();
//   await validation.getAllNotes();
//   await validation.delFolderFile();
//   await validation.updateNote();
//   await validation.updateFolder();


}

bootstrap();


