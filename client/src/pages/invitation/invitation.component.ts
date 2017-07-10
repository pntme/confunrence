import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { Locations } from './locations'



@Component({
  selector: 'Invitation',
  templateUrl: 'invitation.html',
  providers: [MyLocation, Locations]
})
export class InvitationPage {

  constructor(public navCtrl: NavController, public myLocation: MyLocation, public locations: Locations) {

  }

  ionViewDidLoad() {
    this.locations.load();
  }

}
