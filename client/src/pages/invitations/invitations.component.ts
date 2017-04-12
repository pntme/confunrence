import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';



@Component({
  selector: 'Invitations',
  templateUrl: 'invitations.html',
  providers: [MyLocation]
})
export class InvitationsComponent {
 
  constructor(public navCtrl: NavController, public myLocation: MyLocation) {

  }

}
