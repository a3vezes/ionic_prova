import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  protected tabela:string;
  protected count:number;
  constructor(private sqlite: SQLite, platform: Platform) { 
    platform.ready().then(() => this.createDB());
  }

  protected getDB() {
    return this.sqlite.create({
      name: 'gestor_2.db',
      location: 'default'
    });
  }

  private createDB() {
    this.getDB().then((db:SQLiteObject) => {
      //Criando Tabela Usuários
      db.executeSql("CREATE TABLE IF NOT EXISTS usuarios (id integer primary key AUTOINCREMENT NOT NULL, email TEXT, senha TEXT)", []);
    
      db.executeSql("CREATE TABLE IF NOT EXISTS mes (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)", []);
      db.executeSql("CREATE TABLE IF NOT EXISTS categoria (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)", []);
      
      db.executeSql("CREATE TABLE IF NOT EXISTS gasto (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, preco REAL, id_categoria integer, id_mes integer)", []);
      this.insertDefaultItemsCategoria(db);

      this.insertDefaultItensMes(db);
    });
  }

  public insert(obj: Object) {

    let key = Object.keys(obj);
    let values = Object.values(obj);
    let interrogacoes = new Array(key.length).fill('?');

    this.getDB().then((db:SQLiteObject) => {
      db.executeSql("INSERT INTO " + this.tabela + " (" + key.join(', ') + ") VALUES(" + interrogacoes.join(', ') + ")", values);
    });
  } 

  private insertDefaultItemsCategoria(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categoria', [])
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into categoria (nome) values (?)', ['Restaurantes']],
          ['insert into categoria (nome) values (?)', ['Lazer']],
          ['insert into categoria (nome) values (?)', ['Contas']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }

  private insertDefaultItensMes(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from mes', [] )
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into mes (nome) values (?)', ['Janeiro']],
          ['insert into mes (nome) values (?)', ['Fevereiro']],
          ['insert into mes (nome) values (?)', ['Março']],
          ['insert into mes (nome) values (?)', ['Abril']],
          ['insert into mes (nome) values (?)', ['Maio']],
          ['insert into mes (nome) values (?)', ['Junho']],
          ['insert into mes (nome) values (?)', ['Julho']],
          ['insert into mes (nome) values (?)', ['Agosto']],
          ['insert into mes (nome) values (?)', ['Setembro']],
          ['insert into mes (nome) values (?)', ['Outubro']],
          ['insert into mes (nome) values (?)', ['Novembro']],
          ['insert into mes (nome) values (?)', ['Dezembro']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }

  public getAll(): Promise<any> {
    return this.getDB().then((db:SQLiteObject) => {
      return db.executeSql("SELECT * FROM " + this.tabela, []).then(resultado => {
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

  public getByID(id:any): Promise<any> {
    return this.getDB().then((db:SQLiteObject) => {
      return db.executeSql("SELECT * FROM " + this.tabela + " WHERE id = ?", [id]).then(resultado => {
        if (resultado.rows.length > 0)
          return resultado.rows.item(0);
        return null;
      })
    });
  }

  public delete(id:any) {
    this.getDB().then((db:SQLiteObject) => {
      db.executeSql("DELETE FROM " + this.tabela + " WHERE id = ?", [id]);
    });
  }

  public update(obj: Object, id:any) {

    let key = Object.keys(obj);
    let values = Object.values(obj);
    let campos:string[] = [];
    key.forEach((k, i) => {
      campos.push(k + ' = ?');
    }) 
    values.push(id);
    
    this.getDB().then((db:SQLiteObject) => {
      db.executeSql("UPDATE " + this.tabela + " SET " + campos.join(', ') + " WHERE id = ?", values);
    });
  }
}
