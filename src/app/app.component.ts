import { UserAuth } from './model/user-auth.model';
import { AuthService } from './service/auth.service';
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datta-able';
  faCoffe = faCoffee;
  currentUser: UserAuth;

  constructor(private router: Router,  private authenticationService: AuthService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
