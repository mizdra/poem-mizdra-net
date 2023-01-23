import { prisma } from '../prisma';
import { builder } from './builder';

builder.prismaNode('Post', {
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
        type: 'Post',
        cursor: 'id',
        resolve: (query, parent, args, context, info) => prisma.post.findMany({ ...query }),
      },
      {}, // optional options for the Connection type
      {}, // optional options for the Edge type),
    ),
  }),
});

export const schema = builder.toSchema();
