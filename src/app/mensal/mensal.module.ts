import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ServicesModule } from '../services/services.module';

import { IonicModule } from '@ionic/angular';

import { MensalPage } from './mensal.page';

const routes: Routes = [
  {
    path: '',
    component: MensalPage
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
  declarations: [MensalPage]
})
export class MensalPageModule {}
