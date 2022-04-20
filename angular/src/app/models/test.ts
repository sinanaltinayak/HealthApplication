import { Diagnosis } from "./diagnosis";

export class Test{
    patientID!: string;
    doctorID!: string;
    date!: string;
    symptoms!: string;
    resultString!: string;
    result!: Diagnosis[];
    note!: string;

    constructor(patientID: string, doctorID: string, date: string, symptoms: string, resultString: string) {
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.date = date;
        this.symptoms = symptoms;
        this.resultString = resultString;
    }
}