import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('⏳ Seeding database...')

  // Add your seed data here
  // Example:
  // await prisma.blog.create({
  //   data: {
  //     title: 'Welcome to  YAANA Livings',
  //     slug: 'welcome-to-yaana-livings',
  //     excerpt: 'Your first blog post',
  //     content: '<p>Welcome to our blog!</p>',
  //     published: true,
  //     publishedAt: new Date(),
  //   },
  // })

  console.log('✅ Database seeded!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed!')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
