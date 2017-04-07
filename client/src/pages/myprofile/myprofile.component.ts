import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'my-profile',
  templateUrl: 'myprofile.html',
  providers: [MyLocation]
})
export class MyProfileComponent {
  ProfileData = {};
  subscription: Subscription;
  constructor(public navCtrl: NavController, public myLocation: MyLocation) {

  }
  ionViewWillEnter() {
    this.subscription = this.myLocation.CheckForGps().subscribe(data => {
      console.log(data)
      if (data === false) {
        console.log("GPS is off");
      } else if (data === true) {
        this.myLocation.Get().subscribe(data => {
          console.log(data)
        }, err => {
          console.log(err)
        });
      }
    });
    let UserData: string = localStorage.getItem("ionic_user_5ad47bc5");
    // if(localStorage.getItem('LoginType') === 'fb'){
    this.ProfileData = {
      picture: 'http://graph.facebook.com/' + JSON.parse(UserData).details.facebook_id + '/picture?type=large',
      username: JSON.parse(UserData).social.facebook.data.full_name,
      location: '',
      interest: {},
      company: '',
      event: ''

    }
    // }

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
