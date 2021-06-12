import { Injectable } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { firstValueFrom } from 'rxjs';
import { FileSystem } from './file-system.service';
import { Overlay } from './overlay.service';

@Injectable({
  providedIn: 'root',
})
export class System {
  constructor(
    private clipboard: Clipboard,
    private fileSystem: FileSystem,
    private overlay: Overlay,
    private socialSharing: SocialSharing,
  ) {
  }

  download(uri: string, name: string): Promise<void> {
    const onDownload = (toast: HTMLIonToastElement): Promise<string> => {
      return (
        this.fileSystem
          .download(uri, name)
          .then(() => toast.dismiss().then(() => 'Download finished'))
          .catch(() => toast.dismiss().then(() => 'Download failed'))
      );
    };

    return (
      firstValueFrom(this.overlay.openToast({ message: 'Download started' }))
        .then(t => onDownload(t))
        .then(m => firstValueFrom(this.overlay.openToast({ message: m })))
        .then(() => void 0)
    );
  }

  openUrl(url: string): Promise<void> {
    globalThis.open(url, '_blank');
    return Promise.resolve();
  }

  shareUrl(url: string): Promise<void> {
    return this.socialSharing.share(null, null, null, url);
  }

  readFromClipboard(): Promise<string> {
    return (
      this.clipboard
        .paste()
        .then(s => [s, 'Copied from clipboard'])
        .catch(s => [s, `Couldn't access clipboard`])
        .then(a => firstValueFrom(this.overlay.openToast({ message: a[1] })).then(() => a[0]))
    );
  }

  writeToClipboard(text: string): Promise<string> {
    return (
      this.clipboard
        .copy(text)
        .then(() => 'Copied to clipboard')
        .catch(() => `Couldn't access clipboard`)
        .then(m => firstValueFrom(this.overlay.openToast({ message: m })))
        .then(() => text)
    );
  }
}
