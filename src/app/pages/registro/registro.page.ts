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

  async guardar() {
    var f = this.formularioRegistro.value;
  
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Faltan campos que completar.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
  
    const nuevaCuenta = {
      usuario: f.usuario,
      contrasenia: f.contrasenia
    };
  
    //LLamamos al array que tiene las cuentas guardadas o agregadas
    const cuentasGuardadas = JSON.parse(localStorage.getItem('cuentas') || '[]');
    
    //Añadimos la cuenta nueva al array y le damos el valor de INGRESADO en true para poder hacer uso de los guards
    localStorage.setItem('ingresado','true')
    cuentasGuardadas.push(nuevaCuenta);
  
    //Guardamos el array con la cuenta nueva en el localStorage
    localStorage.setItem('cuentas', JSON.stringify(cuentasGuardadas));
    console.log('Cuenta guardada');

    //Cuenta creada con mensaje de alerta para informar al usuario
    const alert = await this.alertController.create({
      header: 'Cuenta Creada!',
      message: 'Te has registrado con exito!',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('principal'); //Redireccion a la pagina /principal
          }
        }
      ],
    });
    
    await alert.present();
  }
}
