import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { AuthConfig } from './auth.config';

export type ConfigType = any;

export type AuthAsyncConfig = Pick<ModuleMetadata, 'imports'> &
  Pick<
    FactoryProvider<Pick<ConfigType, 'provider' | 'isGlobal'>>,
    'useFactory' | 'inject'
  > &
  AuthConfig;
