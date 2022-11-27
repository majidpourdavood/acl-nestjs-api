import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {HttpExceptionFilter} from "./helpers/http-exception.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle('ACL For Nestjs ')
        .setDescription('The ACL API description')
        .setVersion('1.0')
        .addTag('ACL')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);


    let PORT = process.env.PORT;
    await app.listen(PORT);
}

bootstrap();
