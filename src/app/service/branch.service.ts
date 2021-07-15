import { BranchModel } from './../model/branch.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public postBranch(branchModel: BranchModel): Observable<BranchModel> {
    return this.httpclient.post<BranchModel>(this.url + 'branch', JSON.stringify(branchModel), this.httpOptions);
  }

  public getBranch(): Observable<BranchModel> {
    return this.httpclient.get<BranchModel>(this.url + 'branch/listAllBranch');
  }

}

