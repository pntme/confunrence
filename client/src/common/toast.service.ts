import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class toast {
  constructor(public toastCtrl: ToastController) { }
  notify(msg, duration, postion, closebutton, closebuttontext) {
    return Observable.create(observer => {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: duration,
        position: postion,
        showCloseButton: closebutton,
        closeButtonText: closebuttontext
      });

      toast.onDidDismiss(() => {
        observer.next(true);
      });

      toast.present();
    });
  }
}
