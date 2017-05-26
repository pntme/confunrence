import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { AjaxService } from '../../common/ajax.service';
import { HeaderLoading } from '../../common/headerloading.service';
import { Subscription } from 'rxjs/Subscription';
import { MyProfileFormData } from './myprofile-formdata';
import { App } from 'ionic-angular';
import { NearbyPage } from '../nearby/nearby.component';




@Component({
  selector: 'my-profile',
  templateUrl: 'myprofile.html',
  providers: [MyLocation, AjaxService, HeaderLoading]
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
    public HLoading: HeaderLoading
  ) {
    this.elementRef = myElement;
    this.selectedIdx = -1;

  }

  ionViewWillEnter() {
    this.ajax.Get('a.json').subscribe((data) => {
      this.interest = data;
    });
    this.GetLocation();
    this.UserData = localStorage.getItem("LoginData");
    this.model = new MyProfileFormData(JSON.parse(this.UserData)[0].userName, "", JSON.parse(this.UserData)[0].company, JSON.parse(this.UserData)[0]._event);
    this.UserPic = JSON.parse(this.UserData)[0].UserPic;
  }

  GetLocation() {
    this.subscription = this.myLocation.CheckForGps().subscribe(data => {
      console.log(data)
      if (data) {
        this.model.location = data.Result[0].formatted_address;
        this.latLng = data.Position;
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(event: any) {
    if (this.query !== "") {
      this.filteredList = this.interest.filter(function(el) {
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
      if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length) {
        this.selectedIdx++;
      } else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
        this.selectedIdx--;
      }
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    this.selected.push(item);
    this.query = '';
    this.filteredList = [];
  }
  remove(item) {
    this.selected.splice(this.selected.indexOf(item), 1);
  }

  handleClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
    this.selectedIdx = -1;
  }
  model = new MyProfileFormData("", "", "", "");
  submitted = false;
  onSubmit(empForm: any, event: Event) {
    event.preventDefault();
    this.HLoading.start();
    let DataToSend = {
      '_id': JSON.parse(this.UserData)[0]._id,
      'location': {
        // 'lat': this.latLng.coords.latitude,
        // 'lng': this.latLng.coords.longitude
      },
      'company': this.model.company,
      'event': this.model.event

    }
    //   // this.submitted = true;
    this.ajax.Post('registration/SetProfile', DataToSend).subscribe((data) => {
      let arr = [];
      arr.push(data)
      localStorage.setItem('LoginData', JSON.stringify(arr));
      this.appCtrl.getRootNav().push(NearbyPage);
      this.HLoading.stop();

    });
  }
}
