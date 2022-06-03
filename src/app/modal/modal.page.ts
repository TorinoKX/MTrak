import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { Medication } from '../models/medication';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  medication: Medication;
  btnText = 'Add';

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {

    this.medication = this.navParams.get('medication')

    if (this.medication != undefined) {
      this.btnText = 'Edit';
    } else {
      this.medication = new Medication();
      this.medication.name = '';
      this.medication.manufacturer = '';
      this.medication.amountTaken = 0;
      this.medication.startDate = new Date();
      this.medication.endDate = new Date();
      this.btnText = 'Add';
    }
  }

  //Closes the modal, passes back all of the information
  closeModal() {
    this.modalController.dismiss(this.medication);
  }

  //Closes the modal and passes back no information
  cancelModal() {
    this.modalController.dismiss();
  }

  imageSelected(files) {
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.medication.photo = e.target.result as String;
    };
    fileReader.readAsDataURL(files[0]);
  }
}
