import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class toast {
  constructor(public toastCtrl: ToastController) { }
  public notify(msg, duration, postion, closebutton, closebuttontext) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: postion,
      showCloseButton: closebutton,
      closeButtonText: closebuttontext
    });

    toast.onDidDismiss(() => {
      console.log('dismissed')
    });

    toast.present();

  }
}
