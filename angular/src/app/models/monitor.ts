export class Monitor{
    patientID!: string;
    createdAt!: number;
    SystolicBP!: number;
    DiastolicBP!: number;
    Temperature!: number;
    RandomBloodSugarLevel!: number;

    constructor(patientID: string, createdAt: number, highBP: number, lowBP: number, temperature: number, bloodSugarLevel: number) {
        this.patientID = patientID;
        this.createdAt = createdAt;
        this.SystolicBP = highBP;
        this.DiastolicBP = lowBP;
        this.Temperature = temperature;
        this.RandomBloodSugarLevel = bloodSugarLevel;
    }
}