import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BancoService } from './banco.service';

@Injectable({
  providedIn: 'root'
})
export class GastoService extends BancoService{


  protected tabela:string = 'gasto';
  
  public cadastrar(nome: string, preco: number, id_mes:number, id_categoria: number) {
    this.insert({
      nome: nome,
      preco: preco,      
      id_mes: id_mes,
      id_categoria: id_categoria
      });
  }

  public getAllJoin() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT g.*, m.nome AS mes, c.nome AS categoria from ((gasto g inner join categoria c on g.id_categoria = c.id) inner join mes m on g.id_mes = m.id)';
        
        return db.executeSql(sql, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                products.push(product);
              }
              return products;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getUltimo(): Promise<any> {
    return this.getDB().then((db:SQLiteObject) => {
      return db.executeSql("SELECT g.nome AS nome, m.nome AS mes, g.preco FROM mes m, gasto g where g.id_mes = m.id order by g.id desc limit 1", []).then(resultado => {
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

  public getCategorias(): Promise<any> {
    return this.getDB().then((db:SQLiteObject) => {
      return db.executeSql("SELECT sum(g.preco) as total, c.nome FROM categoria c, gasto g where g.id_mes = c.id group by c.NOME", []).then(resultado => {
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
