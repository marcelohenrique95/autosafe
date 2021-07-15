import { AuthService } from './auth.service';
import { UserAuth } from './../model/user-auth.model';
import { PartnerModel } from '../model/partner.model';
import { CepModel } from '../model/cep.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SefazApiModel } from '../model/sefazapi.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  url = environment.urlApi;
  headers: Headers;
  constructor(private httpclient: HttpClient, private authenticationService: AuthService) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  public getPartner(): Observable<PartnerModel> {
    return this.httpclient.get<PartnerModel>(this.url + 'partner/listAllPartner');
  }

  public postPartner(partnerModel: PartnerModel): Observable<PartnerModel> {
    return this.httpclient.post<PartnerModel>(this.url + 'partner', JSON.stringify(partnerModel), this.httpOptions);
  }

  public putPartner(partnerModel: PartnerModel): Observable<PartnerModel> {
    return this.httpclient.put<PartnerModel>(this.url + 'partner', JSON.stringify(partnerModel), this.httpOptions);
  }

  public getCep(zipcode: String): Observable<CepModel> {
    return this.httpclient.get<CepModel>(this.url + 'address/getCep/' + zipcode);
  }

  public getCnpjSefaz(cnpj: String): Observable<SefazApiModel> {
    return this.httpclient.get<SefazApiModel>(this.url + 'sefaz-api/' + cnpj);
  }


}

