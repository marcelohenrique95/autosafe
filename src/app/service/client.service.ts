import { CepModel } from './../model/cep.model';
import { ClientModel } from './../model/client.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public getClient(): Observable<ClientModel> {
    return this.httpclient.get<ClientModel>(this.url + 'client/listAllClient');
  }

  public postClient(clientModel: ClientModel): Observable<ClientModel> {
    return this.httpclient.post<ClientModel>(this.url + 'client', JSON.stringify(clientModel), this.httpOptions);
  }

  public putClient(clientModel: ClientModel): Observable<ClientModel> {
    return this.httpclient.put<ClientModel>(this.url + 'client', JSON.stringify(clientModel), this.httpOptions);
  }

  public getCep(zipcode: String): Observable<CepModel> {
    return this.httpclient.get<CepModel>('http://localhost:8080/address/getCep/' + zipcode);
  }


}

