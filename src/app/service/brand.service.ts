import { BrandModel } from './../model/brand.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpclient: HttpClient) { }

  public getBrand(typeVehicle: string): Observable<BrandModel>{
    return this.httpclient.get<BrandModel>('http://localhost:8080/brand/listAllBrand/' + typeVehicle);
  }

}
