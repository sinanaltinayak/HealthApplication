import { Diagnosis } from "./diagnosis";

export class Test{
    patientID!: string;
    doctorID!: string;
    chatID!: string;
    date!: string;
    symptoms!: string;
    resultString!: string;
    result!: Diagnosis[];
    note!: string;
    fullname?: string;
    finalDiagnosis?: string;
    unRead: boolean = false;
    rate!: string;
    department!: string;

    constructor(patientID: string, doctorID: string, chatID: string, date: string, symptoms: string, resultString: string, finalDiagnosis: string, department: string) {
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.chatID = chatID;
        this.date = date;
        this.symptoms = symptoms;
        this.resultString = resultString;
        this.finalDiagnosis = finalDiagnosis;
        this.department = department;

    }
}