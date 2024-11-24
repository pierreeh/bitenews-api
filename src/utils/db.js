// npx prisma generate - npx prisma db push
const PrismaClient = require("@prisma/client").PrismaClient;

const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

module.exports = db;
