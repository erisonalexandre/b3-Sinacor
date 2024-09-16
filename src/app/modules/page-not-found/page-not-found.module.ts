import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatDividerModule],
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent, RouterModule],
})
export class PageNotFoundModule {}
