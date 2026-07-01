# TypeScript Axios Client README

This folder contains a minimal TypeScript + Axios client scaffold with an example usage. It is intentionally small; for a full generated client use openapi-generator.

To generate a full client (optional):
- Install openapi-generator-cli and run:
  openapi-generator-cli generate -i ../../openapi.yaml -g typescript-axios -o ./generated

Minimal usage example (see src/index.ts):
- Shows how to create an Axios instance and call the jobs search endpoint using bearer token auth.
