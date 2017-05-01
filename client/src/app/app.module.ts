import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LoginPage } from '../pages/login/login.component';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { MyProfileComponent } from '../pages/myprofile/myprofile.component';
import { Page2 } from '../pages/page2/page2';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MaterialModule } from '@angular/material';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HomeComponent } from '../pages/home/home.component';
import { ExceptionService } from '../common/exception.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  



import 'hammerjs';




const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '5ad47bc5'
  },
  'auth': {
    'google': {
      'webClientId': '219312883340-cnv4iugufn1mjnomr9e2ji9mckumcfma.apps.googleusercontent.com',
      'scope': []
    },
    'facebook': {
      'scope': []
    }
  }
};

@NgModule({
  declarations: [
    LoginPage,
    MyApp,
    Page1,
    Page2,
    MyProfileComponent,
    HomeComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    MyApp,
    Page1,
    Page2,
    MyProfileComponent
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
    Geolocation,
    Diagnostic,
    ExceptionService
  ]
})
export class AppModule { }
