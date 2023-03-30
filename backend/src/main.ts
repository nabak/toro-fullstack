import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NotFoundExceptionFilter } from "./core/exceptions/notFoundException";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalFilters(new NotFoundExceptionFilter());
    const options = new DocumentBuilder()
        .setTitle("API do Desafio Toro Fullstack")
        .setDescription("Documentação da API do Desafio Toro Fullstack")
        .setVersion("1.0")
        .addTag("toro")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("/docs", app, document);

    await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();
