import { yoga } from '../graphql/server';

export async function fetchQuery(args: { query: string }): Promise<Response> {
  const res = await yoga.fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: args.query,
    }),
  });
  return res;
}
