import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressModel } from 'src/app/model/address.model';
import { BranchModel } from 'src/app/model/branch.model';
import { CepModel } from 'src/app/model/cep.model';
import { PartnerModel } from 'src/app/model/partner.model';
import { SefazApiModel } from 'src/app/model/sefazapi.model';
import { BranchService } from 'src/app/service/branch.service';
import { PartnerService } from 'src/app/service/partner.service';

@Component({
  selector: 'app-new-partner-outsite',
  templateUrl: './new-partner-outsite.component.html',
  styleUrls: ['./new-partner-outsite.component.scss']
})
export class NewPartnerOutsiteComponent implements OnInit {
  partnerRegister: PartnerModel;
  partnerRegisterForm: FormGroup;
  partnerType: string;
  cepModel: CepModel;
  erro: any;
  allBranch: BranchModel;
  dropdownSettings: any = {};
  selectedCodBranchs: BranchModel[] = [];
  showMsg: boolean = false;

  passwordCorrects: boolean = true;
  passwordValid: boolean = true;;
  emailValid: boolean = true;;

  constructor(private partnerService: PartnerService, private router: Router, private fb: FormBuilder, private branchService: BranchService) {
  }

  ngOnInit(): void {
    this.getterBranch();
    this.partnerType = 'PJ';
    this.partnerRegisterForm = this.fb.group({
      inputPrincipalName: [null], inputSecundaryName: [null], inputBirthDate: [null], inputDocument: [null], inputCellphone: [null], inputTelephone: [null], inputEmail: [null], selectedBranch: [null, Validators.required],
      inputTypePerson: [null], inputCity: [null], inputNeighbor: [null], inputComplement: [null], inputNumber: [null], inputState: [null], inputZipCode: [null], inputTypePersonPF: [null], inputTypePersonPJ: [null], 
      inputUserEmail: ['', Validators.required,Validators.email], inputFirstPassword:[null], inputSecoundPassword:[null]
    });


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

    return this.partnerService.postPartner(this.partnerRegister).subscribe((data: PartnerModel) => { this.partnerRegister = data; this.router.navigate(['list-partner']) }, (err) => { console.log(err) });

  }
  handleChange(evt: string) {
    this.partnerType = evt;
    console.log(evt);
  }

  cepComplete() {
    this.partnerService.getCep(this.partnerRegisterForm.get('inputZipCode').value).subscribe((data: CepModel) => {
      this.partnerRegisterForm.get('inputCity').setValue(data.localidade);
      this.partnerRegisterForm.get('inputNeighbor').setValue(data.bairro);
      this.partnerRegisterForm.get('inputComplement').setValue(data.logradouro);
      this.partnerRegisterForm.get('inputState').setValue(data.uf);
    }, (err) => { console.log(err) });


  }

  cnpjComplete() {
    this.partnerService.getCnpjSefaz(this.partnerRegisterForm.get('inputDocument').value).subscribe((data: SefazApiModel) => {
      this.partnerRegisterForm.get('inputPrincipalName').setValue(data.fantasia);
      this.partnerRegisterForm.get('inputSecundaryName').setValue(data.nome);
      this.partnerRegisterForm.get('inputBirthDate').setValue(data.abertura);
    }, (err) => { console.log(err) });


  }

  verifyEmail(){

  }
  verifyPasswords(){
    let password1 = this.partnerRegisterForm.get('inputFirstPassword').value;
    let password2 = this.partnerRegisterForm.get('inputSecoundPassword').value;

    if(password1 != null && password2!=null){
      if(password1 != password2){
        this.passwordCorrects = false;
      }else{
        this.passwordCorrects = true;
      }
    }

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

  getterBranch() {
    this.branchService.getBranch().subscribe(
      (data: BranchModel) => {
        this.allBranch = data;
      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:", error);
      }
    )
  }

}
