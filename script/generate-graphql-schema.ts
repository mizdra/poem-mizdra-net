#!/usr/bin/env -S npx ts-node --files

import { writeFileSync } from 'node:fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { schema } from '../backend/graphql/schema';

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync('./config/schema.graphql', schemaAsString);
