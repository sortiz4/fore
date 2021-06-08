declare interface ObjectConstructor {
  fromEntries<K extends number | string, V>(entries: [K, V][]): { [key in K]: V };
}
