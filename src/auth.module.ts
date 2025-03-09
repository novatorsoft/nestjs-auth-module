import * as lodash from 'lodash';

import { AuthAsyncConfig, ConfigType } from './config/auth-async.config';
import { DynamicModule, Module } from '@nestjs/common';

import { AuthGuard } from './guards';
import { AuthProvider } from './dto';
import { JwtService } from './providers/jwt/jwt.service';

@Module({})
export class AuthModule {
  static register(config: ConfigType): DynamicModule {
    return AuthModule.mergeObject(
      {
        module: AuthModule,
        global: config?.isGlobal ?? false,
        providers: [
          {
            provide: 'AuthConfig',
            useValue: config,
          },
          AuthGuard,
        ],
        exports: ['AuthService'],
      },
      AuthModule.getAuthProviderModuleConfig(config?.provider),
    );
  }

  static registerAsync(config: AuthAsyncConfig): DynamicModule {
    return AuthModule.mergeObject(
      {
        module: AuthModule,
        global: config?.isGlobal ?? false,
        imports: config.imports,
        exports: ['AuthService'],
        providers: [
          {
            provide: 'AuthConfig',
            useFactory: config.useFactory,
            inject: config.inject,
          },
          AuthGuard,
        ],
      },
      AuthModule.getAuthProviderModuleConfig(config?.provider),
    );
  }

  private static getAuthProviderModuleConfig(provider?: AuthProvider) {
    const authModuleConfigs = {
      [AuthProvider.JWT]: {
        providers: [
          {
            provide: 'AuthService',
            useClass: JwtService,
          },
        ],
      },
    };

    const authModuleConfig = authModuleConfigs[provider];
    if (!authModuleConfig) throw new Error('Invalid auth provider');
    return authModuleConfig;
  }

  private static mergeObject(object1: object, object2: object) {
    return lodash.mergeWith(object1, object2, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    });
  }
}
