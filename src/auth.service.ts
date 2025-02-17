import { GenerateTokenResult, TokenPayload } from './dto';

export interface AuthService<GenerateTokenOptions = undefined> {
  generateAsync(
    payload: TokenPayload,
    options?: GenerateTokenOptions,
  ): Promise<GenerateTokenResult>;
  verifyAsync(token: string): Promise<boolean>;
  decodeAsync(token: string): Promise<TokenPayload>;
}
