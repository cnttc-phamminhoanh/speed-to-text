CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "FileStatus" AS ENUM (
  'uploaded',
  'processing',
  'completed',
  'failed',
  'cancelled'
);

CREATE TYPE "JobStatus" AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed',
  'timeout'
);

CREATE TABLE IF NOT EXISTS "users" (
  "user_id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  "user_name" varchar(255) NOT NULL,
  "phone_number" varchar(20),
  "email" varchar(255) UNIQUE NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "is_active" boolean DEFAULT false,
  "last_activated_at" timestamp,
  "refresh_token" varchar(255),
  "refresh_token_expires_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE IF NOT EXISTS "files" (
  "file_id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "original_name" varchar(255) NOT NULL,
  "storage_path" varchar(512) NOT NULL,
  "mime_type" varchar(100),
  "duration" integer,
  "size" integer,
  "status" "FileStatus" DEFAULT 'uploaded',
  "created_at" timestamp DEFAULT (now()),
  FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "conversion_jobs" (
  "conversion_job_id" uuid PRIMARY KEY,
  "file_id" uuid NOT NULL,
  "status" "JobStatus" DEFAULT 'pending',
  "text_result" text,
  "error_message" text,
  "started_at" timestamp,
  "completed_at" timestamp,
  FOREIGN KEY ("file_id") REFERENCES "files" ("file_id") ON DELETE CASCADE
);
