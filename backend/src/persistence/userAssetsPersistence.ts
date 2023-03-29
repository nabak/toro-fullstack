import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { UserAsset } from "../model/userAsset";
import { Asset } from "../model/asset";

@Injectable()
export class UserAssetsPersistence {
    constructor(@Inject("PG_POOL") private pool: Pool) {}

    public async getUserAssetsByCPF(cpf: string): Promise<UserAsset[]> {
        const sqlCommand = `SELECT
                                U.id AS user_id,
                                U.name as user_name,
                                A.id AS asset_id,
                                A.symbol AS symbol,
                                A.current_price AS current_price,
                                UA.amount AS amount
                            FROM
                                Users U
                                LEFT JOIN User_assets UA ON U.id = UA.user_id
                                LEFT JOIN Assets A ON UA.asset_id = A.id
                            WHERE
                                U.cpf = $1 AND UA.amount IS NOT NULL;
                            `;

        const result = await this.pool.query(sqlCommand, [cpf]);

        if (result.rowCount === 0) {
            return null;
        }

        const userAsset: UserAsset[] = result.rows.map((row) => {
            const asset = new Asset(
                row.asset_id,
                row.symbol,
                row.current_price
            );
            return new UserAsset(row.amount, asset);
        });

        return userAsset;
    }
}
