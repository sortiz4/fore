import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage-angular';
import { Board } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  private readonly boards = 'boards';

  constructor(private storage: IonicStorage) {
  }

  create(): Promise<IonicStorage> {
    return this.storage.create();
  }

  getBoards(): Promise<Board[]> {
    return this.storage.get(this.boards);
  }

  setBoards(boards: Board[]): Promise<Board[]> {
    return this.storage.set(this.boards, boards);
  }
}
