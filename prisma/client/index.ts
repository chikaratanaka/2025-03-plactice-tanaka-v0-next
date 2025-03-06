import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    ...(process.env.FEATURE_FLGS?.split(",").includes("PRISMA_LOG") && {
      log: [
        { emit: "stdout", level: "query" },
        { emit: "stdout", level: "error" },
        { emit: "stdout", level: "info" },
        { emit: "stdout", level: "warn" },
      ],
    }),
  })
  return prisma
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
