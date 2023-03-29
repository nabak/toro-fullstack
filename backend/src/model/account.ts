import { User } from "./user";

export class Account {
    public id?: number;
    public balance: number;
    public owner: User;

    constructor(owner: User, id?: number, balance: number = 0) {
        if (id) this.id = id;
        this.owner = owner;
        this.balance = balance;

        if (!this.owner.account) this.owner.account = this;
    }
}
