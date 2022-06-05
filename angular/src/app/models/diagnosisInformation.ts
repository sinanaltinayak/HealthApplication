export class DiagnosisInformation{
    name!: string;
    department!: string;
    description!: string;
    precautions!: string[];

    constructor(name: string, department: string, description: string, precautions: string[]) {
        this.name = name;
        this.department = department;
        this.description = description;
        this.precautions = precautions;
    }

}