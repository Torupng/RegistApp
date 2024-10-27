import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) { 
    this.formularioRegistro = this.fb.group({
    'usuario': new FormControl("", Validators.required),
    'contrasenia': new FormControl("", Validators.required),
    'confContrasenia' : new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Faltan campos que completar.',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }

    var user = {
      usuario: f.usuario,
      contrasenia: f.contrasenia
    }

    localStorage.setItem('user',JSON.stringify(user))

    localStorage.setItem('ingresado','true')
    this.navCtrl.navigateRoot('principal')
  }

}
