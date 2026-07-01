# OpenAPI README — Navil Job Connect

This directory contains the OpenAPI 3.1 specification and a small TypeScript Axios client scaffold.

Files added to the feat/openapi branch:
- openapi.yaml  — OpenAPI 3.1 spec for /api/v1
- README.md (this file)
- .env.example  — example environment variables
- clients/typescript-axios/README.md — how to use the client
- clients/typescript-axios/src/index.ts — minimal usage example

Auth flows
- Email/password: POST /api/v1/auth/register -> verify email -> POST /api/v1/auth/login -> returns access_token + refresh_token
- Refresh: POST /api/v1/auth/refresh with refresh_token -> new access token
- Social: OAuth2 Authorization Code flow (OAuth2 security scheme is included as a placeholder)

File uploads
- Two options are supported:
  1) Direct multipart upload to the API endpoint (e.g., POST /api/v1/seeker/resume)
  2) Presigned S3 flow: request presigned URL from API, upload directly to S3, then notify API with the S3 object key. The spec documents the multipart option; implement presigned flow endpoints on the backend as needed.

Paystack integration
- We include POST /api/v1/webhooks/paystack for receiving Paystack payment events. Validate webhooks using the X-Paystack-Signature header and the PAYSTACK_WEBHOOK_SECRET.
- For subscription and single-charge flows, implement server-side verification using Paystack's API and reconcile payments with invoices/subscriptions in the DB.

Currency & localization
- The spec includes CurrencyAmount objects with base and localized amounts.
- The API accepts Accept-Language and X-Currency headers. If absent, the server should infer currency from the user's profile or IP geolocation.
- Example env var for exchange-rate provider: EXCHANGE_RATE_API_KEY; we include example variable names in .env.example.

How to preview the OpenAPI spec locally
- Redoc (CLI):
  npx redoc-cli serve openapi.yaml
- Swagger UI (Docker):
  docker run --rm -p 8080:8080 -v $(pwd)/openapi.yaml:/tmp/openapi.yaml openapi/swagger-ui:latest
  then open http://localhost:8080/?url=/tmp/openapi.yaml
- Import openapi.yaml into Postman / Insomnia to generate collections

Client generator
- A minimal TypeScript Axios client scaffold is included at clients/typescript-axios/.
- You can generate a full client using openapi-generator or Swagger Codegen if you prefer a complete typed client. Example command:
  openapi-generator-cli generate -i openapi.yaml -g typescript-axios -o clients/typescript-axios

Next steps
- If you want, I can generate the full typescript-axios client with openapi-generator and push it here (it will create many files). Confirm if you want the full generated client or keep the minimal scaffold.
