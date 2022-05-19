import { Component } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  untaken = ["Lisinopril", "Levothyroxine", "Gabapentin"]
  taken = ["Metformin", "Lipitor", "Amlodipine"]

  medications = []

  constructor(private storageService: StorageService) {
  }

  async ngOnInit() {
    let today = new Date()
    await this.storageService.getHistory()
    .then((data) => {
      console.log(data)
      this.medications = data.find(o => o.date.toLocaleDateString() == today.toLocaleDateString()).medications
      console.log(this.medications)
    })
  }

  async updateHist() {
    await this.storageService.updateHistory(this.medications, new Date())
  }  
}
