export class DiagnosisPrecaution{
    name!: string;
    precautions!: string[];
    
    constructor(name: string, precautions: string[]) {
        this.name = name;
        this.precautions = precautions;
    }

}