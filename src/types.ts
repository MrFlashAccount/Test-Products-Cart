export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type ObjectMap<Map extends string, V> = { [K in Map]: V };
