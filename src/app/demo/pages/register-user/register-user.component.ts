import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/user.model';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-register',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent implements OnInit {

  userRegisterForm: FormGroup;
  userRegister: UserModel;


  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      const nav = this.router.getCurrentNavigation();
      this.userRegister = nav.extras.state.userEdit;
    }

  }

  ngOnInit(): void {
    if (this.userRegister != null) {
      this.userRegisterForm = this.fb.group({
        inputName: [this.userRegister.name], inputEmail: [this.userRegister.email], inputPassword: [this.userRegister.password], inputActive: [this.userRegister.active]
      });

    } else {
      this.userRegisterForm = this.fb.group({
        inputName: [null], inputEmail: [null], inputPassword: [null], inputActive: [null]
      });
    }
  }

  registerUser() {
    if (this.userRegister != null && this.userRegister.id != null) {
      this.userRegister.name = this.userRegisterForm.get('inputName').value;
      this.userRegister.email = this.userRegisterForm.get('inputEmail').value;
      this.userRegister.password = shajs('sha256').update(this.userRegisterForm.get('inputPassword').value).digest('hex');
      this.userRegister.active = this.userRegisterForm.get('inputActive').value;
      return this.userService.putUser(this.userRegister).subscribe((data: UserModel) => { this.userRegister = data }, (err) => { console.log(err) });

    } else {
      this.userRegister = new UserModel();
      this.userRegister.name = this.userRegisterForm.get('inputName').value;
      this.userRegister.email = this.userRegisterForm.get('inputEmail').value;
      this.userRegister.password = shajs('sha256').update(this.userRegisterForm.get('inputPassword').value).digest('hex');
      console.log('SENHA CRIPT: ' + this.userRegister.password)
      this.userRegister.active = this.userRegisterForm.get('inputActive').value;
      return this.userService.postUser(this.userRegister).subscribe((data: UserModel) => { this.userRegister = data ; this.router.navigate(['list-user']) }, (err) => { console.log(err) });

    }


  }

}
