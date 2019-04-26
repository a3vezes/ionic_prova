import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  paginas: {icon: string, nome: string, url: string}[] = [
    {icon: 'wallet', nome: 'Visão Geral', url:'/home'},
    {icon: 'card', nome: 'Visão Mensal', url:'/mensal'},
    {icon: 'cash', nome: 'Ultimos Gastos', url:'/historico'}
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  sair() {
    this.router.navigateByUrl('/');
  }
}
