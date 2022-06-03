export class Monitor{
    patientID!: string;
    createdAt!: number;
    highBP!: number;
    lowBP!: number;
    temperature!: number;
    bloodSugarLevel!: number;

    constructor(patientID: string, createdAt: number, highBP: number, lowBP: number, temperature: number, bloodSugarLevel: number) {
        this.patientID = patientID;
        this.createdAt = createdAt;
        this.highBP = highBP;
        this.lowBP = lowBP;
        this.temperature = temperature;
        this.bloodSugarLevel = bloodSugarLevel;
    }
}