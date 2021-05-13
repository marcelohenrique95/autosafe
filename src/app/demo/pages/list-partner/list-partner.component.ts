import { PartnerModel } from './../../../model/partner.model';
import { PartnerService } from './../../../service/partner.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-partner',
  templateUrl: './list-partner.component.html',
  styleUrls: ['./list-partner.component.scss']
})
export class ListPartnerComponent implements OnInit {

  public paginaAtual = 1;
  allPartner: PartnerModel;
  erro: any;
  clientGroup: FormGroup;

  constructor(private partnerService: PartnerService, private router: Router, private fb: FormBuilder) {
    this.getterPartner();
  }

  ngOnInit(): void {
  }

  getterPartner() {
    this.partnerService.getPartner().subscribe(
      (data: PartnerModel) => {
        this.allPartner = data;

      },
      (error: any) => {
        this.erro = error;
        console.error("ERROR:", error);

      }
    )
  }
  editPartner(partnerEdit: PartnerModel) {
    this.router.navigateByUrl('/register-partner', {
      state: { partnerEdit: partnerEdit }
    })
  }

}
