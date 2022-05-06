import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  name='';
  manufacturer = '';
  quantity = 0;
  startDate = '';
  endDate = '';
  btnText='Add';

  constructor(private navParams:NavParams, private modalController:ModalController) { }

  ngOnInit() {
    this.name = this.navParams.get('name')
    this.manufacturer = this.navParams.get('manufacturer')
    this.quantity = this.navParams.get('quantity')
    this.startDate = this.navParams.get('startDate')
    this.endDate = this.navParams.get('endDate')

    if (this.name != undefined){
      this.btnText = 'Edit';
    }else{
      this.btnText = 'Add';
  }
  }

  //Closes the modal, passes back all of the information
  closeModal(){
    this.modalController.dismiss({name : this.name, manufacturer: this.manufacturer, quantity: this.quantity, startDate: this.startDate, endDate: this.endDate});
  }

  //Closes the modal and passes back no information
  cancelModal(){
    this.modalController.dismiss();
  }
}
