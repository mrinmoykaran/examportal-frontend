import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();


  constructor(private http: HttpClient) { }

  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user:set token in local storage
  public loginUser(token) {
    localStorage.setItem("token", token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  public getToken() {
    return localStorage.getItem("token");
  }

  public setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  public getUserRole()
  {
    let user=this.getUser();
    return user.authorities[0].authority;
  }



}
