export class Login {
    username: string;
    password: string;

    constructor(login) {
        this.username = login.username || '';
        this.password = login.password || '';
    }
}