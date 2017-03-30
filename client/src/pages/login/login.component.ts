import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public facebookAuth: FacebookAuth, public navCtrl: NavController, public googleAuth: GoogleAuth, public user: User) {
    
  }


 GoFb(){
 	this.facebookAuth.login().then((res)=>{
       console.log(res)
 	}, (e)=>{
 		console.log(e)
 	});
 	console.log('want to login with fb');
 }
 
 GoGmail(){
 	console.log('want to login with gmail');		
 	this.googleAuth.login().then((res)=> {
 		console.log(res)
 	}, (e)=>{
 		console.log(e);
 	});																																																																																																																									
 }

}
