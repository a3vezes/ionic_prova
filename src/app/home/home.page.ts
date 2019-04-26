import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GastoService } from '../services/gasto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // formulario: FormGroup;
  ultimo:any = []
  categorias:any = []

  constructor(private menuCtrl: MenuController,  private toastController: ToastController, private alertController: AlertController, private gastoService:GastoService) { }
  // private formBuilder:FormBuilder,
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.gastoService.getUltimo().then(resultado => {
      this.ultimo = resultado;
    }).catch((erro) => alert(erro));
    this.gastoService.getCategorias().then(resultado => {
      this.categorias = resultado;
    }).catch((erro) => alert(erro));
  }

  ngOnInit() {
    // this.formulario = this.formBuilder.group({
    //   email:['', [Validators.email, Validators.required]],
    //   senha:['', [Validators.required, Validators.minLength(6)]]
    // });
  }

  async incluir(){
    const alert = await this.alertController.create({
      header: 'Incluir Gasto',
      inputs: [
        {type:"text", placeholder: "Digite um nome", name:"nome"},
        {type:"number", placeholder:"Digite o valor", name:"preco"},        
        {type:"number", placeholder:"Digite o id do mes", name:"mes"},
        {type:"number", placeholder:"Digite o id da categoria", name:"categoria"}

      ],
      buttons: [
        'Cancelar',
        {text: "Cadastrar", handler: (data) => {
          this.gastoService.cadastrar(data.nome, data.preco, data.mes, data.categoria);
          this.toastController.create({
            message: 'Gasto + ' + data.nome + ' Incluido',
            duration: 2000
          }).then(toast => toast.present())
        }}
      ]
    });
  
    await alert.present();
  }
}
