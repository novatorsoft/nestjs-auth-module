import { ExecutionContext } from '@nestjs/common';
import { TokenPayload } from './token-payload.decorator';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

function getParamDecoratorFactory() {
  class TestDecorator {
    public getDecoratorValue(@TokenPayload() value) {
      console.log(value);
    }
  }

  const args = Reflect.getMetadata(
    ROUTE_ARGS_METADATA,
    TestDecorator,
    'getDecoratorValue',
  );
  return args[Object.keys(args)[0]].factory;
}

describe('TokenPayload Decorator', () => {
  it('should return the token payload from the request', () => {
    const mockTokenPayload = { userId: '123', roles: ['admin'] };
    const mockRequest = {
      tokenPayload: mockTokenPayload,
    };

    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory();
    const tokenPayload = factory('tokenPayload', mockContext);

    expect(tokenPayload).toEqual(mockTokenPayload);
  });

  it('should return undefined if no token payload is present', () => {
    const mockRequest = {};

    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const factory = getParamDecoratorFactory();
    const tokenPayload = factory('tokenPayload', mockContext);

    expect(tokenPayload).toBeUndefined();
  });
});
