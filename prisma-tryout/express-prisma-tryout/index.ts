import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient()
const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/feed', async (req, res) => {

  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })

  res.json(posts)

})


app.post('/post', async (req, res) => {

  const { title, content, authorEmail } = req.body

  const post = await prisma.post.create({

    data: {

      title,

      content,

      published: false,

      author: { connect: { email: authorEmail } },

    },

  })

  res.json(post)

})


app.put('/publish/:id', async (req, res) => {

  const { id } = req.params

  const post = await prisma.post.update({

    where: { id },

    data: { published: true },

  })

  res.json(post)

})


app.delete('/user/:id', async (req, res) => {

  const { id } = req.params

  const user = await prisma.user.delete({

    where: {

      id,

    },

  })

  res.json(user)

})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
