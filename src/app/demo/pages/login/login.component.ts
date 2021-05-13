import { UserAuth } from './../../../model/user-auth.model';
import { AuthService } from './../../../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from './../../../service/user.service';
import { LoginModel } from './../../../model/login.model';
import { UserModel } from './../../../model/user.model';
import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  loginUser: LoginModel;
  userModel: UserModel;
  isSubmitted = false;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private authService: AuthService) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
  }
   }

  ngOnInit(): void {
    this.authService.logout();
    this.loginUserForm = this.fb.group({
      inputEmailLogin: [null, Validators.required], inputPasswordLogin: [null, Validators.required]
    });
  }

  userLogin() {
    this.loginUser = new LoginModel();
    this.loginUser.email = this.loginUserForm.get('inputEmailLogin').value;
    this.loginUser.password = shajs('sha256').update(this.loginUserForm.get('inputPasswordLogin').value).digest('hex');
    console.log('SENHACRIPTlogin: ' + this.loginUser.password);
    console.log(this.loginUser);
    this.authService.signIn(this.loginUser.email, this.loginUser.password).subscribe((data: UserAuth) => {

      localStorage.setItem('currentUser', JSON.stringify(data));
      this.authService.currentUserSubject.next(data);
      console.log('foi caraio')

    });


      if (this.authService.currentUserValue != null) {
        this.router.navigateByUrl('/dashboard/default');
        this.authService.isLoggedIn.next(true);
      } else {
        this.router.navigateByUrl('/login');
      }


  }



}
