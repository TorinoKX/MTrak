export class ChartViewModel {
    public constructor(init?:Partial<ChartViewModel>){
        Object.assign(this, init);
    }
    labels: String[];
    taken: Number[];
    notTaken: Number[];
}