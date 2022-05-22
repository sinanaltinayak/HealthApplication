export class Monitor{
    patientID!: string;
    date!: string;
    highBP!: number;
    lowBP!: number;
    temprature!: number;
    bloodSugarLevel!: number;

    constructor(patientID: string, date: string, highBP: number, lowBP: number, temprature: number, bloodSugarLevel: number) {
        this.patientID = patientID;
        this.date = date;
        this.highBP = highBP;
        this.lowBP = lowBP;
        this.temprature = temprature;
        this.bloodSugarLevel = bloodSugarLevel;
    }
}