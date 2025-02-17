import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { TokenPayload as TokenPayloadModel } from '../dto';

export const TokenPayload = createParamDecorator(
  (_: unknown, context: ExecutionContext): TokenPayloadModel | undefined => {
    const request = context.switchToHttp().getRequest();
    return request?.tokenPayload;
  },
);
