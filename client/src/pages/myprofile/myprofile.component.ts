import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';


@Component({
  selector: 'my-profile',
  templateUrl: 'myprofile.html',
  providers: [MyLocation]
})
export class MyProfileComponent {
  ProfileData = {};
  constructor(public navCtrl: NavController, public myLocation: MyLocation) {

  }
  ionViewWillEnter() {
    console.log(this.myLocation.Get())
    // this.myLocation.Get().subscribe(data =>{
    //     console.log(data)
    // });


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
}
