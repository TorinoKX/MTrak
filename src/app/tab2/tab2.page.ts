import { Component } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';

import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  medications = [];

  constructor(private modalController: ModalController, private storageService: StorageService) { }

  async ngOnInit() {
    await this.storageService.getMeds()
    .then((data) => {
      console.log(data)
      this.medications = data;
      console.log(this.medications)
    })
  }

  //Opens the modal with no inputs, checks if data is returned from the modal and adds it to the list if there is data.
  async addMedication() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data != undefined) {
          this.medications.push(retval.data);
          this.storageService.setMeds(this.medications)
        }
      });
    return modal.present();
  }

  //Opens the modal with the data from the list item to be edited, checks if data is returned from the modal and changes the list item to match returned data.
  async editMedication(index) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {name: this.medications[index].name, manufacturer: this.medications[index].manufacturer, amountTaken: this.medications[index].amountTaken, startDate: this.medications[index].startDate, endDate: this.medications[index].endDate}
    });

    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data !== undefined) {
          this.medications[index] = retval.data
          this.storageService.setMeds(this.medications)
        }
      });
      return modal.present();
  }

  //Removes list item at the index supplied
  deleteMedication(index) {
    this.medications.splice(index, 1);
  }
}

