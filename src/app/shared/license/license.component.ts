import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
})
export class LicenseComponent {
  @Input() modal: HTMLIonModalElement;
  @Input() text: string;

  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }
}
