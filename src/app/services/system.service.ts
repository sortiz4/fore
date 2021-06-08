import { Injectable } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Notification } from './notification.service';
import { FileSystem } from './file-system.service';

@Injectable({
  providedIn: 'root',
})
export class System {
  constructor(
    private clipboard: Clipboard,
    private fileSystem: FileSystem,
    private notification: Notification,
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
      this.notification
        .openFooterToast({ message: 'Download started' })
        .toPromise()
        .then(t => onDownload(t))
        .then(m => this.notification.openFooterToast({ message: m }).toPromise())
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
        .then(a => this.notification.openFooterToast({ message: a[1] }).toPromise().then(() => a[0]))
    );
  }

  writeToClipboard(text: string): Promise<string> {
    return (
      this.clipboard
        .copy(text)
        .then(() => 'Copied to clipboard')
        .catch(() => `Couldn't access clipboard`)
        .then(m => this.notification.openFooterToast({ message: m }).toPromise())
        .then(() => text)
    );
  }
}
