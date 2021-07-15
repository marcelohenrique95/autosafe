import { BrandModel } from './../model/brand.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient) { }

  public getBrand(typeVehicle: string): Observable<BrandModel> {
    return this.httpclient.get<BrandModel>(this.url + 'brand/listAllBrand/' + typeVehicle);
  }

}
