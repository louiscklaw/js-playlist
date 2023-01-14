import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const deleteUser = await prisma.user.delete({
    where: {
      email: 'viola@prisma.io',
    },
  })
  console.log(deleteUser)
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
