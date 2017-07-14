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
import { toast } from '../common/toast.service';
import { AjaxService } from '../common/ajax.service';
import { NearbyPage } from '../pages/nearby/nearby.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_CONFIG, AppConfig } from './app.config';
import { InvitationPage } from '../pages/invitation/invitation.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ImageService } from '../common/images.service';
import { SetInterestComponenet } from '../pages/setinterest/setinterest.component';
import { CreateEvent } from '../pages/create-event/createevent.component';
import { SelectUser } from '../pages/create-event/selectuser';


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
    NearbyPage,
    InvitationPage,
    ProfileComponent,
    SetInterestComponenet,
    CreateEvent,
    SelectUser
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    SlimLoadingBarModule.forRoot(),
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    MyApp,
    Page1,
    Page2,
    MyProfileComponent,
    NearbyPage,
    InvitationPage,
    ProfileComponent,
    SetInterestComponenet,
    CreateEvent,
    SelectUser
  ],
  providers: [
    toast,
    AjaxService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
    Geolocation,
    Diagnostic,
    File,
    ImageService,
    Transfer,
    Camera,
    FilePath,
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class AppModule { }
