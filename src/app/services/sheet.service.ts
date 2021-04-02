import { Injectable } from '@angular/core';
import { ActionSheetController, PickerController } from '@ionic/angular';
import { ActionSheetOptions, PickerOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class Sheet {
  constructor(private action: ActionSheetController, private picker: PickerController) {
  }

  openActions(options: ActionSheetOptions): Promise<HTMLIonActionSheetElement> {
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
