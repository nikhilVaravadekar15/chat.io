ALTER TABLE `rooms` RENAME COLUMN `roomname` TO `name`;--> statement-breakpoint
ALTER TABLE `rooms` RENAME COLUMN `password` TO `code`;--> statement-breakpoint
ALTER TABLE rooms ADD `rounds` integer DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE rooms ADD `timer` integer DEFAULT 30 NOT NULL;--> statement-breakpoint
ALTER TABLE rooms ADD `words` text;