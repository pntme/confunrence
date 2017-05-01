import {
  Component,
  ElementRef
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  MyLocation
} from '../../common/mylocation.service';
import {
  AjaxService
} from '../../common/ajax.service';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  MyProfileFormData
} from './myprofile-formdata';




@Component({
  selector: 'my-profile',
  templateUrl: 'myprofile.html',
  providers: [MyLocation, AjaxService]
})
export class MyProfileComponent {
 
  public query = '';
  public interest;
  public UserPic;
  userForm: any;
  public filteredList = [];
  public elementRef;
  public selected = [];
  selectedIdx: number;
  subscription: Subscription;
  constructor(
    public navCtrl: NavController,
    public myLocation: MyLocation,
    myElement: ElementRef,
    public ajax: AjaxService
  ) {
    this.elementRef = myElement;
    this.selectedIdx = -1;

  }

  ionViewWillEnter() {

    this.ajax.call().subscribe((data) => {
      this.interest = data;
    });
    this.subscription = this.myLocation.CheckForGps().subscribe(data => {
      this.model.location = data[0].formatted_address;
    });
    let UserData: string = localStorage.getItem("ionic_user_5ad47bc5");
    // if(localStorage.getItem('LoginType') === 'fb'){
    this.model = new MyProfileFormData(JSON.parse(UserData).social.facebook.data.full_name, "", "", "");
    this.UserPic = 'http://graph.facebook.com/' + JSON.parse(UserData).details.facebook_id + '/picture?type=large';

    // }

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
  onSubmit() {
    this.submitted = true;
  }
}
