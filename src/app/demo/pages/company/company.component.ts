import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartnerService } from './../../../service/partner.service';
import { PartnerModel } from './../../../model/partner.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  partnerForm: FormGroup;
  partner: PartnerModel;
  erro: any;

  constructor(private partnerService: PartnerService,private fb: FormBuilder, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      const nav = this.router.getCurrentNavigation();
      this.partner = nav.extras.state.userEdit;
    }


  }

  ngOnInit(): void {
    if(this.partner != null){
      this.partnerForm = this.fb.group({
        inputName: [this.partner.principalName], inputDocument: [this.partner.documentNumber], inputAddress: [this.partner.address.city]
      });
    } else {
      this.partnerForm = this.fb.group({
        inputName: [null], inputDocument: [null], inputAddress: [null]
      });
    }

  }


}
