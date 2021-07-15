import { AuthService } from './auth.service';
import { UserFilterModel } from './../model/user-filter.model';
import { LoginModel } from './../model/login.model';
import { UserModel } from './../model/user.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient, private authenticationService: AuthService) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  public login(loginModel: LoginModel): Observable<UserModel> {
    let headers = new HttpHeaders();
    headers = headers.set('email', loginModel.email);
    headers = headers.set('password', loginModel.password);
    headers = headers.set('Content-Type', 'application/json');

    return this.httpclient.get<UserModel>(this.url + 'user', { headers: headers });
  }

  public getUsers(): Observable<UserModel> {
    return this.httpclient.get<UserModel>(this.url + 'user/listAll');
  }

  public postUser(userModel: UserModel): Observable<UserModel> {
    return this.httpclient.post<UserModel>(this.url + 'user', JSON.stringify(userModel), this.httpOptions);
  }

  public putUser(userModel: UserModel): Observable<UserModel> {
    return this.httpclient.put<UserModel>(this.url + 'user', JSON.stringify(userModel), this.httpOptions);
  }

  public postFilter(userFilterModel: UserFilterModel): Observable<UserFilterModel> {
    return this.httpclient.post<UserFilterModel>(this.url + 'user/listByFilter', JSON.stringify(userFilterModel), this.httpOptions);
  }


}

