import { AddressModel } from "./address.model";
import { PartnerModel } from "./partner.model";
import { UserModel } from "./user.model";

export class RegisterNewPartner {
    public user: UserModel;
    public partner: PartnerModel;
    public address: AddressModel;
}