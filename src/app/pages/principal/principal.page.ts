import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {


  constructor(public alertController: AlertController) { }

  ngOnInit() { }

  async cerrarSesion() {  
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesion cancelado!');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.removeItem('ingresado');
            console.log('Valor ingresado removido');
            location.reload();
          }
        }
      ],
    });

    await alert.present();

  }
}
