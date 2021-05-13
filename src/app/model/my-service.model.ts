import { ServiceVehicleModel } from './serviceVehicle.model';
import { BranchModel } from './branch.model';
import { PartnerModel } from './partner.model';
import { ServiceBranchModel } from './serviceBranch.model';
export class MyServiceModel {
  public id: number;
  public partner: PartnerModel;
  public title: string;
  public description: string;
  public imgUrl: string;
  public multipartFile: FormData;
  public value: number;
  public estimatedMinutes: number;
  public lastDateOfService: string;
  public branchs: ServiceBranchModel[];
  public tags: string;
  public serviceVehicles: ServiceVehicleModel[];


}
