import { Injectable } from '@angular/core';
import { ActionSheetController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class Sheet {
  constructor(private action: ActionSheetController, private picker: PickerController) {
  }

  openActions(): Promise<HTMLIonActionSheetElement> {
    const options = {
      header: 'Options',
      buttons: [
        {
          icon: 'share',
          text: 'Share',
          handler: () => void 0,
        },
        {
          icon: 'flag',
          text: 'Report',
          handler: () => void 0,
        },
        {
          icon: 'close',
          role: 'cancel',
          text: 'Cancel',
          handler: () => void 0,
        },
      ],
    };
    return (
      this.action
        .create(options)
        .then(h => h.present().then(() => h))
    );
  }

  closeActions(): Promise<boolean> {
    return this.action.dismiss();
  }

  openPicker(options: PickerOptions): Promise<HTMLIonPickerElement> {
    return (
      this.picker
        .create(options)
        .then(h => h.present().then(() => h))
    );
  }

  closePicker(): Promise<boolean> {
    return this.picker.dismiss();
  }
}
