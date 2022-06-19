export class Monitor{
    patientID!: string;
    Date!: number;
    SystolicBP!: number;
    DiastolicBP!: number;
    Temperature!: number;
    RandomBloodSugarLevel!: number;

    constructor(patientID: string, Date: number, highBP: number, lowBP: number, temperature: number, bloodSugarLevel: number) {
        this.patientID = patientID;
        this.Date = Date;
        this.SystolicBP = highBP;
        this.DiastolicBP = lowBP;
        this.Temperature = temperature;
        this.RandomBloodSugarLevel = bloodSugarLevel;
    }
}