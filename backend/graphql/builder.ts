import SchemaBuilder from '@pothos/core';
// eslint-disable-next-line import/no-named-as-default
import PrismaPlugin from '@pothos/plugin-prisma';
// @ts-expect-error
import PrismaTypes from '@pothos/plugin-prisma/generated';
import RelayPlugin from '@pothos/plugin-relay';
import { prisma } from '../prisma/index.ts';

export const builder = new SchemaBuilder<{
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
