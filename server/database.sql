CREATE TABLE `entries`(
                          `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `table_id` BIGINT UNSIGNED NOT NULL,
                          `company` VARCHAR(32) NULL,
                          `title` VARCHAR(32) NULL,
                          `application_open` DATE NULL,
                          `application_close` DATE NULL,
                          `application_date` DATE NULL,
                          `status` VARCHAR(255) NULL,
                          `preference` VARCHAR(255) NULL,
                          `notes` TEXT NULL
);
ALTER TABLE
    `entries` ADD INDEX `entries_table_id_index`(`table_id`);
ALTER TABLE
    `entries` ADD INDEX `entries_company_index`(`company`);
ALTER TABLE
    `entries` ADD INDEX `entries_title_index`(`title`);
ALTER TABLE
    `entries` ADD INDEX `entries_preference_index`(`preference`);
ALTER TABLE
    `entries` ADD INDEX `entries_status_index`(`status`);
CREATE TABLE `tables`(
                         `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `user_id` BIGINT UNSIGNED NOT NULL,
                         `name` VARCHAR(32) NOT NULL DEFAULT 'unnamed table',
                         `color` VARCHAR(7) NOT NULL DEFAULT '#262626'
);
ALTER TABLE
    `tables` ADD INDEX `tables_user_id_index`(`user_id`);
CREATE TABLE `users`(
                        `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `email` VARCHAR(255) NOT NULL,
                        `password` VARCHAR(64) NOT NULL,
                        `date-created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    `users` ADD INDEX `users_email_index`(`email`);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
ALTER TABLE
    `tables` ADD CONSTRAINT `tables_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `entries` ADD CONSTRAINT `entries_table_id_foreign` FOREIGN KEY(`table_id`) REFERENCES `tables`(`id`);