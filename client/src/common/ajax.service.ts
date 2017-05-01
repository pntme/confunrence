import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ExceptionService } from './exception.service';




@Injectable()

export class AjaxService {
  public constructor(private http: Http, private _excpetionService: ExceptionService) { }
  call() {
    return this.http.get('a.json')
      .map(res => res.json())
      .catch(this._excpetionService.handleError);


  }

}
