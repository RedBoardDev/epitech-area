DROP DATABASE IF EXISTS area;
CREATE DATABASE area;
USE area;

CREATE TABLE `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `lastname` VARCHAR(100) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100),
  `profile_img` VARCHAR(255) DEFAULT NULL,
  `auth_type` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `service_oauth` (
  `user_id` INT UNSIGNED NOT NULL,
  `service_id` VARCHAR(100) NOT NULL,
  `token` varchar(1024) NOT NULL,
  PRIMARY KEY (`user_id`, `service_id`)
);

CREATE TABLE `automation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT TRUE,
  `trigger_service_id` VARCHAR(100) NOT NULL,
  `trigger_id` INT UNSIGNED NOT NULL,
  `trigger_params` TEXT DEFAULT '{}',
  `trigger_check_data` TEXT DEFAULT '{}',
  `reaction_service_id` VARCHAR(100) NOT NULL,
  `reaction_id` INT UNSIGNED NOT NULL,
  `reaction_params` TEXT DEFAULT '{}',
  `automation_name` VARCHAR(100) NOT NULL
);

ALTER TABLE `automation` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `automation` ADD FOREIGN KEY (`user_id`, `trigger_service_id`) REFERENCES `service_oauth` (`user_id`, `service_id`);
ALTER TABLE `automation` ADD FOREIGN KEY (`user_id`, `reaction_service_id`) REFERENCES `service_oauth` (`user_id`, `service_id`);
ALTER TABLE `service_oauth` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
