import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserAuth } from './../model/user-auth.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  public logout() {
    localStorage.removeItem('currentUser');
  }
  public signIn(username: string, password: string): Observable<any>{
    return this.http.post<any>('http://localhost:8080/authenticate' ,  { username, password });
  }

}
