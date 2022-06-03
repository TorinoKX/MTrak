import { uuid } from "../services/uuid.service"
// import { Medication } from "./medication"

// export class historyMed {
//     medication: Medication
//     taken: Boolean
// }

// export class History {
//     date: Date
//     medications: Array<historyMed>
// }


export class Taken {
    public constructor(init?:Partial<Taken>){
        this.id = uuid();
        Object.assign(this, init);
    }
    id: String;
    date: Date;
    medicationId: String;
    medication: String;
    amountTaken: Number;
    taken:Boolean;
}

export class takenHist {
    public constructor(init?:Partial<takenHist>){
        Object.assign(this, init);
    }
    date: Date;
    taken: String[];
    untaken: String[];
}