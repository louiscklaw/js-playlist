import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const deletePosts = prisma.post.deleteMany()
  const deleteProfile = prisma.profile.deleteMany()
  const deleteUsers = prisma.user.deleteMany()

  await prisma.$transaction([deleteProfile, deletePosts, deleteUsers])
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
