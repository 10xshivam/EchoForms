import { 
  pgTable, 
  text, 
  timestamp, 
  boolean, 
  integer, 
  jsonb, 
  uuid, 
  serial
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  image: text("image"),
  plan: text("plan").default("free"), 
  createdForms: integer("created_forms").default(0),
  totalSubmissions: integer("total_submissions").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  ownerId: text("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  published: boolean("published").default(false),
  content: jsonb("content").notNull(),
  submissions: integer("submissions").default(0),
  shareUrl: uuid("share_url").defaultRandom(),
});

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  formId: integer("form_id").notNull().references(() => forms.id, { onDelete: "cascade" }),
  content: jsonb("content").notNull(),
});




