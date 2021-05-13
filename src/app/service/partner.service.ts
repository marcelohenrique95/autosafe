import { AuthService } from './auth.service';
import { UserAuth } from './../model/user-auth.model';
import { PartnerModel } from '../model/partner.model';
import { CepModel } from '../model/cep.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  headers :Headers;
  constructor(private httpclient: HttpClient, private authenticationService: AuthService) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json"
    })
  };

  public getPartner(): Observable<PartnerModel>{
    return this.httpclient.get<PartnerModel>('http://localhost:8080/partner/listAllPartner');
  }

  public postPartner(partnerModel: PartnerModel): Observable<PartnerModel>{
    return this.httpclient.post<PartnerModel>('http://localhost:8080/partner' , JSON.stringify(partnerModel), this.httpOptions);
  }

  public putPartner(partnerModel: PartnerModel): Observable<PartnerModel>{
    return this.httpclient.put<PartnerModel>('http://localhost:8080/partner' , JSON.stringify(partnerModel), this.httpOptions);
  }

  public getCep(zipcode: String): Observable<CepModel>{
    return this.httpclient.get<CepModel>('http://localhost:8080/address/getCep/' + zipcode);
  }


}

