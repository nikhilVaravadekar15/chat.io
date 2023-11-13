CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`roomname` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_id_unique` ON `rooms` (`id`);