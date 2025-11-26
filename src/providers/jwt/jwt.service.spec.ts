import * as ms from 'ms';

import { Faker, MockFactory } from 'mockingbird';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtConfigFixture } from '../../../test/fixtures';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const jwtConfig = MockFactory(JwtConfigFixture).one();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'AuthConfig',
          useValue: jwtConfig,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a token', async () => {
    const result = await service.generateAsync();
    expect(result).toBeDefined();
  });

  it('should generate a token with payload', async () => {
    const result = await service.generateAsync({ id: '123' });
    expect(result).toBeDefined();
  });

  it('should generate a token with options', async () => {
    const result = await service.generateAsync(
      { id: '123' },
      { expiresIn: '1h' },
    );
    expect(result).toBeDefined();
    expect(result.expiresIn).toBe(
      new Date(Date.now() + ms('1h')).toISOString(),
    );
  });

  it('should generate a token with algorithm', async () => {
    const result = await service.generateAsync(
      { id: '123' },
      { algorithm: 'HS256' },
    );
    expect(result).toBeDefined();
  });

  it('should verify a token', async () => {
    const tokenResult = await service.generateAsync({ id: '123' });
    const result = await service.verifyAsync(tokenResult.token);
    expect(result).toBe(true);
  });

  it('should verify a token with invalid secret', async () => {
    const result = await service.verifyAsync(Faker.lorem.word(256));
    expect(result).toBe(false);
  });

  it('should decode a token', async () => {
    const tokenResult = await service.generateAsync({ id: '123' });
    const result = await service.decodeAsync(tokenResult.token);
    expect(result).toBeDefined();
    expect(result.id).toBe('123');
  });

  it('should decode a token with invalid secret', async () => {
    await expect(service.decodeAsync(Faker.lorem.word(256))).rejects.toThrow(
      'Token is invalid or expired.',
    );
  });

  it('should correctly calculate expiresIn using getExpiresIn', () => {
    const expiresIn = service['getExpiresIn']('2d');
    expect(expiresIn).toBeInstanceOf(Date);
    expect(expiresIn.getTime()).toBe(Date.now() + ms('2d'));
  });
});
