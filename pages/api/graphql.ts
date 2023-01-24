import { writeFileSync } from 'node:fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { schema } from '../../backend/graphql/schema/index.ts';
import { yoga } from '../../backend/graphql/server.ts';

// graphql-yoga + pothos はコードファーストで GraphQL スキーマを定義するが、
// そのままだとそのスキーマはローカルに書き出されない。
// そこで pnpm dev で立ち上げている時に /api/graphql にアクセスがあったタイミングで、
// 我々のほうでローカルにスキーマを書き出す。
// ref: https://pothos-graphql.dev/docs/guide/printing-schemas#printing-schema
if (process.env.NODE_ENV === 'development') {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync('./config/schema.graphql', schemaAsString);
}

export default yoga;
