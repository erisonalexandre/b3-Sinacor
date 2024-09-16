import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  title: string = 'Você tem certeza?';
  confirmText: string = 'Sim';
  cancelText: string = 'Não';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data?: {
      title: string;
      message: string;
      confirmText: string;
      cancelText: string;
    },
  ) {
    if (data) {
      this.title = data.title;
      this.confirmText = data.confirmText;
      this.cancelText = data.cancelText;
    }
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
