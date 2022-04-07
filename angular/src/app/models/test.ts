export class Test{
    patientID!: string;
    doctorID!: string;
    date!: string;
    symptoms!: string;
    result!: string;

    constructor(patientID: string, doctorID: string, date: string, symptoms: string, result: string) {
        this.patientID = patientID;
        this.doctorID = doctorID;
        this.date = date;
        this.symptoms = symptoms;
        this.result = result;
    }
}