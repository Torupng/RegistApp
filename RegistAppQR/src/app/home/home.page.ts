import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private loginService: LoginService,
    private alertController: AlertController,
    private router: Router
  ) {
  }

  

}
