export class MedicalHistory{
    patientID!: string;
    question1!: string;
    question2!: string;
    question3!: string;
    question4!: string;
    question5!: string;

    constructor(patientID: string, question1: string, question2: string, question3: string, question4: string, question5: string) {
        this.patientID = patientID;
        this.question1 = question1;
        this.question2 = question2;
        this.question3 = question3;
        this.question4 = question4;
        this.question5 = question5;
    }

    isEmpty(): boolean{
        if(this.patientID)
            return false
        else
            return true
    }
}