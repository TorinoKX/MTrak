import { uuid } from "../services/uuid.service";

export class Medication {
    public constructor(init?:Partial<Medication>){
        this.id = uuid()
        this.deletedDate = null
        Object.assign(this, init);
    }
    id: String
    name: String
    manufacturer: String
    amountTaken: Number
    startDate: Date
    endDate: Date
    deletedDate: Date
}
