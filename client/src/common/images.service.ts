import { Injectable, Inject } from '@angular/core';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { toast } from './toast.service';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

declare var cordova: any;

@Injectable()

export class ImageService {

  lastImage: string = null;
  loading: Loading;
  public constructor( @Inject(APP_CONFIG) private config: IAppConfig, public _toast: toast, public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) { }

  presentActionSheet() {
    return new Promise((resolve, reject) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then(res => {
                console.log('in sheet', res);
                let GotTheImage = [this.pathForImage(res), res];
                resolve(GotTheImage);
              });
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.CAMERA).then(res => {
                console.log('in sheet', res);
                let GotTheImage = this.pathForImage(res);
                resolve(GotTheImage);
              });
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    });
  }

  takePicture(sourceType) {
    return new Promise((resolve, reject) => {
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
      this.camera.getPicture(options).then((imagePath) => {
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName()).then(res => {
                console.log('in camers take picture', res);
                resolve(res);
              });
            });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName()).then(res => {
            console.log('in gallery take picture', res);
            resolve(res);
          });
        }
      }, (err) => {
        this._toast.notify('Error while selecting image.', 3000, 'bottom', false, '');
        reject('selection error');
      });
    });
  }


  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    return new Promise((resolve, reject) => {
      this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
        console.log('in copyFileToLocalDir', newFileName);
        resolve(newFileName);
      }, error => {
        this._toast.notify('Error while storing file.', 3000, 'bottom', false, '');
        reject('storing error');
      });
    });
  }


  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  uploadImage(path, ImageName) {
    var url = this.config.apiEndpoint + 'ProfilePicUpload';
    var targetPath = path;
    var filename = ImageName;
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this._toast.notify('Image succesful uploaded.', 3000, 'bottom', false, '');
    }, err => {
      this.loading.dismissAll()
      this._toast.notify('Error while uploading file.', 3000, 'bottom', false, '');
    });
  }
}
