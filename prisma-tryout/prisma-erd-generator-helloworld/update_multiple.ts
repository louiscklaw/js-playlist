import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const updateUsers = await prisma.user.updateMany({
    where: {
      email: {
        contains: 'prisma.io',
      },
    },
    data: {
      name: '111111',
    },
  })
  console.log(updateUsers)
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
