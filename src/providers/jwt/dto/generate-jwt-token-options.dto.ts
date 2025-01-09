export class GenerateJwtTokenOptions {
  expiresIn?: number | string;
  algorithm?: 'HS256' | 'HS384' | 'HS512';
}
