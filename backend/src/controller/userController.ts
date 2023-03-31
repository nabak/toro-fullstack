import {
    Controller,
    Get,
    Param,
    NotFoundException,
    UseFilters,
} from "@nestjs/common";
import { UserPositionService } from "../service/userPositionService";
import { UserPositionResponse } from "../core/dto/userPositionResponse";
import { UserService } from "../service/userService";
import { ApiTags } from "@nestjs/swagger";
import { NotFoundExceptionFilter } from "../core/exceptions/notFoundException";

@ApiTags("users")
@Controller()
@UseFilters(NotFoundExceptionFilter)
export class UserController {
    constructor(
        private userPositionService: UserPositionService,
        private userService: UserService
    ) {}

    @Get("users/:id/positions")
    async getUserPositions(
        @Param("id") id: number
    ): Promise<UserPositionResponse> {
        const user = await this.userService.getUserById(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const userPosition = await this.userPositionService.getUserPositions(
            user.cpf
        );

        return {
            checkingAccountAmount: userPosition.checkingAccountAmount,
            positions: userPosition.positions,
            consolidated: userPosition.consolidated,
        };
    }
}
