import { property } from './property';

describe('Basic Persistent Emitter test', () => {
  test('It creates', () => {
    const [_, emitter] = property(0);

    expect(emitter).toBeTruthy();
    expect(emitter.lastValue).toBe(0);
  });

  test('It changes', () => {
    const [_, emitter] = property(0);
    emitter.set(1);

    expect(emitter.lastValue).toBe(1);
  });

  test('It patches', () => {
    const [_, emitter] = property({ added: false });

    emitter.patch(() => ({ added: true }));
    expect(emitter.lastValue.added).toBe(true);
  });
});
