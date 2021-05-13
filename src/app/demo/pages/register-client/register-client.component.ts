import { CepModel } from './../../../model/cep.model';
import { ClientService } from './../../../service/client.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientModel } from './../../../model/client.model';
import { Component, OnInit } from '@angular/core';
import { AddressModel } from '../../../model/address.model';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {

  clientRegister: ClientModel;
  clientRegisterForm: FormGroup;
  clientType: string;
  cepModel: CepModel;
  erro: any;

  constructor(private clientService: ClientService ,private router: Router , private fb: FormBuilder) {
    if (this.router.getCurrentNavigation().extras.state) {
      const nav = this.router.getCurrentNavigation();
      this.clientRegister = nav.extras.state.clientEdit;
    }
   }

  ngOnInit(): void {
    if (this.clientRegister != null) {
      this.clientRegisterForm = this.fb.group({
        inputPrincipalName: [this.clientRegister.principalName], inputSecundaryName: [this.clientRegister.secundaryName],
        inputBirthDate: [this.clientRegister.birthDate], inputDocument: [this.clientRegister.documentNumber], inputCellphone:[this.clientRegister.cellphoneNumber],
        inputTelephone:[this.clientRegister.telephoneNumber] , inputEmail:[this.clientRegister.email], inputTypePerson:[this.clientRegister.typePerson],
        inputCity:[this.clientRegister.address.city], inputNeighbor:[this.clientRegister.address.neighborhood], inputComplement:[this.clientRegister.address.complement],
        inputNumber:[this.clientRegister.address.number], inputState:[this.clientRegister.address.state], inputZipCode:[this.clientRegister.address.zipCode]
      });
    } else {
      this.clientType = 'PF';
      this.clientRegisterForm = this.fb.group({
        inputPrincipalName: [null], inputSecundaryName: [null], inputBirthDate: [null], inputDocument: [null], inputCellphone:[null], inputTelephone:[null], inputEmail:[null],
        inputTypePerson:[null], inputCity:[null],inputNeighbor:[null], inputComplement:[null] , inputNumber:[null], inputState:[null], inputZipCode:[null] , inputTypePersonPF:[null] , inputTypePersonPJ:[null]
      });
    }
  }

  registerClient(){
    if(this.clientRegister != null && this.clientRegister.id != null){
      this.clientRegister.principalName = this.clientRegisterForm.get('inputPrincipalName').value;
      this.clientRegister.secundaryName = this.clientRegisterForm.get('inputSecundaryName').value;
      this.clientRegister.birthDate = this.clientRegisterForm.get('inputBirthDate').value;
      this.clientRegister.documentNumber = this.clientRegisterForm.get('inputDocument').value;
      this.clientRegister.cellphoneNumber = this.clientRegisterForm.get('inputCellphone').value;
      this.clientRegister.telephoneNumber = this.clientRegisterForm.get('inputTelephone').value;
      this.clientRegister.email = this.clientRegisterForm.get('inputEmail').value;
      this.clientRegister.typePerson = this.clientType;
      this.clientRegister.address.zipCode = this.clientRegisterForm.get('inputZipCode').value;
      this.clientRegister.address.city = this.clientRegisterForm.get('inputCity').value;
      this.clientRegister.address.neighborhood = this.clientRegisterForm.get('inputNeighbor').value;
      this.clientRegister.address.complement = this.clientRegisterForm.get('inputComplement').value;
      this.clientRegister.address.number = this.clientRegisterForm.get('inputNumber').value;
      this.clientRegister.address.state = this.clientRegisterForm.get('inputState').value;


      return this.clientService.putClient(this.clientRegister).subscribe((data: ClientModel) => { this.clientRegister = data},(err) => {console.log(err)});
    }else{
      this.clientRegister = new ClientModel();
      this.clientRegister.address = new AddressModel();
      this.clientRegister.principalName = this.clientRegisterForm.get('inputPrincipalName').value;
      this.clientRegister.secundaryName = this.clientRegisterForm.get('inputSecundaryName').value;
      this.clientRegister.birthDate = this.clientRegisterForm.get('inputBirthDate').value;
      this.clientRegister.documentNumber = this.clientRegisterForm.get('inputDocument').value;
      this.clientRegister.cellphoneNumber = this.clientRegisterForm.get('inputCellphone').value;
      this.clientRegister.telephoneNumber = this.clientRegisterForm.get('inputTelephone').value;
      this.clientRegister.email = this.clientRegisterForm.get('inputEmail').value;
      this.clientRegister.typePerson = this.clientType;
      this.clientRegister.address.city = this.clientRegisterForm.get('inputCity').value;
      this.clientRegister.address.neighborhood = this.clientRegisterForm.get('inputNeighbor').value;
      this.clientRegister.address.complement = this.clientRegisterForm.get('inputComplement').value;
      this.clientRegister.address.number = this.clientRegisterForm.get('inputNumber').value;
      this.clientRegister.address.state = this.clientRegisterForm.get('inputState').value;
      this.clientRegister.address.zipCode = this.clientRegisterForm.get('inputZipCode').value;
      console.log(this.clientRegister)

      return this.clientService.postClient(this.clientRegister).subscribe((data: ClientModel) => { this.clientRegister = data },(err) => {console.log(err)});
  }
  }
  handleChange(evt:string) {
    this.clientType= evt;
    console.log(evt);
  }

  cepComplete(){
    console.log('entrou aqui');
    this.clientService.getCep(this.clientRegisterForm.get('inputZipCode').value).subscribe((data: CepModel) => {
      this.clientRegisterForm.get('inputCity').setValue(data.localidade);
      this.clientRegisterForm.get('inputNeighbor').setValue(data.bairro);
      this.clientRegisterForm.get('inputComplement').setValue(data.logradouro);
      this.clientRegisterForm.get('inputState').setValue(data.uf);
    },(err) => {console.log(err)});



    }
   }
