import { AuthService } from './service/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log('entrando no interceptor:')
        let currentUser ;
        try{
        currentUser = this.authenticationService.currentUserValue;

        console.log('currentuser no interceptor:'+currentUser.token);
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer '+currentUser.token
                },withCredentials: true
            });
        }
      }catch(e){

      }
        return next.handle(request);
    }
}
