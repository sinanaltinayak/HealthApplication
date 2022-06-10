export class Admin{
    fullname!: string;
    id!: string;
    email!: string;
    department!: string;
    rate!: string;
    lastMonth!: number;
    lastYear!: number;
    lastLogin!: string;

    constructor(fullname: string, id: string, email: string, department: string,  rate: string) {
        this.fullname = fullname;
        this.id = id;
        this.department = department;
        this.rate = rate;
    }
}