import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { toast } from './toast.service';





@Injectable()

export class AjaxService {
  public constructor(public _toast: toast, private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }
  Get(api) {
    return this.http.get(api)
      .map(res => res.json())
      .catch(err => {
        this._toast.notify("Error in server connection, try again! ", 3000, 'bottom', false, '');
        console.log(err);
        return Observable.throw(err.json());
      });
  }

  Post(api, data) {
    let url = this.config.apiEndpoint + api;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(data);
    console.log(body);
    return this.http.post(url, data, headers)
      .map(res => res.json())
      .catch(err => {
        this._toast.notify("Error in server connection, try again! ", 3000, 'bottom', false, '');
        console.log(err);
        return Observable.throw(err.json());
      });
  }

}
