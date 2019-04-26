import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MesService } from '../services/mes.service';

@Component({
  selector: 'app-mensal',
  templateUrl: './mensal.page.html',
  styleUrls: ['./mensal.page.scss'],
})
export class MensalPage implements OnInit {

  listaMes:any = [];

  constructor(private menuCtrl: MenuController, private mesService:MesService) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.mesService.getMes().then(resultado => {
      this.listaMes = resultado;
    }).catch((erro) => alert(erro));
  }

  ngOnInit() {
  }

}
