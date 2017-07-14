import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { Locations } from './locations';
import { App } from 'ionic-angular';
import { ProfileComponent } from '../profile/profile.component';
import { AjaxService } from '../../common/ajax.service';




@Component({
  selector: 'Invitation',
  templateUrl: 'invitation.html',
  providers: [MyLocation, Locations]
})
export class InvitationPage {

  constructor(public navCtrl: NavController,
    public myLocation: MyLocation,
    public locations: Locations,
    public appCtrl: App,
    public ajax: AjaxService

  ) {

  }

  ionViewDidEnter() {
    this.myLocation.CheckForGps().subscribe(data => {
      if (data) {
        this.locations.load(data.Position.coords);
        // localStorage.setItem('MyLocation', JSON.stringify(data));
      }
    });
  }

  userSelcted(location) {
    console.log(location)
    this.appCtrl.getRootNav().push(ProfileComponent, { id: location.id });
  }

}
