import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }),
    image: varchar('image', { length: 512 }),
    createdAt: timestamp('created_at').defaultNow(),
  });

