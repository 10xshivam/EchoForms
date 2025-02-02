import { pgTable, serial, timestamp, varchar, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  profileImage: varchar('profile_image', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const subscriptions = pgTable('subscription', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).unique(),
  subscribed: boolean('subscribed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const forms = pgTable('form', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  fields: jsonb('fields').notNull(), 
  shareUrl: varchar('share_url', { length: 512 }).unique(),
  qrcode: varchar('qrcode', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const responses = pgTable('response', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').references(() => forms.id),
  content: jsonb('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
