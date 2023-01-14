import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const updatePosts = await prisma.post.updateMany({
    data: {
      views: {
        increment: 1,
      },
      likes: {
        increment: 1,
      },
    },
  })
  console.log(updatePosts)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
