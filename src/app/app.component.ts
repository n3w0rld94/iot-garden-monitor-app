import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      requiresLogin: false
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: 'bar-chart',
      requiresLogin: false
    },
    {
      title: 'Sign In',
      url: '/login',
      icon: 'cart',
      requiresLogin: false
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
