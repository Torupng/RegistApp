import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import {WeatherService} from "../../weather.service";
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  weatherData: any;

  segment = 'scan';
  scanResult = '';

  constructor(public alertController: AlertController, private weatherService: WeatherService, private modalController: ModalController, private platform: Platform) { }

  ngOnInit() {
    this.getWeather(''); //buscador en base al nombre de la zona o pais QUE NO FUNCIONOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO lo revisare en un futuro
    
  }

  async startScan(){
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensFacing: LensFacing.Back
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }

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
