import { Component } from '@angular/core';
import { App, ViewController, MenuController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';
import { MyProfileComponent } from '../myprofile/myprofile.component';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public facebookAuth: FacebookAuth,

    public googleAuth: GoogleAuth,
    public user: User,
    public menu: MenuController,
    public viewCtrl: ViewController,
    public appCtrl: App
  ) {
    this.menu.swipeEnable(false);

  }


  GoFb() {
    this.facebookAuth.login().then((res) => {
      console.log(res)
      this.appCtrl.getRootNav().push(MyProfileComponent);
    }, (e) => {
      console.log(e)
    });
    console.log('want to login with fb');
  }

  GoGmail() {
    console.log('want to login with gmail');
    this.googleAuth.login().then((res) => {
      console.log(res)
      this.appCtrl.getRootNav().push(MyProfileComponent);
    }, (e) => {
      console.log(e);
    });
  }

}
