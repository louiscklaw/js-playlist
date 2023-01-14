import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const upsertUser = await prisma.user.upsert({
    where: {
      email: 'viola@prisma.io',
    },
    update: {
      name: 'Viola the Magnificent',
    },
    create: {
      email: 'viola@prisma.io',
      name: 'Viola the Magnificent',
    },
  })
  console.log(upsertUser)
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
