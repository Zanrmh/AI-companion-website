const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: 'Người nổi tiếng' },
        { name: 'Phim và Truyền hình' },
        { name: 'Trò chơi' },
        { name: 'Anime' },
        { name: 'Động vật' },
        { name: 'Chính trị' },
        { name: 'Khoa học' },
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories', error);
  } finally {
    await db.$disconnect();
  }
}

main();
