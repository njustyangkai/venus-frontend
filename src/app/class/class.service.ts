import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { ApiConfig } from '../util/ApiConfig';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClassService {

  currentStudent:any;

  constructor(private http:HttpService) {
  }

  getStudent() {
    return this.http.get(ApiConfig.STUDENT + '/forPicker').map(this.extractData).catch(this.handleError);
  }

  getAll(start:string, end:string) {
    return this.http.get(ApiConfig.CLASS + '/all?start=' + start + '&end=' + end).map(this.extractData).catch(this.handleError);
  }

  get(start:string, end:string, id:string) {
    return this.http.get(ApiConfig.CLASS + '?start=' + start + '&end=' + end + '&id=' + id).map(this.extractData).catch(this.handleError);
  }

  getById(id:string) {
    return this.http.get(ApiConfig.CLASS + '/one?id=' + id).map(this.extractData).catch(this.handleError);
  }

  add(data:any) {
    return this.http.post(ApiConfig.CLASS, data).map(this.extractData).catch(this.handleError);
  }

  del(id:string) {
    return this.http.delete(ApiConfig.CLASS + '/' + id).map(this.extractData).catch(this.handleError);
  }

  payTag(id:string, data:any) {
    return this.http.put(ApiConfig.CLASS + '/' + id, data).map(this.extractData).catch(this.handleError);
  }

  extractData(res:any) {
    let body = res.json();
    return body || {};
  }

  handleError(error:any) {
    return Observable.throw(error);
  }
}