import { Account } from "./account";

export class User {
    public name: string;
    public cpf: string;
    public account?: Account;
    
    constructor(name: string, cpf: string, account?: Account) {
        this.name = name;
        this.cpf = cpf;
        this.account = account;
    }
}