import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { App } from 'ionic-angular';
import { AjaxService } from '../../common/ajax.service';
import { Subscription } from 'rxjs/Subscription';
import { EventForm } from './eventform';
import { ModalController } from 'ionic-angular';
// import { SelectUserModal } from './selectuserModal';





@Component({
  selector: 'CreateEvent',
  templateUrl: 'create-event.html',
  providers: [MyLocation]
})
export class CreateEvent {
 subscription: Subscription;
  constructor(public navCtrl: NavController,
    public myLocation: MyLocation,
    public appCtrl: App,
    public ajax: AjaxService,
    public modalCtrl: ModalController

  ) {

  }

  model = new EventForm('','','','Sponsered','close','');
 
 ionViewWillEnter() {
 	this.GetLocation();
 	
 }


  GetLocation() {
    this.subscription = this.myLocation.CheckForGps().subscribe(data => {
      localStorage.setItem('MyLocation', JSON.stringify(data));
      if(data){
      	this.model.location = data.Result[0].formatted_address;
      }
    });
  }

  onSubmit(empForm: any, event: Event) {
    event.preventDefault();
    console.log(this.model)
  }

  openModal() {
    // let myModal = this.modalCtrl.create(SelectUserModal);
    // myModal.present();
  }

}
