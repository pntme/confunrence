import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';



@Component({
  selector: 'Home',
  templateUrl: 'home.html',
  providers: [MyLocation]
})
export class HomeComponent {
 
  constructor(public navCtrl: NavController, public myLocation: MyLocation) {

  }

}
