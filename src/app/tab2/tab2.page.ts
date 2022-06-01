import { Component } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';

import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { Medication } from '../medication';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  medications: Observable<Array<Medication>>;

  constructor(private modalController: ModalController, private storageService: StorageService) { }

  ngOnInit() {
    this.medications = this.storageService.getMeds();
    // await this.storageService.getMeds()
    // .then((data) => {
    //   console.log(data)
    //   this.medications = data;
    //   console.log(this.medications)
    // })
  }

  //Opens the modal with no inputs, checks if data is returned from the modal and adds it to the list if there is data.
  async addMedication() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data != undefined) {
          console.log(retval.data)
          this.storageService.addMed(retval.data);
        }
      });
    return modal.present();
  }

  //Opens the modal with the data from the list item to be edited, checks if data is returned from the modal and changes the list item to match returned data.
  async editMedication(index) {
    let medicationToEdit = this.storageService.getMedication(index);
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {medication: medicationToEdit}
    });

    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data !== undefined) {
          // this.medications[index] = retval.data
          // this.storageService.setMeds(this.medications)
          this.storageService.saveMeds()
        }
      });
      return modal.present();
  }

  deleteMedications(index) {
    this.storageService.deleteMedication(index)
  }
}