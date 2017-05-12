import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login.component';
import { MyProfileComponent } from '../pages/myprofile/myprofile.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { toast } from '../common/toast.service';
import { HomeComponent } from '../pages/home/home.component';




@Component({
  templateUrl: 'app.html',
  providers: [toast]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MyProfileComponent;
  pages: Array<{ title: string, component: any }>;
  constructor(public platform: Platform, public appCtrl: App, public _toast: toast) {
    this.initializeApp();
    // used for an example of ngFor and navigation

    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'MyProfileComponent', component: MyProfileComponent },
      { title: 'HomeComponent', component: HomeComponent }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let AuthData: Object = localStorage.getItem("ionic_user_5ad47bc5");
      if (AuthData) {
        this.nav.setRoot(LoginPage);
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}