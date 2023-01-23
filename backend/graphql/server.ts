import dedent from 'dedent';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

export const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  graphiql:
    process.env.NODE_ENV === 'development'
      ? {
          defaultQuery: dedent`
            query {
              hello(name: "mizdra")
            }`,
        }
      : false,
});
