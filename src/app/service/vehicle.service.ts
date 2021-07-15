import { ListVehicleModel } from './../model/listVehicle.model';
import { VehicleModel } from './../model/vehicle.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  url = environment.urlApi;
  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public postVehicle(vehicleModel: VehicleModel): Observable<VehicleModel> {
    return this.httpclient.post<VehicleModel>(this.url + 'service/addVehicle', JSON.stringify(vehicleModel), this.httpOptions);
  }

  public getVehicles(idService: number): Observable<ListVehicleModel> {
    return this.httpclient.get<ListVehicleModel>(this.url + 'service/listVehicle/' + idService);
  }

  public deleteVehicle(idVehicle: number): Observable<any> {
    return this.httpclient.delete<any>(this.url + 'service/removeVehicle/' + idVehicle);
  }
}

