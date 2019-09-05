export class Register {
    name:string;
    email: string;
    password: string;
    walletAddress: string;
    role: number;

    constructor(register) {
        this.name = register.name || '';
        this.email = register.email || '';
        this.password = register.password || '';
        this.walletAddress = register.walletAddress || '';
        this.role = register.role || '';
    }
}