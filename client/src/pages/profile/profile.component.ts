import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';



@Component({
  selector: 'Profile',
  templateUrl: 'profile.html',
  providers: [MyLocation]
})
export class ProfileComponent {

  constructor(public navCtrl: NavController, public myLocation: MyLocation) {

  }

}
