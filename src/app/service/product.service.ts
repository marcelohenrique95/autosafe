import { Observable } from 'rxjs';
import { ProductModel } from './../model/product.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public getProduct(): Observable<ProductModel> {
    return this.httpclient.get<ProductModel>(this.url + 'product/listAllProduct');
  }

  public postProduct(productModel: ProductModel): Observable<ProductModel> {
    return this.httpclient.post<ProductModel>(this.url + 'product', JSON.stringify(productModel), this.httpOptions);
  }
}

