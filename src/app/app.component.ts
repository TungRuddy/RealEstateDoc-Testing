import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifyComponent } from './notify/notify.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    NotifyComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
