export class Doctor{
    fullname!: string;
    email!: string;
    profession!: string;
    password!: string;

    constructor(fullname: string, email: string, profession: string,  password: string) {
        this.fullname = fullname;
        this.email = email;
        this.profession = profession;
        this.password = password;
    }
}