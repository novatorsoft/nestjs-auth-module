import { GenerateTokenResult, TokenPayloadModel } from './dto';

export interface AuthService<GenerateTokenOptions = undefined> {
  generateAsync(
    payload: TokenPayloadModel,
    options?: GenerateTokenOptions,
  ): Promise<GenerateTokenResult>;
  verifyAsync(token: string): Promise<boolean>;
  decodeAsync(token: string): Promise<TokenPayloadModel>;
}
