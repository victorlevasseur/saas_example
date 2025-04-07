import { Module } from '@nestjs/common';
import { FgaService } from './fga.service';
import { CredentialsMethod, OpenFgaClient } from '@openfga/sdk';
import { ConfigService } from '@nestjs/config';
import { FgaCheckGuard } from './guard/fga-check.guard';

@Module({
  providers: [
    FgaService,
    FgaCheckGuard,
    {
      provide: OpenFgaClient,
      useFactory: async (configService: ConfigService) => {
        const apiUrl = configService.getOrThrow<string>('OPENFGA_URL');
        const token = configService.getOrThrow<string>('OPENFGA_TOKEN');
        const storeName =
          configService.getOrThrow<string>('OPENFGA_STORE_NAME');

        const client = new OpenFgaClient({
          apiUrl,
          credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
              token,
            },
          },
        });

        // Find the store.
        const storesResponse = await client.listStores();
        const storeId = storesResponse.stores.find(
          (store) => store.name === storeName
        )?.id;

        if (!storeId) {
          throw Error(`OpenFGA store "${storeName}" not found!`);
        }

        client.storeId = storeId;

        // Find the latest Authorization model.
        // Note: the API must be restarted to use an updated authorization model.
        const modelResponse = await client.readLatestAuthorizationModel();
        if (!modelResponse.authorization_model) {
          throw Error('No OpenFGA authorization model found!');
        }

        client.authorizationModelId = modelResponse.authorization_model.id;

        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [FgaService, FgaCheckGuard],
})
export class FgaModule {}
