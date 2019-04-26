import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GastoService } from '../services/gasto.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  listaGasto:any = [];

  constructor(private menuCtrl: MenuController, private gastoService:GastoService) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.gastoService.getAllJoin().then(resultado => {
      this.listaGasto = resultado;
    }).catch((erro) => alert(erro));
  }

  ngOnInit() {
  }

}
