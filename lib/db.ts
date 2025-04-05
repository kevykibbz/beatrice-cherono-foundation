import { PrismaClient } from '@prisma/client';

// Type-safe global prisma instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize PrismaClient
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Store in globalThis in development to prevent hot-reload issues
if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma;
}

// Cleanup on exit 
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export { prisma };