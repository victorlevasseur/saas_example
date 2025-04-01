import { DynamicModule, Global, Module } from '@nestjs/common';
import { SuperTokensModule } from 'supertokens-nestjs';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  exports: [SuperTokensModule],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        SuperTokensModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            framework: 'express',
            supertokens: {
              connectionURI: configService.getOrThrow<string>(
                'SUPERTOKENS_CONNECTION_URI'
              ),
              apiKey: configService.get<string>('SUPERTOKENS_API_KEY'),
            },
            appInfo: {
              appName: 'saas-example',
              apiDomain: configService.getOrThrow<string>('DOMAIN_API'),
              websiteDomain: configService.getOrThrow<string>('DOMAIN_FRONT'),
              apiBasePath: '/auth',
              websiteBasePath: '/auth',
            },
            recipeList: [
              EmailPassword.init(), // initializes signin / sign up features
              Session.init(), // initializes session features
            ],
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [],
    };
  }
}
