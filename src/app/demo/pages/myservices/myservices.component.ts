import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyServiceModel } from './../../../model/my-service.model';
import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/service/myService.service';
import { ServiceSimpleModel } from 'src/app/model/list-service-simple.model';

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss']
})
export class MyservicesComponent implements OnInit {

  public paginaAtual = 1;
  selectedCodService: MyServiceModel[] = [];
  dropdownSettings: any = {};
  allServices: ServiceSimpleModel;
  erro: any;
  myserviceForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private myService: MyServiceService) {
    this.getterServices();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'idMyService',
      textField: 'descriptionService',
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

  ngOnInit(): void {
  }

  editService(myServiceEdit: ServiceSimpleModel) {
    this.router.navigateByUrl('/register-services', {
      state: { myServiceEdit: myServiceEdit }
    })
  }

  onItemSelect(item: MyServiceModel) {
    this.selectedCodService.push(item);
  }

  getterServices() {
    this.myService.getSimpleServiceList().subscribe(
      (data: ServiceSimpleModel) => {
        this.allServices = data;

      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:", error);

      }
    )
  }

}
