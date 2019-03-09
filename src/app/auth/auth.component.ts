import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authSatus: boolean;

  constructor(private  authService: AuthService, private  router: Router) { }

  ngOnInit() {
    this.authSatus = this.authService.isAuth;
  }

  OnSignIn() {
    this.authService.SignIn().then(
      () => {
        this.authSatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
      }
    );
  }

  onSingOut() {
    this.authService.signOut();
    this.authSatus = this.authService.isAuth;
  }

}
