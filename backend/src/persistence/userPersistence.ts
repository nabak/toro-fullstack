import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { User } from "../model/user";

@Injectable()
export class UserPersistence {
    constructor(@Inject("PG_POOL") private pool: Pool) {}

    async getUserById(id: number): Promise<User> {
        const sqlCommand = `SELECT id, name, cpf FROM users WHERE id = $1`;

        const result = await this.pool.query(sqlCommand, [id]);
        const userRow = result.rows[0];

        if (!userRow) {
            return null;
        }
        
        return new User(userRow.id, userRow.cpf, userRow.name);
    }
}
