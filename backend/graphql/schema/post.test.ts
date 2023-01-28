import { encodeGlobalID } from '@pothos/plugin-relay';
import { definePostFactory } from '../../../__generated__/fabbrica';
import { fetchQuery } from '../../test/graphql';
import { truncateAll } from '../../test/prisma';

export const PostFactory = definePostFactory();

// describe('type', () => {});

describe('posts query', () => {
  test('全ての投稿を取得できる', async () => {
    await truncateAll();

    const post1 = await PostFactory.create();
    const post2 = await PostFactory.create();

    const res = await fetchQuery({ query: '{ posts { edges { node { id title description } } } }' });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({
      data: {
        posts: {
          edges: [
            {
              node: {
                id: encodeGlobalID('Post', post1.id),
                title: post1.title,
                description: post1.description,
              },
            },
            {
              node: {
                id: encodeGlobalID('Post', post2.id),
                title: post2.title,
                description: post2.description,
              },
            },
          ],
        },
      },
    });
  });
});
