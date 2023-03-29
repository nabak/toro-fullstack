import { Controller, Get } from "@nestjs/common";
import { UserPositionService } from "../service/userPositionService";
import { UserPositionResponse } from "../core/dto/userPositionResponse";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("userPosition")
@Controller("userPosition")
export class UserPositionController {
    constructor(private userPositionService: UserPositionService) {}

    @Get()
    async getUserPosition(): Promise<UserPositionResponse> {
        const userCpf = "12345678900";
        return await this.userPositionService.getUserPosition(userCpf);
    }
}
