// Import required modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from './config';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {

  }
  // user login
  public getLogin(data: any): Observable<any> {
    return this.http.post<any>(url + 'login', data);
  }

  // user registration
  public getRegister(data: any): Observable<any> {
    return this.http.post<any>(url + 'register', data);
  }

  // obtain user state
  public getUserState(data: any): Observable<any> {
    return this.http.get<any>(url + 'userstate');
  }
  // get user data by id
  public getUserData(data: any): Observable<any> {
    return this.http.get<any>(url + `user/${data.id}`);
  }
  // update user data by id
  public updateUser(data: any): Observable<any> {
    return this.http.put<any>(url + `user/${data.id}`, data);
  }
  // get all the users
  public getUserList(): Observable<any> {
    return this.http.get<any>(url + 'showlist');
  }

  // // delete users
  public deleteUser(data: any): Observable<any> {
    return this.http.delete<any>(url + `user/${data}`, data);
  }
}
