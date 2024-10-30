import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {WeatherService} from "../../weather.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  weatherData: any;

  constructor(public alertController: AlertController, private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather(''); //buscador en base al nombre de la zona o pais QUE NO FUNCIONOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO lo revisare en un futuro
  }

  //API CLIMA

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(
      data => {
        this.weatherData = data;
        console.log(this.weatherData); //verifica que los datos se están recibiendo
      },
      error => {
        console.error('Error clima:', error);
      }
    );
  }

  //Cerrar sesion y cosas

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
