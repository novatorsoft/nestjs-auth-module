import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization']?.split(' ')[1];

      if (!token) throw new Error('No token provided.');

      const decodedToken = await this.authService.decodeAsync(token);
      request.tokenPayload = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message ?? 'Invalid token.');
    }
  }
}
