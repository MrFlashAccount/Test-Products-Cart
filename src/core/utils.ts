import { Property, stream } from 'kefir';
import { HistoryEmitter } from './HistoryEmitter';
import { PersistentEmitter } from './PersistentEmitter';

export function propertyWithHistory<T, S = never>(initial: T) {
  return createProperty<HistoryEmitter<T, S>, T, S>(new HistoryEmitter<T, S>(initial));
}

export function property<T, S = never>(initial: T) {
  return createProperty<PersistentEmitter<T, S>, T, S>(new PersistentEmitter<T, S>(initial));
}

export function createProperty<E extends PersistentEmitter<T, S>, T, S>(ourEmitter: E): [Property<T, S>, E] {
  const _stream = stream<T, S>(emitter => ourEmitter.bind(emitter));

  return [_stream.toProperty(), ourEmitter];
}
