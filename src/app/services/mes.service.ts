import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { BancoService } from './banco.service';

@Injectable({
  providedIn: 'root'
})
export class MesService extends BancoService{

  protected tabela:string = 'mes';
  
  public getMes(): Promise<any> {
    return this.getDB().then((db:SQLiteObject) => {
      return db.executeSql("SELECT sum(g.preco) as total, m.nome FROM mes m, gasto g where g.id_mes = m.id group by m.id", []).then(resultado => {
        let retornar = [];
        if (resultado.rows.length > 0) {
          for(let i = 0; i < resultado.rows.length; i++) {
            retornar.push(resultado.rows.item(i));
          }
        }
        return retornar;
      })
    });
  }
}
