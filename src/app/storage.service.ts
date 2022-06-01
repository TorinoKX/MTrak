import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medication } from './medication';
import { History, historyMed } from './history';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  medications: Medication[] = [];
  history: History[] = [];
  medicationsSubject = new BehaviorSubject(this.medications);
  historySubject = new BehaviorSubject(this.history);

  constructor(private storage: Storage) {
    let hist = new History();
    hist.date = null;
    hist.medications = [];
    this.history = [hist];
  }


  async initializeStorage() {
    const storage = await this.storage.create();

    const newMed = new Medication();
    newMed.name = 'Example medication';
    newMed.manufacturer = 'Example Manufacturer';
    newMed.amountTaken = 1;
    newMed.startDate = new Date(2022, 0, 1);
    newMed.endDate = new Date(2100, 0, 1);

    const newHistMed = new historyMed();
    newHistMed.medication = newMed;
    newHistMed.taken = true

    const newHist = new History();
    newHist.date = new Date(2022, 4, 20);
    newHist.medications = [newHistMed]

    // this.medications = [newMed]
    // this.history = [newHist]

    if (await this.storage.get('medications') == null) {
      await this.storage.set('medications', [newMed]);
      this.medications = [newMed];
    }
    else {
      this.medications = await this.storage.get('medications');
    }

    if (await this.storage.get('history') == null) {
      await this.storage.set('history', [newHist]);
      this.history = [newHist];
    }
    else {
      this.history = await this.storage.get('history')
    }

    this.medicationsSubject.next(this.medications);
    this.historySubject.next(this.history);

    this.medicationsSubject.subscribe((d) => {
      console.log(d);
      if (this.history.some(e => e.date.toDateString() == new Date().toDateString())) {
        d.forEach(med => {
          console.log(med)
          if (!(this.history.find(e => e.date.toLocaleDateString() == new Date().toLocaleDateString()).medications.some(e => e.medication === med))) {
            let newHistMed = new historyMed();
            newHistMed.medication = med;
            newHistMed.taken = false;
            this.history.find(e => e.date.toLocaleDateString() == new Date().toLocaleDateString()).medications.push(newHistMed);
          }
        });
        let oldMeds = this.history.find(e => e.date.toLocaleDateString() == new Date().toLocaleDateString()).medications
        console.log(oldMeds)
        let results = oldMeds.filter(histMed => d.includes(histMed.medication));
        this.history.find(e => e.date.toLocaleDateString() == new Date().toLocaleDateString()).medications = results
      }
    });
  }

  addMed(data: Medication) {
    console.log(data)
    this.medications.push(data);
    console.log(this.medications)
    this.saveMeds();
  }

  //Removes list item at the index supplied
  deleteMedication(index) {
    this.medications.splice(index, 1);
    this.saveMeds()
  }

  saveMeds() {
    console.log("saved")
    this.medicationsSubject.next(this.medications)
    this.storage.set('medications', this.medications);
  }

  saveHist() {
    console.log("saved")
    this.storage.set('history', this.history);
  }

  getMedication(index): Medication {
    return this.medications[index];
    // return await this.storage.get('medications')
  }

  getMeds(): Observable<Array<Medication>> {
    return this.medicationsSubject.asObservable();
    // return await this.storage.get('medications')
  }

  setMeds(data) {
    console.log(data)
    this.medications = data;
    this.medicationsSubject.next(this.medications);
    this.storage.set('medications', data);
  }

  getHistory(): Observable<Array<History>> {
    return this.historySubject.asObservable();
    // return await this.storage.get('history')
  }

  getHistoryByDate(date: Date): Observable<History> {
    console.log("getHistoryByDate");
    let x = this.historySubject.pipe(
      map(res => {
        console.log(res)
        let hist = res.find(o => o.date.toLocaleDateString() == date.toLocaleDateString());
        if (hist == null) {
          hist = new History();
          hist.date = date
          hist.medications = []
          this.history.push(hist)
        }

        this.medications.filter(med => med.endDate.toLocaleDateString() >= date.toLocaleDateString()).forEach((med) => {
          console.log(med)
          if (hist.medications.find(m => m.medication.name == med.name) == null) {
            let medToAdd = new historyMed();
            medToAdd.medication = med;
            medToAdd.taken = false;
            hist.medications.push(medToAdd);
          }
        });
        return hist;
      })
    );
    x.subscribe(d => { console.log(d) })
    return x;
  }

  setHistory(data) {
    this.history = data
    this.storage.set('history', data)
  }

  async updateHistory(meds, date) {
    this.history.find(o => o.date.toLocaleDateString() == date.toLocaleDateString()).medications = meds
  }


  // async historyToDate() {
  //   let today = new Date()
  //   this.medications = this.medications.filter(med => med.endDate >= today)
  //   this.setHistoryToDate(today)
  // }

  // async setHistoryToDate(today: Date) {
  //   if (this.history[this.history.length - 1].date.toLocaleDateString() < today.toLocaleDateString()) {
  //     let histToSet: History = new History();
  //     histToSet.date = today
  //     histToSet.medications = []

  //     console.log(this.medications)

  //     this.medications.forEach((med) => {
  //       console.log(med)
  //       let medToAdd = new historyMed();
  //       medToAdd.medication = med;
  //       medToAdd.taken = false;
  //       histToSet.medications.push(medToAdd);
  //     });

  //     console.log(histToSet)
  //     console.log(this.history)

  //     this.history.push(histToSet)

  //     console.log(this.history)
  //   }
  // }

  clearHist() {
    this.storage.set('history', null);
  }

  clearMeds() {
    this.storage.set('medications', null);
  }
}

