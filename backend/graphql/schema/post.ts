import { prisma } from '../../prisma';
import { builder } from '../builder';

builder.prismaNode('Post', {
  id: { field: 'id' },
  fields: (t) => ({
    title: t.exposeString('title'),
    description: t.exposeString('description'),
  }),
});

builder.queryFields((t) => ({
  posts: t.prismaConnection(
    {
      type: 'Post',
      cursor: 'id',
      resolve: (query, parent, args, context, info) => prisma.post.findMany({ ...query }),
    },
    {}, // optional options for the Connection type
    {}, // optional options for the Edge type),
  ),
}));
