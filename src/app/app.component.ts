import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  loggedIn = false;

  appPages = [
    {
      title: 'Profile',
      url: '/login',
      icon: 'person-circle',
      requiresLogin: false
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: 'bar-chart',
      requiresLogin: true
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private angularFireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.angularFireAuth.user.subscribe(response => this.loggedIn = response ? true : false);
  }
}
