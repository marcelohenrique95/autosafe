import { ModelModel } from './../model/model.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient) { }

  public getModel(brandSelected: string): Observable<ModelModel> {
    return this.httpclient.get<ModelModel>(this.url + 'model/listAllModel/' + brandSelected);
  }

}
