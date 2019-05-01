import { propertyWithHistory } from './property';

describe('Basic History Emitter test', () => {
  test('It creates', () => {
    const [_, historyEmitter] = propertyWithHistory(0, [1], [2]);
    
    expect(historyEmitter).toBeTruthy();

    historyEmitter.pPast.take(1).observe(v => {
      expect(v).toEqual([1]);
    });

    historyEmitter.pFuture.take(1).observe(v => {
      expect(v).toEqual([2]);
    });
  });

  test('It changes correctly', () => {
    const [_, historyEmitter] = propertyWithHistory(0, [1], [2]);

    historyEmitter.set(4);
    expect(historyEmitter.lastValue).toBe(4);
    historyEmitter.pPast.take(1).observe(v => expect(v).toEqual([1, 0]));
    historyEmitter.pFuture.take(1).observe(v => expect(v).toEqual([]));
  });
});
