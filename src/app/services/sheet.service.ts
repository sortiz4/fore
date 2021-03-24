import { Injectable } from '@angular/core';
import { ActionSheetController, PickerController } from '@ionic/angular';

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
          handler: () => null,
        },
        {
          icon: 'flag',
          text: 'Report',
          handler: () => null,
        },
        {
          icon: 'close',
          role: 'cancel',
          text: 'Cancel',
          handler: () => null,
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
}
