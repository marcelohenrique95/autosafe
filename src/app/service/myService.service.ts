
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyServiceModel } from '../model/my-service.model';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  httpOptionsFile = {
    headers: new HttpHeaders({})
  };

  public postService(myServiceModel: MyServiceModel): Observable<MyServiceModel>{
    return this.httpclient.post<MyServiceModel>('http://localhost:8080/service' , JSON.stringify(myServiceModel), this.httpOptions);
  }

  public postServiceImg(formData: FormData, serviceId: number): Observable<MyServiceModel>{
    return this.httpclient.post<MyServiceModel>('http://localhost:8080/service/uploadFile/'+ serviceId, formData, this.httpOptionsFile);
  }
}
