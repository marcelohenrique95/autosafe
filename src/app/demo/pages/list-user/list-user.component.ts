import { UserFilterModel } from './../../../model/user-filter.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from './../../../model/user.model';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public paginaAtual =1;

  allUsers: UserModel;
  erro: any;
  userFilter: UserFilterModel;
  userGroup: FormGroup


  constructor(private userService: UserService , private router: Router , private fb: FormBuilder) {
    this.getter();
  }

  ngOnInit(): void {
  }

  getter(){
    this.userService.getUsers().subscribe(
        (data: UserModel) => {
          this.allUsers = data;

        },
        (error: any) => {
          this.erro = error;
          console.error("ERROR:" , error);

        }
    )
  }

  goToEdit(userEdit: UserModel){
    this.router.navigateByUrl('/register-user',{
      state: {userEdit: userEdit}})
  }

  filterUser(){
    this.userFilter = this.userGroup.get('inputFilter').value;
    return this.userService.postFilter(this.userFilter).subscribe((data: UserFilterModel) => {
      this.userFilter = data;

    },
    (error: any) => {
      this.erro = error;
      console.error("ERROR:" , error);})
  }

}
