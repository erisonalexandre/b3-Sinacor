import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InputTextComponent } from './components/input-text/input-text.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputDateMonthComponent } from './components/input-date-month/input-date-month.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CurrencyConverterPipe } from './pipes/currency-converter.pipe';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { ErrorsLabelComponent } from './components/errors-label/errors-label.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  providers: [MatNativeDateModule],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
  ],
  declarations: [
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    InputDateMonthComponent,
    InputPasswordComponent,
    ConfirmDialogComponent,
    ErrorsLabelComponent,
    CurrencyConverterPipe,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    InputDateMonthComponent,
    CurrencyConverterPipe,
    InputPasswordComponent,
    MatMenuModule,
  ],
})
export class SharedModule {}
