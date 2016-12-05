import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentService {

  currentData:any;

  constructor(private http:HttpService) {

  }

  add(data:any) {
    return this.http.post(ApiConfig.STUDENT, data).map(this.extractData).catch(this.handleError);
  }

  get() {
    return this.http.get(ApiConfig.STUDENT).map(this.extractData).catch(this.handleError);
  }

  del(id:string) {
    return this.http.delete(ApiConfig.STUDENT + '/' + id).map(this.extractData).catch(this.handleError);
  }

  changeStatus(id:string, data:any) {
    return this.http.put(ApiConfig.USER + '/changeStatus/' + id, data).map(this.extractData).catch(this.handleError);
  }

  isUsernameUsed(data:any) {
    return this.http.post(ApiConfig.USER + '/isUsernameUsed', data).map(this.extractData).catch(this.handleError);
  }

  resetPwd(id:string) {
    return this.http.put(ApiConfig.USER + '/resetPwd/' + id).map(this.extractData).catch(this.handleError);
  }

  extractData(res:any) {
    let body = res.json();
    return body || {};
  }

  handleError(error:any) {
    return Observable.throw(error);
  }
}