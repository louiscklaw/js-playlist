import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const updateUser = await prisma.user.update({
    where: {
      email: 'alice@prisma.io',
    },
    data: {
      name: '1111 the Magnificent',
    },
  })
  console.log(updateUser)
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
