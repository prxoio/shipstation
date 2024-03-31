import {createAdminApiClient} from '@shopify/admin-api-client';

const client = createAdminApiClient({
  storeDomain: 'manufi.myshopify.com',
  apiVersion: '2023-04',
  accessToken: process.env.ADMIN_API_TOKEN as string,
});

const response = await client.get("products/1234567890");

if (response.ok) {
  const body = await response.json();
}