import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import './rxjs-operators';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpService {
  headers:any;

  constructor(private http:Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
  }

  get(uri:string) {
    return this.getHttp('get', uri);
  }

  post(uri:string, data:any) {
    return this.getHttp('post', uri, data);
  }

  put(uri:string, data?:any) {
    return this.getHttp('put', uri, data);
  }

  delete(uri:string) {
    return this.getHttp('delete', uri);
  }

  getHttp(type:string, uri:string, data?:any) {
    if (data) {
      return this.http[type](uri, JSON.stringify(data), {headers: this.headers}).catch(this.handleError);
    } else {
      return this.http[type](uri, {headers: this.headers}).catch(this.handleError);
    }
  }

  handleError(error:any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status}-${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}