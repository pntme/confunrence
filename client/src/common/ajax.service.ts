import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ExceptionService } from './exception.service';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { Inject } from '@angular/core';




@Injectable()

export class AjaxService {
  public constructor(private http: Http, private _excpetionService: ExceptionService, @Inject(APP_CONFIG) private config: IAppConfig) { }
  Get(api) {
    return this.http.get(api)
      .map(res => res.json())
      .catch(this._excpetionService.handleError);
  }

  Post(api, data) {
    console.log(data)
    let url = this.config.apiEndpoint + api;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(data);
    console.log(body);
    return this.http.post(url, data, headers)
      .map(res => res.json())
      .catch(this._excpetionService.handleError);
  }

}
