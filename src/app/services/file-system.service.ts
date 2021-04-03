import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Toast } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class FileSystem {
  constructor(private file: File, private toast: Toast, private transfer: FileTransfer) {
  }

  download(uri: string, name: string): Promise<void> {
    const onDownload = (toast: HTMLIonToastElement): Promise<string> => {
      return (
        this.transfer
          .create()
          .download(uri, [this.file.externalRootDirectory, 'Download', name].join('/'))
          .then(() => toast.dismiss().then(() => 'Download finished'))
          .catch(() => toast.dismiss().then(() => 'Download failed'))
      );
    };

    return (
      this.toast
        .openToast({ message: 'Download started' })
        .toPromise()
        .then(t => onDownload(t))
        .then(m => this.toast.openToast({ message: m }).toPromise())
        .then(() => void 0)
    );
  }
}
