import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login.component';
import { MyProfileComponent } from '../pages/myprofile/myprofile.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { toast } from '../common/toast.service';
import { InvitationPage } from '../pages/invitation/invitation.component';
import { NearbyPage } from '../pages/nearby/nearby.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { FacebookAuth, GoogleAuth } from '@ionic/cloud-angular';




@Component({
  templateUrl: 'app.html',
  providers: [toast]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = MyProfileComponent;
  pages: Array<{ title: string, component: any }>;
  constructor(public platform: Platform,
    public appCtrl: App,
    public _toast: toast,
    public facebookAuth: FacebookAuth,
    public googleAuth: GoogleAuth
  ) {

    // used for an example of ngFor and navigation

    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'MyProfileComponent', component: MyProfileComponent },
      { title: 'InvitationPage', component: InvitationPage },
      { title: 'Near by', component: NearbyPage },
      { title: 'ProfileComponent', component: ProfileComponent }
    ];
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      // let cur = this.nav.getActive().name;
      // console.log(cur)
      let AuthData: Object = localStorage.getItem("LoginData");
      if (AuthData) {
        this.nav.setRoot(MyProfileComponent);
      } else {
        this.nav.setRoot(LoginPage);
      }
      let count = 0;
      this.platform.registerBackButtonAction(() => {
        if (count === 0) {
          count++;
          this._toast.notify('Press back again to exit', 3000, 'bottom', true, '');
          setTimeout(() => {
            count = 0;
          }, 3000);
        } else if (count === 1) {
          count = 0;
          navigator['app'].exitApp();
        }
      }, 1);
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }


  openPage(component) {
    this.nav.push(component);
  }

  logout() {

    let Data = JSON.parse(localStorage.getItem('LoginData'));
    if (Data.method === 'FB')
      this.facebookAuth.logout();
    if (Data.method === 'GMAIL')
      this.googleAuth.logout();
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }
}
