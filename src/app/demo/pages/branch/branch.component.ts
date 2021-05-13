import { BranchService } from './../../../service/branch.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchModel } from './../../../model/branch.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  branchRegister: BranchModel;
  branchForm: FormGroup;
  showMsg: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private branchService: BranchService) { }

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      inputDescription: [null], inputDisable: [null]
    })
  }

  registerBranch() {
    console.log('clicou no botao')
    this.branchRegister = new BranchModel();
    this.branchRegister.description = this.branchForm.get('inputDescription').value;
    this.branchRegister.disable = this.branchForm.get('inputDisable').value
    return this.branchService.postBranch(this.branchRegister).subscribe
    ((data: BranchModel) => { this.branchRegister = data; this.showMsg= true}, (err) => { console.log(err) });

  }

}
