import './post';
import './hello';
import { writeFileSync } from 'node:fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { builder } from '../builder';

builder.queryType();
// builder.mutationType();

export const schema = builder.toSchema();

export function writeSchemaFile() {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync('./config/schema.graphql', schemaAsString);
}
