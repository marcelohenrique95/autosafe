import { ModelModel } from './../model/model.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private httpclient: HttpClient) { }

  public getModel(brandSelected: string): Observable<ModelModel>{
    return this.httpclient.get<ModelModel>('http://localhost:8080/model/listAllModel/' + brandSelected);
  }

}
