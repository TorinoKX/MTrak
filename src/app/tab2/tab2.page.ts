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
    { name: "Lisinopril", manufacturer: "Lupin Ltd.", startDate: "", endDate: "" },
    { name: "Levothyroxine", manufacturer: "Abbott Labs", startDate: "", endDate: "" },
    { name: "Gabapentin", manufacturer: "Pfizer", startDate: "", endDate: "" },
    { name: "Metformin", manufacturer: "Bristol-Myers Squibb", startDate: "", endDate: "" },
    { name: "Lipitor", manufacturer: "Viatris", startDate: "", endDate: "" },
    { name: "Amlodipine", manufacturer: "Synthon Pharmaceuticals Inc", startDate: "", endDate: "" }
  ];

  constructor(private modalController: ModalController) { }

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

  async editMedication(index) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {name: this.medications[index].name, manufacturer: this.medications[index].manufacturer, startDate: this.medications[index].startDate, endDate: this.medications[index].endDate}
    });

    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data !== undefined) {
          this.medications[index] = retval.data
        }
      });
      return modal.present();
  }

  deleteMedication(index) {
    this.medications.splice(index, 1);
  }
}

