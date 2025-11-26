import { GenerateTokenResult, TokenPayloadModel } from '../../dto';

import { AuthService } from '../../auth.service';
import { GenerateJwtTokenOptions } from './dto';
import { Inject, Injectable } from '@nestjs/common';
import { JwtConfig } from './jwt.config';
import { SignJWT, jwtVerify } from 'jose';

@Injectable()
export class JwtService implements AuthService<GenerateJwtTokenOptions> {
  constructor(@Inject('AuthConfig') private readonly jwtConfig: JwtConfig) {}

  async generateAsync(
    payload?: TokenPayloadModel,
    options?: GenerateJwtTokenOptions,
  ): Promise<GenerateTokenResult> {
    const secretKey = new TextEncoder().encode(this.jwtConfig.secret);
    const expiresIn =
      options?.expiresIn ?? this.jwtConfig?.defaultOptions?.expiresIn ?? '365d';

    const token = await new SignJWT(payload ?? {})
      .setProtectedHeader({
        alg:
          options?.algorithm ??
          this.jwtConfig?.defaultOptions?.algorithm ??
          'HS256',
      })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(secretKey);

    return {
      token,
      expiresIn,
    };
  }

  async verifyAsync(token: string): Promise<boolean> {
    try {
      await this.decodeAsync(token);
      return true;
    } catch {
      return false;
    }
  }

  async decodeAsync(token: string): Promise<TokenPayloadModel> {
    try {
      const secretKey = new TextEncoder().encode(this.jwtConfig.secret);
      return (await jwtVerify(token, secretKey)).payload as TokenPayloadModel;
    } catch {
      throw new Error('Token is invalid or expired.');
    }
  }
}
