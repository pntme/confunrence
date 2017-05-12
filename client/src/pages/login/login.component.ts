import { Component } from '@angular/core';
import { App, ViewController, MenuController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';
import { MyProfileComponent } from '../myprofile/myprofile.component';
import { AjaxService } from '../../common/ajax.service';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  providers: [AjaxService]
})
export class LoginPage {

  constructor(public facebookAuth: FacebookAuth,
    public googleAuth: GoogleAuth,
    public user: User,
    public menu: MenuController,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public ajax: AjaxService
  ) {
    this.menu.swipeEnable(false);

  }


  GoFb() {
    this.appCtrl.getRootNav().push(MyProfileComponent);
    // this.facebookAuth.login().then((res) => {
    //   let UserData = JSON.parse(localStorage.getItem("ionic_user_5ad47bc5"));
    //   let DataToSave = {
    //     userName: UserData.social.facebook.data.full_name,
    //     email: UserData.social.facebook.data.email,
    //     SocialId: UserData.social.facebook.uid,
    //     UserPic: 'http://graph.facebook.com/' + UserData.details.facebook_id + '/picture?type=large',
    //     method: 'FB'
    //   }
    //   this.ajax.Post('registration', DataToSave).subscribe((data) => {
    //     this.appCtrl.getRootNav().push(MyProfileComponent);
    //   });
    // }, (e) => {
    //   console.log(e)
    // });
  }

  GoGmail() {
    this.googleAuth.login().then((res) => {
      this.ajax.Post('registration', { name: 'confunrence' }).subscribe((data) => {
        console.log(data)
        this.appCtrl.getRootNav().push(MyProfileComponent);
      });
    }, (e) => {
      console.log(e);
    });
  }

}
