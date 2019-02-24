export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type ObjectMap<Map extends string, V> = { [K in Map]: V };

export type KeyMap<V> = {
  [index: string]: V;
};

export type IDMap<V> = {
  [index: number]: V;
};
