import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass',
  templateUrl: 'pass.page.html',
  styleUrls: ['pass.page.scss'],
})
export class PassPage {

  username: string = 'guest';
  newPass!: string;
  passConf!: string;

  alertButtons: string[] = ['Ok']

  constructor(
    private loginService: LoginService,
    private alertController: AlertController,
    private router: Router
  ) {

    const user = this.loginService.getLoggedUser()
    if (user) {
      console.log(`User: ${user.username}`)
      this.username = user.username;
    }
  }

  Redirigir(){
    this.router.navigate(['/login.login.html']);
  }

  clean(){
    this.newPass = '';
    this.passConf = '';
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
