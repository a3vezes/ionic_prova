import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { GastoService } from './gasto.service';
import { MesService } from './mes.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[UsuarioService, GastoService, MesService, SQLite]
})
export class ServicesModule { }
