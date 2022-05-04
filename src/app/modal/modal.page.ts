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
  startDate = '';
  endDate = '';
  btnText='Add';

  constructor(private navParams:NavParams, private modalController:ModalController) { }

  ngOnInit() {
    this.name = this.navParams.get('name')
    this.manufacturer = this.navParams.get('manufacturer')
    this.startDate = this.navParams.get('startDate')
    this.endDate = this.navParams.get('endDate')

    if (this.name != undefined){
      this.btnText = 'Edit';
    }else{
      this.btnText = 'Add';
  }
  }

  closeModal(){
    this.modalController.dismiss({name : this.name, manufacturer: this.manufacturer, startDate: this.startDate, endDate: this.endDate});
  }

  cancelModal(){
    this.modalController.dismiss();
  }
}
