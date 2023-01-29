import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';

export const TEST_DATABASE_URL = 'mysql://root:password@localhost:3306/mydb';

export async function truncateAll() {
  // prisma クライアントに生えているモデル一覧
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name) as Prisma.ModelName[];

  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=0`;

  for (const modelName of modelNames) {
    await prisma.$queryRawUnsafe(`TRUNCATE TABLE ${modelName}`);
  }

  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=1`;
}
