import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/modelos/usuarios';

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
  
  async ingresar(){
    var f = this.formularioLogin.value;

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if(user.usuario == f.usuario && user.contrasenia == f.contrasenia){
      console.log('ingresado');
      localStorage.setItem('ingresado','true')
      this.navCtrl.navigateRoot('principal')
    }else{
        const alert = await this.alertController.create({
          header: 'Datos Incorrectos',
          message: 'Contraseña y/o usuario incorrecto',
          buttons: ['Aceptar'],
        });
    
        await alert.present();
        return;
      }
    }
  }