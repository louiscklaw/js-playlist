import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const deletePosts = prisma.post.deleteMany({
    where: {
      authorId: 2,
    },
  })
  const deleteUser = prisma.user.delete({
    where: {
      id: 2,
    },
  })
  const transaction = await prisma.$transaction([deletePosts, deleteUser])
  console.log(transaction)
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
