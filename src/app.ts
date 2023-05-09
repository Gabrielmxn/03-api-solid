import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Gabriel Alves',
    email: 'gabrieldevalves@hotmail.com',
  },
})
