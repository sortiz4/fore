type HTMLIonEventListener = <T, U>(event: CustomEvent<T>) => U;
type HTMLIonRefresherElementEventName = 'ionPull' | 'ionRefresh' | 'ionStart';
type HTMLIonSearchbarElementEventName = 'ionBlur' | 'ionCancel' | 'ionChange' | 'ionClear' | 'ionFocus' | 'ionInput';
type HTMLIonToggleElementEventName = 'ionBlur' | 'ionChange' | 'ionFocus';

declare interface HTMLIonRefresherElement {
  addEventListener(event: HTMLIonRefresherElementEventName, listener: HTMLIonEventListener): this;
}

declare interface HTMLIonSearchbarElement {
  addEventListener(event: HTMLIonSearchbarElementEventName, listener: HTMLIonEventListener): this;
}

declare interface HTMLIonToggleElement {
  addEventListener(event: HTMLIonToggleElementEventName, listener: HTMLIonEventListener): this;
}

declare interface ObjectConstructor {
  fromEntries<K extends number | string, V>(entries: [K, V][]): { [key in K]: V };
}
