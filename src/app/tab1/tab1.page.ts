import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { History, historyMed } from '../history';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  history: History

  constructor(private storageService: StorageService) {
    let today = new Date()
    this.storageService.getHistoryByDate(today).subscribe(d=>{ this.history=d; console.log(d) });
  }

  ngOnInit() {
  }

  updateHist() {
    this.storageService.saveHist();
  }

  resetHistory() {
    this.storageService.clearHist();
  }
}
