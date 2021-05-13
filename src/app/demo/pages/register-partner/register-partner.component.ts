import { BranchService } from './../../../service/branch.service';
import { BranchModel } from './../../../model/branch.model';
import { PartnerService } from '../../../service/partner.service';
import { PartnerModel } from '../../../model/partner.model';
import { CepModel } from '../../../model/cep.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AddressModel } from '../../../model/address.model';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-partner.component.html',
  styleUrls: ['./register-partner.component.scss']
})
export class RegisterPartnerComponent implements OnInit {

  partnerRegister: PartnerModel;
  partnerRegisterForm: FormGroup;
  partnerType: string;
  cepModel: CepModel;
  erro: any;
  allBranch: BranchModel;
  dropdownSettings: any = {};
  selectedCodBranchs: BranchModel[] = [];
  showMsg: boolean = false;

  constructor(private partnerService: PartnerService, private router: Router, private fb: FormBuilder,private branchService: BranchService) {

    if (this.router.getCurrentNavigation().extras.state) {
      const nav = this.router.getCurrentNavigation();
      this.partnerRegister = nav.extras.state.partnerEdit;
    }


  }

  ngOnInit(): void {
    this.getterBranch();
    if (this.partnerRegister != null) {
      this.partnerType = this.partnerRegister.typePerson
      this.partnerRegisterForm = this.fb.group({
        inputPrincipalName: [this.partnerRegister.principalName], inputSecundaryName: [this.partnerRegister.secundaryName],
        inputBirthDate: [this.partnerRegister.birthDate], inputDocument: [this.partnerRegister.documentNumber], inputCellphone: [this.partnerRegister.cellphoneNumber],
        inputTelephone: [this.partnerRegister.telephoneNumber], inputEmail: [this.partnerRegister.email],
        inputCity: [this.partnerRegister.address.city], inputNeighbor: [this.partnerRegister.address.neighborhood], inputComplement: [this.partnerRegister.address.complement],
        inputNumber: [this.partnerRegister.address.number], inputState: [this.partnerRegister.address.state], inputZipCode: [this.partnerRegister.address.zipCode], selectedBranch: [null, Validators.required]
      });
    } else {
      this.partnerType = 'PF';
      this.partnerRegisterForm = this.fb.group({
        inputPrincipalName: [null], inputSecundaryName: [null], inputBirthDate: [null], inputDocument: [null], inputCellphone: [null], inputTelephone: [null], inputEmail: [null], selectedBranch: [null, Validators.required],
        inputTypePerson: [null], inputCity: [null], inputNeighbor: [null], inputComplement: [null], inputNumber: [null], inputState: [null], inputZipCode: [null], inputTypePersonPF: [null], inputTypePersonPJ: [null]
      });
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Selecionar Todos',
      unSelectAllText: 'Limpar Todos',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      closeDropDownOnSelection: false,
      limitSelection: 5,
      noDataAvailablePlaceholderText: '..',
      searchPlaceholderText: 'Buscar',
      clearSearchFilter: false,
    };
  }

  registerPartner() {
    if (this.partnerRegister != null && this.partnerRegister.id != null) {
      this.partnerRegister.principalName = this.partnerRegisterForm.get('inputPrincipalName').value;
      this.partnerRegister.secundaryName = this.partnerRegisterForm.get('inputSecundaryName').value;
      this.partnerRegister.birthDate = this.partnerRegisterForm.get('inputBirthDate').value;
      this.partnerRegister.documentNumber = this.partnerRegisterForm.get('inputDocument').value;
      this.partnerRegister.cellphoneNumber = this.partnerRegisterForm.get('inputCellphone').value;
      this.partnerRegister.telephoneNumber = this.partnerRegisterForm.get('inputTelephone').value;
      this.partnerRegister.email = this.partnerRegisterForm.get('inputEmail').value;
      this.partnerRegister.typePerson = this.partnerType;
      this.partnerRegister.address.zipCode = this.partnerRegisterForm.get('inputZipCode').value;
      this.partnerRegister.address.city = this.partnerRegisterForm.get('inputCity').value;
      this.partnerRegister.address.neighborhood = this.partnerRegisterForm.get('inputNeighbor').value;
      this.partnerRegister.address.complement = this.partnerRegisterForm.get('inputComplement').value;
      this.partnerRegister.address.number = this.partnerRegisterForm.get('inputNumber').value;
      this.partnerRegister.address.state = this.partnerRegisterForm.get('inputState').value;


      return this.partnerService.putPartner(this.partnerRegister).subscribe((data: PartnerModel) => { this.partnerRegister = data; this.showMsg = true }, (err) => { console.log(err) });
    } else {
      this.partnerRegister = new PartnerModel();
      this.partnerRegister.address = new AddressModel();
      this.partnerRegister.principalName = this.partnerRegisterForm.get('inputPrincipalName').value;
      this.partnerRegister.secundaryName = this.partnerRegisterForm.get('inputSecundaryName').value;
      this.partnerRegister.birthDate = this.partnerRegisterForm.get('inputBirthDate').value;
      this.partnerRegister.documentNumber = this.partnerRegisterForm.get('inputDocument').value;
      this.partnerRegister.cellphoneNumber = this.partnerRegisterForm.get('inputCellphone').value;
      this.partnerRegister.telephoneNumber = this.partnerRegisterForm.get('inputTelephone').value;
      this.partnerRegister.email = this.partnerRegisterForm.get('inputEmail').value;
      this.partnerRegister.typePerson = this.partnerType;
      this.partnerRegister.address.city = this.partnerRegisterForm.get('inputCity').value;
      this.partnerRegister.address.neighborhood = this.partnerRegisterForm.get('inputNeighbor').value;
      this.partnerRegister.address.complement = this.partnerRegisterForm.get('inputComplement').value;
      this.partnerRegister.address.number = this.partnerRegisterForm.get('inputNumber').value;
      this.partnerRegister.address.state = this.partnerRegisterForm.get('inputState').value;
      this.partnerRegister.address.zipCode = this.partnerRegisterForm.get('inputZipCode').value;
      console.log(this.partnerRegister)

      return this.partnerService.postPartner(this.partnerRegister).subscribe((data: PartnerModel) => { this.partnerRegister = data; this.router.navigate(['list-partner'])}, (err) => { console.log(err) });
    }
  }
  handleChange(evt: string) {
    this.partnerType = evt;
    console.log(evt);
  }

  cepComplete() {
    console.log('entrou aqui');
    this.partnerService.getCep(this.partnerRegisterForm.get('inputZipCode').value).subscribe((data: CepModel) => {
      this.partnerRegisterForm.get('inputCity').setValue(data.localidade);
      this.partnerRegisterForm.get('inputNeighbor').setValue(data.bairro);
      this.partnerRegisterForm.get('inputComplement').setValue(data.logradouro);
      this.partnerRegisterForm.get('inputState').setValue(data.uf);
    }, (err) => { console.log(err) });


  }

onItemSelect(item: BranchModel) {
  this.selectedCodBranchs.push(item);
}

onItemDeSelect(item: BranchModel) {
  this.selectedCodBranchs.forEach((cod, index) => {
      if (cod.id === item.id) {
          this.selectedCodBranchs.splice(index, 1);
      }
  });
}

getterBranch(){
  this.branchService.getBranch().subscribe(
      (data: BranchModel) => {
        this.allBranch = data;

      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:" , error);

      }
  )
}


}
