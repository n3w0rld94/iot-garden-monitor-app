import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loggedIn = false;

  constructor(
    private router: Router,
    public auth: AngularFireAuth
  ) {
    this.auth.user.subscribe(user => this.loggedIn = user ? true : false);
  }

  signedIn() {
    this.router.navigate(['/analytics']);
  }

  signOut() {
    this.auth.signOut();
  }
}
