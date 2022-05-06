import { Component } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  medications = [
    { name: "Lisinopril", manufacturer: "Lupin Ltd.", quantity: 2, startDate: "04/05/22", endDate: "04/08/22" },
    { name: "Levothyroxine", manufacturer: "Abbott Labs", quantity: 1, startDate: "04/05/22", endDate: "04/08/22" },
    { name: "Gabapentin", manufacturer: "Pfizer", quantity: 4, startDate: "04/05/22", endDate: "04/08/22" },
    { name: "Metformin", manufacturer: "Bristol-Myers Squibb", quantity: 2, startDate: "04/05/22", endDate: "04/08/22" },
    { name: "Lipitor", manufacturer: "Viatris", quantity: 2, startDate: "04/05/22", endDate: "04/08/22" },
    { name: "Amlodipine", manufacturer: "Synthon Pharmaceuticals Inc", quantity: 1, startDate: "04/05/22", endDate: "04/08/22" }
  ];

  constructor(private modalController: ModalController) { }

  //Opens the modal with no inputs, checks if data is returned from the modal and adds it to the list if there is data.
  async addMedication() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data != undefined) {
          this.medications.push(retval.data);
        }
      });
    return modal.present();
  }

  //Opens the modal with the data from the list item to be edited, checks if data is returned from the modal and changes the list item to match returned data.
  async editMedication(index) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {name: this.medications[index].name, manufacturer: this.medications[index].manufacturer, quantity: this.medications[index].quantity, startDate: this.medications[index].startDate, endDate: this.medications[index].endDate}
    });

    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data !== undefined) {
          this.medications[index] = retval.data
        }
      });
      return modal.present();
  }

  //Removes list item at the index supplied
  deleteMedication(index) {
    this.medications.splice(index, 1);
  }
}

