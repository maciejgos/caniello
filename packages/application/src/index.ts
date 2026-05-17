export type UseCaseResult<T> = {
  ok: true;
  data: T;
} | {
  ok: false;
  message: string;
};

