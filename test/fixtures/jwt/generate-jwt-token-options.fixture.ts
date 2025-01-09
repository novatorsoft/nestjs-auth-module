import { GenerateJwtTokenOptions } from '../../../src/providers/jwt/dto';
import { Mock } from 'mockingbird';

export class GenerateJwtTokenOptionsFixture extends GenerateJwtTokenOptions {
  @Mock((faker) => faker.datatype.number({ min: 60 }))
  expiresIn?: number;

  @Mock('HS256')
  algorithm?: 'HS256' | 'HS384' | 'HS512';
}
