import { resolve } from 'path';
import type { CodegenConfig } from '@graphql-codegen/cli';

const schemaFilePath = resolve(__dirname, './config/schema.graphql');

const config: CodegenConfig = {
  schema: schemaFilePath,
  documents: ['app/**/*.tsx'],
  generates: {
    './__generated__/graphql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

module.exports = config;
