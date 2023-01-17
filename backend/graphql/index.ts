import SchemaBuilder from '@pothos/core';
// eslint-disable-next-line import/no-named-as-default
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import RelayPlugin from '@pothos/plugin-relay';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [RelayPlugin, PrismaPlugin],
  prisma: {
    client: prisma,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: 'omit',
    cursorType: 'String',
  },
});

builder.prismaNode('Article', {
  id: { field: 'id' },
  fields: (t) => ({
    title: t.exposeString('title'),
    description: t.exposeString('description'),
  }),
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
    posts: t.prismaConnection(
      {
        type: 'Article',
        cursor: 'id',
        resolve: (query, parent, args, context, info) => prisma.article.findMany({ ...query }),
      },
      {}, // optional options for the Connection type
      {}, // optional options for the Edge type),
    ),
  }),
});

export const schema = builder.toSchema();
