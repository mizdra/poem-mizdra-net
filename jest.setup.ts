import { execSync } from 'node:child_process';
import { initialize } from './__generated__/fabbrica';
import { prisma } from './backend/prisma';
import { TEST_DATABASE_URL } from './backend/test/prisma';

process.env.DATABASE_URL = `${TEST_DATABASE_URL}-test-${process.env.JEST_WORKER_ID!}`;

initialize({ prisma });

beforeAll(() => {
  // テストを実行する前に、前のテストで insert されたレコードを削除しつつ、スキーマも最新のものに更新する。
  execSync('npx prisma migrate reset --force --skip-seed', {
    // 公式ドキュメントでは process.env を継承することになってるけど、
    // 何故か実行時に process.env を書き換えて追加した環境変数は継承してくれないっぽい (おそらく Node.js のバグ)。
    // - https://nodejs.org/api/child_process.html#child_processexecsynccommand-options
    // 仕方がないので、明示的に上書きしたものを渡してる
    env: {
      ...process.env,
    },
  });
});
