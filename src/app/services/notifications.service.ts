import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    public snackbar: MatSnackBar
  ) { }

  showAlert(message: string, delay: number = 2000): void {
    this.snackbar.open(message, 'OK', {
      duration: delay,
    });
  }
}
