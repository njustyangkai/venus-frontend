import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentService {

  constructor(private http:HttpService) {

  }

  add(data:any) {
    return this.http.post(ApiConfig.STUDENT, data).map(this.extractData).catch(this.handleError);
  }

  get() {
    return this.http.get(ApiConfig.STUDENT).map(this.extractData).catch(this.handleError);
  }

  extractData(res:any) {
    let body = res.json();
    return body || {};
  }

  handleError(error:any) {
    return Observable.throw(error);
  }
}