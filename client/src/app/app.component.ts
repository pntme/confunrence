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
import { CreateEvent } from '../pages/create-event/createevent.component';



@Component({
  templateUrl: 'app.html',
  providers: [toast]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MyProfileComponent;
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
      { title: 'ProfileComponent', component: ProfileComponent },
      { title: 'CreateEvent', component: CreateEvent }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let AuthData: Object = localStorage.getItem("LoginData");
      if (AuthData) {
        this.nav.setRoot(CreateEvent);
      } else {
        this.nav.setRoot(LoginPage);
      }
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }


  openPage(component) {
    console.log(this.nav)
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
