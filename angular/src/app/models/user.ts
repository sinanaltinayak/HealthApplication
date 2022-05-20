export class User{
    id!: string;
    fullname!: string;
    email!: string;
    password!: string;
    role!: string;

    constructor(id: string, fullname: string, email: string, password: string, role: string) {
        this.fullname = fullname;
        this.email = email;
        this.id = id;
        this.password = password;
        this.role = role;
    }
}