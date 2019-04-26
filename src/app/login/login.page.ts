import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;

    constructor(private formBuilder:FormBuilder, private router:Router, private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController, private usuarioService:UsuarioService, private menuCtrl:MenuController) { }


    ionViewWillEnter() {
      this.menuCtrl.enable(false);
    }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      senha:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async presentToast(mensagem) { 
    const toast = await this.toastController.create({
       message: mensagem,
       position: 'bottom', 
       closeButtonText: "[X]", 
       showCloseButton: true, 
       duration: 2000 
    });
    toast.present();
  }

  async logar() {
    let logou = await this.usuarioService.logar(this.formulario.get('email').value, this.formulario.get('senha').value);
    
    if (logou) {          
          //AutenticacaoGuard.podeAcessar = true;
          this.router.navigateByUrl('home');
    } else {  
      const toast = await this.toastController.create({
        message: 'Email ou senha inválida',
        duration: 3000
      });
      toast.present();
    }
  }

  async cadastrar() {
    const alert = await this.alertController.create({
      header: 'Nova Conta',
      inputs: [
        {type:"email", placeholder: "Digite um e-mail", name:"login"},
        {type:"password", placeholder:"Digite sua senha", name:"senha"}
      ],
      buttons: [
        'Cancelar',
        {text: "Cadastrar", handler: (data) => {
          this.usuarioService.cadastrar(data.login, data.senha);
          this.toastController.create({
            message: 'Conta ' + data.login + ' criada',
            duration: 2000
          }).then(toast => toast.present())
        }}
      ]
    });
  
    await alert.present();
  }
}
