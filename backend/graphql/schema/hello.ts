import { builder } from '../builder.ts';

builder.queryFields((t) => ({
  hello: t.string({
    args: {
      name: t.arg.string(),
    },
    resolve: (parent, { name }) => `hello, ${name || 'World'}`,
  }),
}));
