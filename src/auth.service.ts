import * as ms from 'ms';

import { GenerateTokenResult, TokenPayloadModel } from './dto';

export abstract class AuthService<GenerateTokenOptions = undefined> {
  protected readonly defaultExpiresIn: string = '365d';

  abstract generateAsync(
    payload: TokenPayloadModel,
    options?: GenerateTokenOptions,
  ): Promise<GenerateTokenResult>;
  abstract verifyAsync(token: string): Promise<boolean>;
  abstract decodeAsync(token: string): Promise<TokenPayloadModel>;

  protected getExpiresIn(expiresIn?: number | string): Date {
    return new Date(Date.now() + ms(expiresIn as ms.StringValue));
  }
}
