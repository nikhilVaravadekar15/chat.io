ALTER TABLE `rooms` RENAME COLUMN `roomname` TO `name`;--> statement-breakpoint
ALTER TABLE `rooms` RENAME COLUMN `password` TO `code`;--> statement-breakpoint
ALTER TABLE rooms ADD `words` text;