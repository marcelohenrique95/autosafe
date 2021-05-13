import { Router } from '@angular/router';
import { ClientService } from './../../../service/client.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientModel } from './../../../model/client.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  public paginaAtual = 1;
  allClient: ClientModel;
  erro: any;
  clientGroup: FormGroup;

  constructor(private clientService: ClientService , private router: Router , private fb: FormBuilder) {
    this.getterClient();
   }

  ngOnInit(): void {
  }

  getterClient(){
    this.clientService.getClient().subscribe(
      (data: ClientModel) => {
        this.allClient = data;

      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:" , error);

      }
    )
  }
editClient(clientEdit: ClientModel){
    this.router.navigateByUrl('/register-client',{
      state: {clientEdit: clientEdit}
    })
  }

}
