type Primitive = string | number | boolean | Array<string | number>;
type TokenPayloadBase = Record<string, Primitive>;

export type TokenPayloadModel = Record<string, Primitive | TokenPayloadBase>;
