import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyServiceModel } from './../../../model/my-service.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss']
})
export class MyservicesComponent implements OnInit {

  public paginaAtual = 1;
  selectedCodService: MyServiceModel[] = [];
  dropdownSettings: any = {};
  allServices: MyServiceModel;
  myserviceForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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

  ediService(myServiceEdit: MyServiceModel) {
    this.router.navigateByUrl('/register-services', {
      state: { myServiceEdit: myServiceEdit }
    })
  }

  onItemSelect(item: MyServiceModel) {
    this.selectedCodService.push(item);
  }

  //onItemDeSelect(item: MyServiceModel) {
   // this.selectedCodService.forEach((cod, index) => {
//if (cod.idMyService === item.idMyService) {
//this.selectedCodService.splice(index, 1);
//}
  //  });
//}

}
