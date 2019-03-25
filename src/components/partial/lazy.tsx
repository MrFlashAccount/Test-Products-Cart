import { lazy as ReactLazy, ComponentClass, FunctionComponent } from 'react';

type ComponentType<T = any> = ComponentClass<T> | FunctionComponent<T>;

/**
 * Лениво загружает компонент
 * Разворачивает named export в default, чтобы его "скушал" React'овский lazy
 *
 * @export
 * @param factory - функция, возвращающая асинхронный импорт
 * @param key - имя компонента
 * @returns компонент, который асинхронно себя инициализирует
 */
export function lazy<T extends { [V in K]: ComponentType }, K extends keyof T>(
  factory: () => Promise<T>,
  key: K
) {
  return ReactLazy(() => factory().then(imp => ({ default: imp[key] })));
}
