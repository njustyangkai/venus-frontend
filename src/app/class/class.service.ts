import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClassService {

  constructor(private http:HttpService) {
  }

  getStudent() {
    return this.http.get(ApiConfig.STUDENT + '/forPicker').map(this.extractData).catch(this.handleError);
  }

  extractData(res:any) {
    let body = res.json();
    return body || {};
  }

  handleError(error:any) {
    return Observable.throw(error);
  }
}