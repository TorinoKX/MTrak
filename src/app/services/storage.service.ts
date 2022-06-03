import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Medication } from '../models/medication';
import { Taken, takenHist } from '../models/history';
import { filter, map } from 'rxjs/operators';
import { ChartViewModel } from '../models/chartViewModel';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  isInitialized = false;
  medications: Medication[] = [];
  taken: Taken[] = [];
  medicationsSubject = new BehaviorSubject(this.medications);
  takenSubject = new BehaviorSubject(this.taken);

  constructor(private storage: Storage) {
  }


  async initializeStorage() {
    const storage = await this.storage.create();

    this.taken = await this.storage.get('taken') || [];

    this.medicationsSubject.subscribe(t => {
      if (this.isInitialized) {
        console.log("Persist Medications")
        this.storage.set('medications', this.medications);
      }
    });

    this.takenSubject.subscribe(t => {
      if (this.isInitialized) {
        console.log("Persist Taken");
        this.storage.set('taken', this.taken);
      }
    });

    console.log(this.taken);


    // this.medications = [newMed]
    // this.history = [newHist]

    if (await this.storage.get('medications') == null) {
      const newMed1 = new Medication({ name: 'Example medication', manufacturer: 'Example Manufacturer', amountTaken: 2, startDate: new Date(2022, 4, 29), endDate: new Date(2025, 0, 1) });
      const newMed2 = new Medication({ name: 'Pilot', manufacturer: '"Hair loss" medication', amountTaken: 7, startDate: new Date(2022, 4, 15), endDate: new Date(2069, 6, 9) });

      await this.storage.set('medications', [newMed1, newMed2]);
      this.medications = [newMed1, newMed2];

      // this.takeMedication(newMed.id, )
    }
    else {
      this.medications = await this.storage.get('medications');
    }

    this.isInitialized = true;

    console.log(this.storage.get('medications'))

    this.takenSubject.next(this.taken);
    this.medicationsSubject.next(this.medications);

    console.log(this.medications)
  }

  addMed(data: Medication) {
    this.medications.push(data);
    this.medicationsSubject.next(this.medications)
  }

  //Removes list item at the index supplied
  deleteMedication(id) {
    console.log(id)
    console.log(this.medications)
    this.medications.find((medication) => medication.id == id).deletedDate = new Date()
    this.medicationsSubject.next(this.medications)
  }

  saveMeds() {
    this.medicationsSubject.next(this.medications)
  }

  getMedication(id): Medication {
    return this.medications.find((medication) => medication.id == id);
  }

  getMeds(): Observable<Array<Medication>> {
    return this.medicationsSubject.pipe(
      map((medications) => {
        return medications.filter((medication) => !medication.deletedDate)
      })
    )
  }

  getHistory(): Observable<Taken[]> {
    return this.takenSubject.asObservable();
  }

  getHistoryByDate(date: Date): Observable<Taken[]> {
    console.log("getHistoryByDate");

    const res = combineLatest([this.takenSubject, this.medicationsSubject]).pipe(
      map(([taken, meds]) => {
        const takenToday = taken.filter((e => e.date.toDateString() == date.toDateString()));
        const notTakenMeds = meds.filter(i => !i.deletedDate && takenToday.findIndex(m => m.medicationId == i.id) < 0);
        const notTaken = notTakenMeds.map(m => new Taken({ id: m.id, date: date, medication: m.name, amountTaken: 0, taken: false }))
        return [...takenToday, ...notTaken];
      })
    );
    return res as Observable<Taken[]>;
  }

  getChartData(startDate: Date, endDate: Date, medIDs: String[]): Observable<ChartViewModel> {
    let dateRange = new Array<Date>();
    for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(new Date(d));
    }
    const res = combineLatest([of(dateRange), this.takenSubject, this.medicationsSubject]).pipe(
      map(([dates, takenMeds, allMeds]) => {
        console.log("in map")
        let labels = new Array<String>();
        let taken = new Array<Number>();
        let notTaken = new Array<Number>();
        dates.forEach(d => {
          labels.push(d.toLocaleDateString());
          const takenToday = takenMeds.filter(e => !medIDs || medIDs.findIndex(m=>m == e.medicationId) >= 0 )
            .filter((e => e.date.toLocaleDateString() == d.toLocaleDateString()));
          if (takenToday.length > 0) {
            let amountTaken = takenToday.map(m => m.amountTaken).reduce((sum, t) => { return Number(sum) + Number(t) })
            taken.push(amountTaken);
          }
          else {
            taken.push(0)
          }
          let notTakenToday = allMeds.filter(e => !medIDs || medIDs.findIndex(m=>m == e.id) >= 0 )
            .filter(i => (!i.deletedDate || i.deletedDate <= d) && takenToday.findIndex(m=>m.medicationId == i.id) < 0 && i.startDate <= d && i.endDate >= d);
          if (notTakenToday.length > 0) {
            let amountNotTaken = notTakenToday.map(m => m.amountTaken).reduce((sum, t) => { return Number(sum) + Number(t) })
            notTaken.push(amountNotTaken);
          }
          else {
            notTaken.push(0)
          }
        })
        return new ChartViewModel({ labels, taken, notTaken });
      })
    );
    return res as Observable<ChartViewModel>;
  }

  getHistoryList(): Observable<takenHist[]> {
    let endDate = new Date()
        endDate.setDate(endDate.getDate())
    let startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 30)
    let dateRange = new Array<Date>();
    for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(new Date(d));
    }
    const res = combineLatest([of(dateRange), this.takenSubject, this.medicationsSubject]).pipe(
      map(([dates, takenMeds, allMeds]) => {
        let taken = new Array<takenHist>();
        dates.forEach(d => {
          const todayList = new takenHist({date: d})
          const takenToday = takenMeds.filter((e => e.date.toLocaleDateString() == d.toLocaleDateString()));
          if (takenToday.length > 0) {
            todayList.taken = takenToday.map(m => m.medication)
          }
          else {
            todayList.taken = []
          }
          let notTakenToday = allMeds.filter(i => (!i.deletedDate || i.deletedDate <= d) && takenToday.findIndex(m=>m.medicationId == i.id) < 0 && i.startDate <= d && i.endDate >= d);
          if (notTakenToday.length > 0) {
            todayList.untaken = notTakenToday.map(m => m.name)
          }
          else {
            todayList.untaken = []
          }
          taken.push(todayList)
        })
        return taken.reverse();
      })
    );
    return res.pipe(
      map(h => {
        return h.filter(e => e.taken.length > 0 || e.untaken.length > 0)
      })
    );
  }

  takeMedication(id: String, date: Date) {
    const med = this.medications.find(m => m.id == id);
    const newTake = new Taken({ date, medication: med.name, medicationId: med.id, amountTaken: med.amountTaken, taken: true });
    this.taken.push(newTake);
    this.takenSubject.next(this.taken);
    // this.saveTaken();
  }

  unTakeMedication(id: String) {
    const t = this.taken.findIndex(m => m.id == id);
    this.taken.splice(t, 1);
    this.takenSubject.next(this.taken);
  }
}

