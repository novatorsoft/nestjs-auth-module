import { AuthConfig } from '../../config';
import { AuthProvider } from '../../dto';
import { GenerateJwtTokenOptions } from './dto';

export class JwtConfig extends AuthConfig {
  readonly provider = AuthProvider.JWT;
  secret: string;
  defaultOptions?: GenerateJwtTokenOptions;
}
