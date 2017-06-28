import { Component } from '@angular/core';
import { App, ViewController, MenuController, AlertController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';
import { MyProfileComponent } from '../myprofile/myprofile.component';
import { AjaxService } from '../../common/ajax.service';
import { NavController } from 'ionic-angular';
import { toast } from '../../common/toast.service';
import { SetInterestComponenet } from '../setinterest/setinterest.component';




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
    public ajax: AjaxService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private _toast: toast
  ) {
    this.menu.swipeEnable(false);

  }


  GoFb() {
    this.facebookAuth.login().then((res) => {
      let UserData = JSON.parse(localStorage.getItem("ionic_user_5ad47bc5"));
      let DataToSave = {
        userName: UserData.social.facebook.data.full_name,
        email: UserData.social.facebook.data.email,
        SocialId: UserData.social.facebook.uid,
        UserPic: 'http://graph.facebook.com/' + UserData.details.facebook_id + '/picture?type=large',
        method: 'FB'
      }
      this.DoStuffAfterSocialLogin(DataToSave);
    }, (e) => {
      console.log(e)
    });
  }

  GoGmail() {
    this.googleAuth.login().then((res) => {
      let UserData = JSON.parse(localStorage.getItem("ionic_user_5ad47bc5"));
      let DataToSave = {
        userName: UserData.social.google.data.full_name,
        email: UserData.social.google.data.email,
        SocialId: UserData.social.google.uid,
        UserPic: UserData.social.google.data.profile_picture.replace("?sz=50", "?sz=200"),
        method: 'GMAIL'
      }
      this.DoStuffAfterSocialLogin(DataToSave);
    }, (e) => {
      console.log(e);
    });
  }


  DoStuffAfterSocialLogin(DataToSave) {
    if (DataToSave.email) {
      this.ajax.Post('registration', DataToSave).subscribe((data) => {
        localStorage.setItem('LoginData', JSON.stringify(data));
        this.navCtrl.setRoot(MyProfileComponent)
        if(data.loginCount == 1)
            this.appCtrl.getRootNav().push(MyProfileComponent);
        else
            this.appCtrl.getRootNav().push(SetInterestComponenet);
      });
    } else {
      let alert = this.alertCtrl.create({
        message: "We didn't found your Email Id, Please enter to continue",
        inputs: [
          {
            name: 'Email',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Continue',
            handler: data => {
              if (data.Email) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.Email)) {
                  DataToSave.email = data.Email;
                  this.DoStuffAfterSocialLogin(DataToSave);
                } else {
                  this._toast.notify("Enter a valid Email id", false, "top", true, "Ok")
                  return false;
                }
              } else
                return false;
            }
          }
        ]
      });
      alert.present();
    }
  }
}
