import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { AjaxService } from '../../common/ajax.service';
import { HeaderLoading } from '../../common/headerloading.service';
import { Subscription } from 'rxjs/Subscription';
import { MyProfileFormData } from './myprofile-formdata';
import { App } from 'ionic-angular';
import { ImageService } from '../../common/images.service';
import { SetInterestComponenet } from '../setinterest/setinterest.component';




@Component({
  selector: 'my-profile',
  templateUrl: 'myprofile.html',
  providers: [MyLocation, AjaxService, HeaderLoading, ImageService]
})
export class MyProfileComponent {
  public query = '';
  public interest;
  public UserPic;
  public UserData;
  userForm: any;
  public filteredList = [];
  public elementRef;
  public selected = [];
  public latLng;
  selectedIdx: number;
  subscription: Subscription;
  constructor(
    public navCtrl: NavController,
    public myLocation: MyLocation,
    myElement: ElementRef,
    public ajax: AjaxService,
    public appCtrl: App,
    public HLoading: HeaderLoading,
    public imageService: ImageService
  ) {
    this.elementRef = myElement;
    this.selectedIdx = -1;

  }

  ionViewWillEnter() {
    this.GetLocation();
    this.UserData = localStorage.getItem("LoginData");
    this.model = new MyProfileFormData(JSON.parse(this.UserData)[0].userName, "", JSON.parse(this.UserData)[0].company, JSON.parse(this.UserData)[0]._event);
    this.UserPic = JSON.parse(this.UserData)[0].UserPic;
  }

  GetLocation() {
    this.subscription = this.myLocation.CheckForGps().subscribe(data => {
      localStorage.setItem('MyLocation', JSON.stringify(data));
      if (data) {
        this.model.location = data.Result[0].formatted_address;
        this.latLng = data.Position;
        // localStorage.setItem('MyLocation', JSON.stringify(data));
      }
    });
  }


  model = new MyProfileFormData("", "", "", "");
  submitted = false;
  onSubmit(empForm: any, event: Event) {
    event.preventDefault();
    this.HLoading.start();
    let DataToSend = {
      'phpserver': true,
      '_id': JSON.parse(this.UserData)[0]._id,
      'location': {
        'lat': this.latLng.coords.latitude,
        'lng': this.latLng.coords.longitude,
        'address': this.model.location
      },
      'company': this.model.company,
      'event': this.model.event,
      'profilePic': this.UserPic

    }
    //   // this.submitted = true;
    this.ajax.Get('http://truecvs.com/confunrence/setprofile.php?_id='
      + JSON.parse(this.UserData)[0]._id
      + '&lat=' + this.latLng.coords.latitude
      + '&lng=' + this.latLng.coords.longitude
      + '&company=' + this.model.company
      + '&location=' + this.model.location
      + '&user_name=' + JSON.parse(this.UserData)[0].userName
      + '&profile_picture=' + this.UserPic, 'phpserver').subscribe((data) => {
        localStorage.setItem('ProfileData', JSON.stringify(DataToSend));
        this.appCtrl.getRootNav().push(SetInterestComponenet);
        this.HLoading.stop();

      });
  }



  TakeImage() {
    this.imageService.presentActionSheet().then((response) => {
      this.UserPic = response[0];
      this.imageService.uploadImage(response[0], response[1]);
    }, (err) => {
      console.log(err);
    });
  }
}
