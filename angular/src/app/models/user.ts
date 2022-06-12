export class User{
    id!: string;
    fullname!: string;
    email!: string;
    password!: string;
    role!: string;
    gender!: string;
    birthday!: string;
    phoneNumber!: string;
    profilePicture!: string;
    lastLogin!: string;
    department: string = "";
    height!: string;
    weight!: string;

    constructor(id: string, fullname: string, email: string, password: string, role: string, gender: string, birthday: string, phoneNumber: string, profilePicture: string, height: string, weight: string) {
        this.fullname = fullname;
        this.email = email;
        this.id = id;
        this.password = password;
        this.role = role;
        this.gender = gender;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
        this.height = height;
        this.weight = weight;
    }
}