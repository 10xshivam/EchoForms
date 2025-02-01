import { 
    pgTable, serial, text, timestamp, varchar, integer, primaryKey 
  } from "drizzle-orm/pg-core";
  import { relations } from "drizzle-orm";
  
  export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).unique().notNull(),
    passwordHash: text("password_hash"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  export const forms = pgTable("forms", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    fields: text("fields").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  export const responses = pgTable("responses", {
    id: serial("id").primaryKey(),
    formId: integer("form_id").references(() => forms.id, { onDelete: "cascade" }).notNull(),
    respondentName: varchar("respondent_name", { length: 255 }),
    responseData: text("response_data").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  export const subscriptions = pgTable("subscriptions", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    plan: varchar("plan", { length: 50 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  export const accounts = pgTable(
    "accounts",
    {
      provider: varchar("provider", { length: 255 }).notNull(),
      providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
      userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
      compoundKey: primaryKey({ 
        columns: [table.provider, table.providerAccountId] 
      }),
    })
  );
  
  export const usersRelations = relations(users, ({ many, one }) => ({
    forms: many(forms),
    subscription: one(subscriptions, { fields: [users.id], references: [subscriptions.userId] }),
    accounts: many(accounts),
  }));
  
  export const formsRelations = relations(forms, ({ one, many }) => ({
    user: one(users, { fields: [forms.userId], references: [users.id] }),
    responses: many(responses),
  }));
  
  export const responsesRelations = relations(responses, ({ one }) => ({
    form: one(forms, { fields: [responses.formId], references: [forms.id] }),
  }));
  
  export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
    user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
  }));
  
  export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
  }));
