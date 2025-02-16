type Primitive = string | number | boolean | Array<string | number>;
type TokenPayloadBase = Record<string, Primitive>;

export type TokenPayload = Record<string, Primitive | TokenPayloadBase>;
