import {
    Controller,
    Get,
    Param,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { UserPositionService } from "../service/userPositionService";
import { UserPositionResponse } from "../core/dto/userPositionResponse";
import { UserService } from "../service/userService";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller()
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
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
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