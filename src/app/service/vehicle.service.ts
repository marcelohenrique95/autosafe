import { ListVehicleModel } from './../model/listVehicle.model';
import { VehicleModel } from './../model/vehicle.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  public postVehicle(vehicleModel: VehicleModel): Observable<VehicleModel>{
    return this.httpclient.post<VehicleModel>('http://localhost:8080/service/addVehicle', JSON.stringify(vehicleModel), this.httpOptions);
  }

  public getVehicles(idService: number): Observable<ListVehicleModel>{
    return this.httpclient.get<ListVehicleModel>('http://localhost:8080/service/listVehicle/' + idService);
  }

  public deleteVehicle(idVehicle: number): Observable<any>{
    return this.httpclient.delete<any>('http://localhost:8080/service/removeVehicle/' + idVehicle);
  }
}

