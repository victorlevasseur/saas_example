import { DynamicModule, Global, Module } from '@nestjs/common';
import { SuperTokensModule } from 'supertokens-nestjs';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import { ConfigService } from '@nestjs/config';
import { UserContext } from 'supertokens-node/types';
import { RecipeUserId, User } from 'supertokens-node';

export const FAKE_PASSWORD = 'abdegjrelgjroufhdjfgfdkghru47298*$$ef`:';

@Global()
@Module({
  providers: [],
  exports: [
    SuperTokensModule
  ],
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
              EmailPassword.init({
                override: {
                  apis: (originalImplementation) => {
                    return {
                      ...originalImplementation,
                      signUpPOST: undefined,
                    }
                  },
                  // Overrides to prevent:
                  // - sign in with the fake password
                  // - changing the password to the fake password
                  functions: (originalImplementation) => {
                    return {
                      ...originalImplementation,
                      updateEmailOrPassword: async function (input) {
                        // This can be called on the backend
                        // in your own APIs
                        if (input.password === FAKE_PASSWORD) {
                          throw new Error("Use a different password")
                        }

                        return originalImplementation.updateEmailOrPassword(input);
                      },
                      verifyCredentials: async (input: {
                        email: string;
                        password: string;
                        tenantId: string;
                        userContext: UserContext
                      }): Promise<{ status: 'OK'; user: User; recipeUserId: RecipeUserId } | {
                        status: 'WRONG_CREDENTIALS_ERROR'
                      }> => {
                        if (input.password === FAKE_PASSWORD) {
                          return {
                            status: 'WRONG_CREDENTIALS_ERROR'
                          };
                        }
                        return originalImplementation.verifyCredentials(input);
                      },
                      signIn: async function (input) {
                        // This is called in the email password sign in API
                        if (input.password === FAKE_PASSWORD) {
                          return {
                            status: "WRONG_CREDENTIALS_ERROR"
                          }
                        }
                        return originalImplementation.signIn(input);
                      },
                    }
                  }
                }
              }), // initializes signin / sign up features
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
