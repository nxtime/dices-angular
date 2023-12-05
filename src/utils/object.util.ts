type KeyOf<T> = keyof T;
type ValueOf<T> = T[KeyOf<T>];

type Entries<T> = Array<[KeyOf<T>, ValueOf<T>]>;
type EntriesCb<T> = (key: KeyOf<T>, value: ValueOf<T>) => T | void;

export const fromEntries = <T extends Object>(object: T, cb: EntriesCb<T>) => {
  return (Object.entries(object) as Entries<T>).map(([key, value]) =>
    cb(key, value),
  );
};
