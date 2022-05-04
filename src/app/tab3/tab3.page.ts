import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  history = [
    {
      date: 'Wed - 04/05/2022',
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
      date: 'Tue - 03/05/2022',
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

}
