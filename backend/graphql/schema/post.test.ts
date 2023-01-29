import { encodeGlobalID } from '@pothos/plugin-relay';
import { definePostFactory } from '../../../__generated__/fabbrica';
import { fetchQuery } from '../../test/graphql';
import { truncateAll } from '../../test/prisma';

export const PostFactory = definePostFactory();

test('type', async () => {
  const post = await PostFactory.create();
  const res = await fetchQuery({
    query: /* GraphQL */ `
      query ($id: ID!) {
        node(id: $id) {
          ... on Post {
            id
            title
            description
          }
        }
      }
    `,
    variables: {
      id: encodeGlobalID('Post', post.id),
    },
  });

  const json = await res.json();
  expect(json).toStrictEqual({
    data: {
      node: expect.objectContaining({
        id: encodeGlobalID('Post', post.id),
        title: post.title,
        description: post.description,
      }),
    },
  });
});

describe('posts query', () => {
  test('全ての投稿を取得できる', async () => {
    await truncateAll();

    const post1 = await PostFactory.create();
    const post2 = await PostFactory.create();

    const res = await fetchQuery({
      query: /* GraphQL */ `
        query {
          posts {
            edges {
              node {
                id
                title
                description
              }
            }
          }
        }
      `,
    });

    const json = await res.json();
    expect(json).toStrictEqual({
      data: {
        posts: {
          edges: [
            { node: expect.objectContaining({ id: encodeGlobalID('Post', post1.id) }) },
            { node: expect.objectContaining({ id: encodeGlobalID('Post', post2.id) }) },
          ],
        },
      },
    });
  });
});
