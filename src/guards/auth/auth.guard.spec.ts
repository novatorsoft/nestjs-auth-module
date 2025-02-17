import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../../auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      decodeAsync: jest.fn(),
    } as any;
    authGuard = new AuthGuard(authService);
  });

  it('should return true if token is valid', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer validToken',
          },
        }),
      }),
    } as ExecutionContext;

    (authService.decodeAsync as jest.Mock).mockResolvedValue({ userId: 1 });

    const result = await authGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as ExecutionContext;

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalidToken',
          },
        }),
      }),
    } as ExecutionContext;

    (authService.decodeAsync as jest.Mock).mockRejectedValue(
      new Error('Invalid token'),
    );

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
