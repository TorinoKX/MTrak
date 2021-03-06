import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Taken, takenHist } from '../models/history';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  history: Observable<Array<Taken>>;
  historyList: Observable<Array<takenHist>>;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.historyList = this.storageService.getHistoryList();
    this.history = this.storageService.getHistory()
    console.log(this.historyList)
    console.log(this.history)
    // await this.storageService.getHistory()
    // .then((data) => {
    //   console.log(data)
    //   this.history = data;
    //   console.log(this.history)
    // })
  }

  //Converts number from 0-6 to a day of the week, 0 being Sunday and 6 being Saturday. Returns this value.
  getStringDay(day: Number) {
    var stringDay = ''
    switch (day) {
      case 0:
        stringDay = 'Sunday'
        break;
      case 1:
        stringDay = 'Monday'
        break;
      case 2:
        stringDay = 'Tuesday'
        break;
      case 3:
        stringDay = 'Wednesday'
        break;
      case 4:
        stringDay = 'Thursday'
        break;
      case 5:
        stringDay = 'Friday'
        break;
      case 6:
        stringDay = 'Saturday'
        break;
      default:
        break;
    }
    return stringDay;
  }
}
