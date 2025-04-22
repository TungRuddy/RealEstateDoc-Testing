import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifyService } from '../services/notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notify',
  imports: [MatSnackBarModule],
  template: '',
  styles: [],
})
export class NotifyComponent implements OnDestroy {
  sub: Subscription;
  constructor(
    private _snackBar: MatSnackBar,
    private notifyService: NotifyService
  ) {
    this.sub = this.notifyService.getData().subscribe((res) => {
      if (res) {
        this.openSnackBar(res, 5);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  openSnackBar(message: string, durationInSeconds: number) {
    this._snackBar.open(message, '', {
      duration: durationInSeconds * 1000,
    });
  }
}
