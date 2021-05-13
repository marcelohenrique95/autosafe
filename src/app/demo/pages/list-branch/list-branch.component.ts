import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BranchService } from './../../../service/branch.service';
import { BranchModel } from './../../../model/branch.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.scss']
})
export class ListBranchComponent implements OnInit {

  public paginaAtual =1;
  allBranch: BranchModel;
  erro: any;

  constructor(private branchService: BranchService, private fb: FormBuilder, private router: Router) {
    this.getterBranch();
   }

  ngOnInit(): void {
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
