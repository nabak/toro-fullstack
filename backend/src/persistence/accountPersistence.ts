import { Inject, Injectable } from "@nestjs/common";
import { Account } from "../model/account";
import { Pool } from "pg";
import { User } from "../model/user";

@Injectable()
export class AccountPersistence {
    constructor(@Inject("PG_POOL") private pool: Pool) {}

    public async getAccountByCPF(cpf: string): Promise<Account> {
        const sqlCommand = `SELECT A.Id as accountId,
                                    A.current_balance as balance,
                                    A.cpf as cpf,
                                    U.name
                            FROM Accounts A
                            INNER JOIN Users U ON A.cpf = U.CPF
                            WHERE A.cpf = $1`;

        const result = await this.pool.query(sqlCommand, [cpf]);

        if (result.rowCount === 0) {
            return null;
        }

        let accountRow = result.rows[0];
        const user = new User(accountRow.name, accountRow.cpf);
        const account = new Account(
            user,
            accountRow.accountid,
            accountRow.balance
        );

        return account;
    }
}
