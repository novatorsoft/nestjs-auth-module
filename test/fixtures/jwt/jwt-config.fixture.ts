import { Mock, MockFactory } from 'mockingbird';

import { AuthProvider } from '../../../src/dto';
import { GenerateJwtTokenOptions } from '../../../src/providers/jwt/dto';
import { GenerateJwtTokenOptionsFixture } from './generate-jwt-token-options.fixture';
import { JwtConfig } from '../../../src/providers/jwt';

export class JwtConfigFixture extends JwtConfig {
  @Mock(AuthProvider.JWT)
  provider: AuthProvider;

  @Mock((faker) => faker.datatype.boolean())
  isGlobal: boolean;

  @Mock((faker) => faker.datatype.uuid())
  secret: string;

  @Mock({})
  defaultOptions: GenerateJwtTokenOptions;

  withDefaultOptions(): this {
    this.defaultOptions = MockFactory(GenerateJwtTokenOptionsFixture).one();
    return this;
  }
}
