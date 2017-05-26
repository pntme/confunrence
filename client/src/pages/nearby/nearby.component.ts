import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';



@Component({
  selector: 'Nearby',
  templateUrl: 'nearby.html',
  providers: [MyLocation]
})
export class NearbyPage {

  constructor(public navCtrl: NavController, public myLocation: MyLocation) {

  }

}
