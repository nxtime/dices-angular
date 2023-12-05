import { Observable, take } from 'rxjs';

export const computed = <T>(observable: Observable<T>, selector?: any) => {
  return new Promise((resolve) => {
    observable.pipe(take(1)).subscribe((data) => {
      if (selector) {
        resolve(data[selector]);
      }

      if (!selector) {
        resolve(data);
      }
    });
  });
};
