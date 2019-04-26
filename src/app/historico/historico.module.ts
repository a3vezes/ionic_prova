import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ServicesModule } from '../services/services.module';

import { IonicModule } from '@ionic/angular';

import { HistoricoPage } from './historico.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ServicesModule
  ],
  declarations: [HistoricoPage]
})
export class HistoricoPageModule {}
