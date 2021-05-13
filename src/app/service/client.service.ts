import { CepModel } from './../model/cep.model';
import { ClientModel } from './../model/client.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public getClient(): Observable<ClientModel>{
    return this.httpclient.get<ClientModel>('http://localhost:8080/client/listAllClient');
  }

  public postClient(clientModel: ClientModel): Observable<ClientModel>{
    return this.httpclient.post<ClientModel>('http://localhost:8080/client' , JSON.stringify(clientModel), this.httpOptions);
  }

  public putClient(clientModel: ClientModel): Observable<ClientModel>{
    return this.httpclient.put<ClientModel>('http://localhost:8080/client' , JSON.stringify(clientModel), this.httpOptions);
  }

  public getCep(zipcode: String): Observable<CepModel>{
    return this.httpclient.get<CepModel>('http://localhost:8080/address/getCep/' + zipcode);
  }


}

