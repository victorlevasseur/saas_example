import * as fs from 'node:fs/promises';
import { CredentialsMethod, OpenFgaClient } from '@openfga/sdk';
import { transformer } from '@openfga/syntax-transformer';

// The script does not support pagination.

const openFgaOptions = {
  url: 'http://localhost:8080',
  apiToken: 'local_key',
  storeName: 'saas',
  modelFilePath: import.meta.dirname + '/model.openfga',
};

(async () => {
  const fgaClientOptions = {
    apiUrl: openFgaOptions.url,
    credentials: {
      method: CredentialsMethod.ApiToken,
      config: {
        token: openFgaOptions.apiToken
      }
    }
  };

  // Find the corresponding store ID.
  let fgaClient = new OpenFgaClient(fgaClientOptions);

  const stores = await fgaClient.listStores();

  let storeId = stores.stores
    .find((store) => store.name === openFgaOptions.storeName)
    ?.id;
  if (!storeId) {
    const createResponse = await fgaClient.createStore({
      name: openFgaOptions.storeName,
    });
    storeId = createResponse.id;
  }

  fgaClient = new OpenFgaClient({
    ...fgaClientOptions,
    storeId
  });

  // Read the model and transform it to JSON.
  const modelString = await fs.readFile(openFgaOptions.modelFilePath, { encoding: 'utf8' });
  const model = transformer.transformDSLToJSONObject(modelString);

  // Update the model.
  await fgaClient.writeAuthorizationModel(model);
})();





