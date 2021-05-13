import { AddressModel } from './address.model';
export class ClientModel {
   public id: number;
   public principalName: string;
   public secundaryName: string;
   public birthDate: string;
   public documentNumber: string;
   public cellphoneNumber: string;
   public telephoneNumber: string;
   public email: string;
   public typePerson: string;
   public address: AddressModel;
}
