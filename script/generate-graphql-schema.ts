#!/usr/bin/env -S npx ts-node --files

import { writeFile } from 'node:fs/promises';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { schema } from '../backend/graphql/schema/index.ts';

const schemaAsString = printSchema(lexicographicSortSchema(schema));
await writeFile('./config/schema.graphql', schemaAsString);
