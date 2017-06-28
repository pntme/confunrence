import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { AjaxService } from '../../common/ajax.service';
import { HeaderLoading } from '../../common/headerloading.service';
import { Subscription } from 'rxjs/Subscription';
import { App } from 'ionic-angular';
import { ImageService } from '../../common/images.service';




@Component({
  selector: 'setinterest',
  templateUrl: 'setinterest.html',
  providers: [MyLocation, AjaxService, HeaderLoading, ImageService]
})
export class SetInterestComponenet {
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
    
  }

  GetLocation() {
   
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
 
  submitted = false;
  onSubmit(empForm: any, event: Event) {
    event.preventDefault();
    this.HLoading.start();
  
  
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
