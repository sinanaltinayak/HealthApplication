export class User{
    id!: string;
    fullname!: string;
    email!: string;
    password!: string;
    role!: string;
    gender!: string;
    birthday!: string;
    phoneNumber!: string;

    constructor(id: string, fullname: string, email: string, password: string, role: string, gender: string, birthday: string, phoneNumber: string) {
        this.fullname = fullname;
        this.email = email;
        this.id = id;
        this.password = password;
        this.role = role;
        this.gender = gender;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
    }
}