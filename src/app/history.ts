import { Medication } from "./medication"

export class historyMed {
    medication: Medication
    taken: Boolean
}

export class History {
    date: Date
    medications: Array<historyMed>
}
