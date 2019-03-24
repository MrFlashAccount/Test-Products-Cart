import { lazy as ReactLazy, ComponentClass, FunctionComponent } from 'react';

/**
 * Лениво загружает компонент
 * Разворачивает named export в default, чтобы его "скушал" React'овский lazy
 *
 * @export
 * @param factory - функция, возвращающая анихронный импорт
 * @param key - имя компонента
 * @returns компонент, который асинхронно себя инициализирует
 */
export function lazy<T extends {}, K extends keyof T>(
  factory: () => Promise<T>,
  key: T[K] extends (ComponentClass<any> | FunctionComponent<any>) ? K : never
) {
  // TODO: разобраться с типизацией, сейчас, к сожалению, не вышло объяснить тайпскрипту, что T[K] - typeof ComponentClass | FunctionComponent
  return ReactLazy(() => factory().then(imp => ({ default: imp[key] as any })));
}
