import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class toast {
  constructor(public toastCtrl: ToastController) { }
  notify(msg, duration, postion, closebutton, closebuttontext) {
  	console.log('kkkkkkkk')
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: postion,
      showCloseButton: closebutton,
      closeButtonText: closebuttontext
    });

    toast.onDidDismiss(() => {
      console.log("Toast buton clicked");
    });

     toast.present();
  }
}
