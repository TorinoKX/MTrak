import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  history = [
    {
      date: new Date('05/04/2022'),
      medications: [{
        name: "Lisinopril",
        taken: true
      },
      {
        name: "Levothyroxine",
        taken: true
      },
      {
        name: "Gabapentin",
        taken: false
      }
      ]
    },
    {
      date: new Date('05/03/2022'),
      medications: [{
        name: "Lisinopril",
        taken: false
      },
      {
        name: "Levothyroxine",
        taken: false
      },
      {
        name: "Gabapentin",
        taken: true
      }
      ]
    }
  ]
  constructor() { }

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
