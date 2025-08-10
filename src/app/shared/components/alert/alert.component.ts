import { Component, input } from '@angular/core';

@Component({
  selector: 'alert',
  imports: [],
  templateUrl: './alert.component.html',
})
export class AlertComponent {

  message= input<string>('Alert message');
 }
