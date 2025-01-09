export type TokenPayload = Record<
  string,
  string | number | boolean | Record<string, string | number | boolean>
>;
