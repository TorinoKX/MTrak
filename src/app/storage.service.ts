import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async initializeStorage() {
    const storage = await this.storage.create();

    if (await this.storage.get('medications') == null) {
      await this.storage.set('medications',
        [
          {
            name: 'Example medication',
            Manufacturer: 'Example Manufacturer',
            amountTaken: 1,
            startDate: '01/01/1980',
            endDate: '01/01/2100'
          }
        ]
      )
    }

    if (await this.storage.get('history') == null) {
      await this.storage.set('history',
        [
          {
            date: new Date(),
            medications: [
              {
                name: 'Example medication',
                amountTaken: 1,
                taken: false
              }
            ]
          }
        ]
      )
    }

  }

  async getMeds(): Promise<Array<any>> {
    return await this.storage.get('medications')
  }

  async setMeds(data) {
    await this.storage.set('medications', data)
  }

  async getHistory(): Promise<Array<any>> {
    return await this.storage.get('history')
  }

  async setHistory(data) {
    await this.storage.set('history', data)
  }

  async updateHistory(meds, date) {
    await this.getHistory()
    .then((data) => {
      console.log(data)
      data.find(o => o.date.toLocaleDateString() == date.toLocaleDateString()).medications = meds
      this.setHistory(data)
    })
  }
}
