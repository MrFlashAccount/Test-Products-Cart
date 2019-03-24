import { lazy as ReactLazy, ComponentClass, FunctionComponent } from 'react';

/**
 * 
 *
 * @export
 * @template T
 * @template K
 * @param factory
 * @param key
 * @returns
 */
export function lazy<T extends {}, K extends keyof T>(
  factory: () => Promise<T>,
  key: T[K] extends (ComponentClass<any> | FunctionComponent<any>) ? K : never
) {
  // TODO: разобраться с типизацией, сейчас, к сожалению, не вышло объяснить тайпскрипту, что T[K] - typeof ComponentClass | FunctionComponent
  return ReactLazy(() => factory().then(imp => ({ default: imp[key] as any })));
}
