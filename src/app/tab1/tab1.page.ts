import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Taken } from '../models/history';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  history: Observable<Array<Taken>>
  today: Date;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.today = new Date();
    this.history = this.storageService.getHistoryByDate(this.today);
    this.history.subscribe(console.log);
  }

  updateHist() {
    console.log(this.history)
    // this.storageService.updateHistory(this.history.medications, new Date());
    console.log(this.history)
  }

  takeMedication(id: String) {
    console.log('takeMedication' + id);
    this.storageService.takeMedication(id, this.today)
  }
  removeHistory(id: String) {
    console.log('removeHistory' + id);
    this.storageService.unTakeMedication(id)
  }
}
