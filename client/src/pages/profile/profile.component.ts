import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyLocation } from '../../common/mylocation.service';
import { NavParams } from 'ionic-angular';
import { AjaxService } from '../../common/ajax.service';




@Component({
  selector: 'Profile',
  templateUrl: 'profile.html',
  providers: [MyLocation]
})
export class ProfileComponent {
public User = {};
public options;
public Interest;	
public UserInterest;


  constructor(public navCtrl: NavController, public myLocation: MyLocation, public param: NavParams, public ajax: AjaxService) {
       this.options = 'Interest';
  }

  ionViewDidEnter() {
    let id = this.param.get('id');
    this.ajax.Get('http://truecvs.com/confunrence/getuser.php?_id=' + id
      , 'phpserver').subscribe(data => {
         this.User = data[0];
         this.UserInterest = data[0].interest.split(',');
         console.log(this.UserInterest);


      });
  }

}
