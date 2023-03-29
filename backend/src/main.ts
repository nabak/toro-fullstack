import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    
    const options = new DocumentBuilder()
        .setTitle("API do Desafio Toro Fullstack")
        .setDescription("Documentação da API do Desafio Toro Fullstack")
        .setVersion("1.0")
        .addTag("toro")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("/docs", app, document);

    await app.listen(5000);
}
bootstrap();
