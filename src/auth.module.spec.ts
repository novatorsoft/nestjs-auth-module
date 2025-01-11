import { Faker, MockFactory } from 'mockingbird';

import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { GenerateJwtTokenOptions } from './providers/jwt/dto';
import { JwtConfigFixture } from '../test/fixtures';
import { Test } from '@nestjs/testing';

describe('AuthModule', () => {
  describe('JWT Provider', () => {
    describe('register', () => {
      it('JWT Auth should be defined', async () => {
        const jwtConfig = MockFactory(JwtConfigFixture)
          .mutate({
            isGlobal: false,
          })
          .one();
        const module = await Test.createTestingModule({
          imports: [AuthModule.register(jwtConfig)],
        }).compile();

        const service =
          module.get<AuthService<GenerateJwtTokenOptions>>('AuthService');
        expect(service).toBeDefined();
      });

      it('JWT Auth should be defined (global defined)', async () => {
        const jwtConfig = MockFactory(JwtConfigFixture)
          .mutate({
            isGlobal: true,
          })
          .one();
        const module = await Test.createTestingModule({
          imports: [AuthModule.register(jwtConfig)],
        }).compile();

        const service =
          module.get<AuthService<GenerateJwtTokenOptions>>('AuthService');
        expect(service).toBeDefined();
      });
    });

    describe('registerAsync', () => {
      it('JWT Auth should be defined', async () => {
        const jwtConfig = MockFactory(JwtConfigFixture).one();
        const module = await Test.createTestingModule({
          imports: [
            AuthModule.registerAsync({
              provider: jwtConfig.provider,
              isGlobal: false,
              useFactory: () => jwtConfig,
              inject: [],
            }),
          ],
        }).compile();

        const service =
          module.get<AuthService<GenerateJwtTokenOptions>>('AuthService');
        expect(service).toBeDefined();
      });

      it('JWT Auth should be defined(with default global config)', async () => {
        const jwtConfig = MockFactory(JwtConfigFixture).one();
        const module = await Test.createTestingModule({
          imports: [
            AuthModule.registerAsync({
              provider: jwtConfig.provider,
              useFactory: () => jwtConfig,
              inject: [],
            }),
          ],
        }).compile();

        const service =
          module.get<AuthService<GenerateJwtTokenOptions>>('AuthService');
        expect(service).toBeDefined();
      });

      it('JWT Auth should be defined (global defined)', async () => {
        const jwtConfig = MockFactory(JwtConfigFixture).one();
        const module = await Test.createTestingModule({
          imports: [
            AuthModule.registerAsync({
              provider: jwtConfig.provider,
              isGlobal: true,
              useFactory: () => jwtConfig,
              inject: [],
            }),
          ],
        }).compile();

        const service =
          module.get<AuthService<GenerateJwtTokenOptions>>('AuthService');
        expect(service).toBeDefined();
      });
    });
  });

  it('should throw an error when given an invalid provider', async () => {
    expect(async () => {
      await Test.createTestingModule({
        imports: [
          AuthModule.register({
            provider: Faker.lorem.word(),
          } as any),
        ],
      }).compile();
    }).rejects.toThrow('Invalid auth provider');
  });
});
