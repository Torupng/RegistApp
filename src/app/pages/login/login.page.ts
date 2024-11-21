import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contrasenia': new FormControl("", Validators.required)
    })

   }

  ngOnInit() {
  }
  
  async ingresar() {
    var f = this.formularioLogin.value;
  
    // Obtener el array de cuentas guardadas
    const cuentasGuardadas = JSON.parse(localStorage.getItem('cuentas') || '[]');
    
    // Buscar la cuenta que coincide con los datos ingresados
    const cuentaValida = cuentasGuardadas.find(
      (cuenta: { usuario: string; contrasenia: string }) => 
        cuenta.usuario === f.usuario && cuenta.contrasenia === f.contrasenia
    );
  
    if (cuentaValida) {
      localStorage.setItem('ingresado','true')
      console.log('Ingresado');
      location.reload();
    } else {
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }  
}