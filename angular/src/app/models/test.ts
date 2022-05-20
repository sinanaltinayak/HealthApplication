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

    constructor(patientID: string, doctorID: string, chatID: string, date: string, symptoms: string, resultString: string) {
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.chatID = chatID;
        this.date = date;
        this.symptoms = symptoms;
        this.resultString = resultString;
    }
}