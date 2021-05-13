import { ListVehicleModel } from './../../../model/listVehicle.model';
import { VehicleService } from './../../../service/vehicle.service';
import { VehicleModel } from './../../../model/vehicle.model';
import { BranchService } from './../../../service/branch.service';
import { BranchModel } from './../../../model/branch.model';
import { ModelService } from './../../../service/model.serivce';
import { ModelModel } from './../../../model/model.model';
import { BrandService } from './../../../service/brand.service';
import { BrandModel } from './../../../model/brand.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MyServiceModel } from './../../../model/my-service.model';
import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/service/myService.service';
import { PartnerModel } from 'src/app/model/partner.model';
import { ServiceBranchModel } from 'src/app/model/serviceBranch.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register-services',
  templateUrl: './register-services.component.html',
  styleUrls: ['./register-services.component.scss']
})
export class RegisterServicesComponent implements OnInit {

  public paginaAtual = 1;
  myserviceForm: FormGroup;
  selectedCodBrand: BrandModel[] = [];
  selectedCodModel: ModelModel[] = [];
  selectedCodBranchs: BranchModel[] = [];
  dropdownSettings: any = {};
  dropdownBrandSettings: any;
  dropdownModelSettings: any;
  dropdownBranchSettings: any;
  allBrands: any;
  allModels: ModelModel;
  allBranch: BranchModel;
  allVehicles: VehicleModel;
  listVehicles: ListVehicleModel;
  myServiceRegister: MyServiceModel;
  vehicleRegister: VehicleModel;
  branchSelected: BranchModel[] = [];
  brandSelected: string = '';
  modelSelected: string = '';
  typeVehicle: string = '';
  time: string = '';
  typeFuel: string = '';
  imgUpload: string = '';
  showMsg: boolean = false;
  showMsgAddVehicle: string = null;
  showSelectVehicle: boolean = false;
  erro: any;
  formData: FormData = new FormData();


  constructor(
    private fb: FormBuilder, private router: Router, private brandService: BrandService,
    private modelService: ModelService, private branchService: BranchService,
    private myService: MyServiceService, private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.getterVehicles();
    this.getterBranch();
    this.myserviceForm = this.fb.group({
      inputTitle: [null], inputPrice: [null],
      inputDescription: [null], inputTime: [null],
      inputSelectTime: [null], inputEnd: [null],
      inputImg: [null], branchSelected: [null],
      inputTypeVehicle: [null], inputBrand: [null],
      inputModel: [null], inputFuel: [null]

    })

    this.dropdownBranchSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      closeDropDownOnSelection: false,
      noDataAvailablePlaceholderText: '..',
      searchPlaceholderText: 'Buscar',
      clearSearchFilter: false,
    };

  }

  registerService() {
    console.log('entrou no register')
    this.myServiceRegister = new MyServiceModel();
    this.myServiceRegister.title = this.myserviceForm.get('inputTitle').value;
    this.myServiceRegister.value = this.myserviceForm.get('inputPrice').value;
    this.myServiceRegister.branchs = [];
    for (let o of this.selectedCodBranchs) {
      let srvc = new ServiceBranchModel;
      srvc.idBranch = o.id;
      this.myServiceRegister.branchs.push(srvc);
    }
    this.myServiceRegister.partner = new PartnerModel();
    this.myServiceRegister.partner.id = 1;
    this.myServiceRegister.description = this.myserviceForm.get('inputDescription').value;
    if (this.time == '1') {
      this.myServiceRegister.estimatedMinutes = this.myserviceForm.get('inputTime').value;
    } else {
      this.myServiceRegister.estimatedMinutes = this.myserviceForm.get('inputTime').value * 60;
    }
    console.log('TEMPO', this.myServiceRegister.estimatedMinutes);
    this.myServiceRegister.lastDateOfService = this.myserviceForm.get('inputEnd').value;

    this.myService.postService(this.myServiceRegister).subscribe
      ((data: MyServiceModel) => { this.myServiceRegister = data; console.log(data); this.showMsg = true; this.uploadImg(); this.showSelectVehicle = true }, (err) => { console.log(err) });

    console.log('OBJETO: ', this.myServiceRegister);

    console.log('ImgUploaded ');
  }

  uploadImg(){
    this.myService.postServiceImg(this.formData, this.myServiceRegister.partner.id).subscribe
      ((data: any) => { }, (err) => { console.log(err) });
  }


  setVehicle() {
    this.vehicleRegister = new VehicleModel();
    this.vehicleRegister.idService = 11;
    this.vehicleRegister.idBrand = Number(this.brandSelected);
    this.vehicleRegister.idModel = Number(this.modelSelected);
    this.vehicleRegister.fuel = Number(this.typeFuel);


    this.vehicleService.postVehicle(this.vehicleRegister).subscribe((data: VehicleModel) => { this.vehicleRegister = data;  this.showMsgAddVehicle = ''; this.getterVehicles();}, (err) => { console.log(err) });
  }

  deleteVehicle(idVehicle: number) {
    this.vehicleService.deleteVehicle(idVehicle).subscribe( data => {  this.getterVehicles();});


  }

  clearSelect() {

  }

  getterVehicles() {

    this.vehicleService.getVehicles(11).subscribe((data: ListVehicleModel) => {
      this.listVehicles = data;
      (error: any) => {
        this.erro = error;
        console.error("ERROR:", error);

      }
    })
  }

  onItemSelectBranch(item: BranchModel) {
    this.selectedCodBranchs.push(item);
    console.log(this.branchSelected)
  }

  onItemDeSelectBranch(item: BranchModel) {
    this.selectedCodBranchs.forEach((cod, index) => {
      if (cod.id === item.id) {
        this.selectedCodBranchs.splice(index, 1);
      }
    });
  }

  changeTime(evt: any) {
    this.time = evt.target.value;
  }

  changeVehicleType(evt: any) {
    this.typeVehicle = evt.target.value;
    this.getterBrand();
  }

  changeTypeFuel(evt: any) {
    this.typeFuel = evt.target.value;
  }

  changeBrand(evt: any) {
    this.brandSelected = evt.currentTarget.value;
    this.getterModel();
  }

  changeModel(evt: any) {
    this.modelSelected = evt.target.value;
  }


  uploadFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData.append('file', file, file.name);
    }
  }



  getterBrand() {
    this.brandService.getBrand(this.typeVehicle).subscribe(
      (data: BrandModel) => {
        this.allBrands = data;

      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:", error);
      }
    )
  }

  getterModel() {
    this.modelService.getModel(this.brandSelected).subscribe(
      (data: ModelModel) => {
        this.allModels = data;

      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:", error);

      }
    )
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
