export class Diagnosis{
    name!: string;
    probability!: number;

    constructor(name: string, probability: number) {
        this.name = name;
        this.probability = probability;
    }

    ToString(){
        return this.name + "," + this.probability;
    }
}