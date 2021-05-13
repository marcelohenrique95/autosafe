import { BranchModel } from './../model/branch.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  public postBranch(branchModel: BranchModel): Observable<BranchModel>{
    return this.httpclient.post<BranchModel>('http://localhost:8080/branch', JSON.stringify(branchModel), this.httpOptions);
  }

  public getBranch(): Observable<BranchModel>{
    return this.httpclient.get<BranchModel>('http://localhost:8080/branch/listAllBranch');
  }

}

