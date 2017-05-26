import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';



@Component({
  selector: 'Invitation',
  templateUrl: 'invitation.html',
  providers: [MyLocation]
})
export class InvitationPage {

  constructor(public navCtrl: NavController, public myLocation: MyLocation) {

  }

}
