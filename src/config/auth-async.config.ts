import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { AuthConfig } from './auth.config';
import { JwtConfig } from '../providers';

export type ConfigType = JwtConfig;

export type AuthAsyncConfig = Pick<ModuleMetadata, 'imports'> &
  Pick<
    FactoryProvider<Omit<ConfigType, 'provider' | 'isGlobal'>>,
    'useFactory' | 'inject'
  > &
  AuthConfig;
