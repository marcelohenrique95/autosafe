
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyServiceModel } from '../model/my-service.model';
import { ServiceSimpleModel } from '../model/list-service-simple.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptionsFile = {
    headers: new HttpHeaders({})
  };

  public postService(myServiceModel: MyServiceModel): Observable<MyServiceModel> {
    return this.httpclient.post<MyServiceModel>(this.url + 'service', JSON.stringify(myServiceModel), this.httpOptions);
  }

  public postServiceImg(formData: FormData, serviceId: number): Observable<MyServiceModel> {
    return this.httpclient.post<MyServiceModel>(this.url + 'service/uploadFile/' + serviceId, formData, this.httpOptionsFile);
  }

  public getSimpleServiceList(): Observable<ServiceSimpleModel> {
    return this.httpclient.get<ServiceSimpleModel>(this.url + 'service/listSimpleServiceByPartner');
  }
}
