SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';


DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE `ingredient` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `name` int(11) NOT NULL,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `recipe`;
CREATE TABLE `recipe` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `name` int(11) NOT NULL,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `meal`;
CREATE TABLE `meal` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `name` int(11) NOT NULL,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `recipe_ingredient`;
CREATE TABLE `recipe_ingredient` (
                                     `ingredient_id` int(11) NOT NULL,
                                     `recipe_id` int(11) NOT NULL,
                                     `quantity` int(11) NOT NULL,
                                     `unity` varchar(255) NOT NULL,
                                     PRIMARY KEY (`ingredient_id`, `recipe_id`),
                                     KEY `ingredient_id_key` (`ingredient_id`),
                                     CONSTRAINT `ingredient_id_key` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`),
                                     KEY `recipe_id_key` (`recipe_id`),
                                     CONSTRAINT `recipe_id_key2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `meal_recipe`;
CREATE TABLE `meal_recipe` (
                               `meal_id` int(11) NOT NULL,
                               `recipe_id` int(11) NOT NULL,
                               PRIMARY KEY (`meal_id`, `recipe_id`),
                               KEY `meal_id_key` (`meal_id`),
                               CONSTRAINT `meal_id_key` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`),
                               KEY `recipe_id_key` (`recipe_id`),
                               CONSTRAINT `recipe_id_key` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
