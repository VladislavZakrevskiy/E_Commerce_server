import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    app.use(cookieParser())
    await app.listen(PORT, () => console.log(`server started at port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}
bootstrap();
