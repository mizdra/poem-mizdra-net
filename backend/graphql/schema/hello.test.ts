import { fetchQuery } from '../../test/graphql';

test('「こんにちは世界」が返せる', async () => {
  const res = await fetchQuery({ query: '{ hello }' });
  expect(res.status).toBe(200);
  const json = await res.json();
  expect(json).toEqual({ data: { hello: 'hello, World' } });
});

test('名前に対して挨拶できる', async () => {
  const res = await fetchQuery({ query: '{ hello(name: "mizdra") }' });
  expect(res.status).toBe(200);
  const json = await res.json();
  expect(json).toEqual({ data: { hello: 'hello, mizdra' } });
});
