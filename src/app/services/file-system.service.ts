import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root',
})
export class FileSystem {
  constructor(private file: File, private transfer: FileTransfer) {
  }

  download(uri: string, name: string): Promise<void> {
    return (
      this.transfer
        .create()
        .download(uri, [this.file.externalRootDirectory, 'Download', name].join('/'))
    );
  }
}
