import { Injectable } from "@nestjs/common";
import { UserPersistence } from "../persistence/userPersistence";
import { User } from "../model/user";

@Injectable()
export class UserService {
    constructor(private readonly userPersistence: UserPersistence) {}

    async getUserById(id: number): Promise<User> {
        return await this.userPersistence.getUserById(id);
    }
}
