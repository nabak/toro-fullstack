import {
    ExceptionFilter,
    Catch,
    NotFoundException,
    ArgumentsHost,
} from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(404).json({
            message: "User not found",
            statusCode: 404,
        });
    }
}
