-- create Authorities table
DROP TABLE `auth`;
CREATE TABLE `auth` (
        `username` VARCHAR(20)  NOT NULL,
        `password_` VARCHAR(20) NOT NULL,
        `full_name` VARCHAR(150) NOT NULL,
        PRIMARY KEY (`username`)
);

-- insert main authorities
INSERT INTO `auth` (
        `username`, 
        `password_`, 
        `full_name`
) VALUES (
        "admin", 
        "admin123", 
        "Admin Spider Web"
);

-- create Spider table
DROP TABLE `spider_list`;
CREATE TABLE `spider_list` (
        `spider_id` INT NOT NULL AUTO_INCREMENT,
        `family` VARCHAR(50) NOT NULL,
        `genus` VARCHAR(50) NOT NULL,
        `species` VARCHAR(50)NOT NULL,
        PRIMARY KEY (`spider_id`)
);

-- create Detail Record table 
DROP TABLE `detail_record`;
CREATE TABLE `detail_record` (
        `record_id` INT NOT NULL AUTO_INCREMENT,
        `spider_id` INT NOT NULL,
        `author` VARCHAR(150) NOT NULL,
        `public_year` INT NOT NULL, 
        `country` VARCHAR(20) DEFAULT "Thailand",
        `country_other` VARCHAR(20),
        `altitude` VARCHAR(50),
        `methor` VARCHAR(255),
        `habtat` VARCHAR(255),
        `microhabtat` VARCHAR(255),
        `designate` VARCHAR(255),
        PRIMARY KEY (`record_id`)
);

-- create Location table
DROP TABLE `location_`;
CREATE TABLE `location_` (
        `location_id` INT NOT NULL AUTO_INCREMENT, 
        `record_id` INT NOT NULL,
        `province` VARCHAR(30),
        `district` VARCHAR(30),
        `locality` VARCHAR(255),
        PRIMARY KEY (`location_id`)
);

-- create Position table
DROP TABLE `position_`;
CREATE TABLE `position_` (
        `position_id` INT NOT NULL AUTO_INCREMENT, 
        `location_id` INT NOT NULL,
        `position_name` VARCHAR(255) NOT NULL, 
        `lat_` DECIMAL(8,6) NOT NULL, 
        `long_` DECIMAL(9,6) NOT NULL,
        PRIMARY KEY (`position_id`)
);

-- create image table 
DROP TABLE `image_`;
CREATE TABLE `image_` (
        `image_id` INT NOT NULL AUTO_INCREMENT, 
        `record_id` INT NOT NULL, 
        `image_url` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`image_id`)
);

-- create paper table
DROP TABLE `paper_`;
CREATE TABLE `paper_` (
        `paper_id` INT NOT NULL AUTO_INCREMENT,
        `record_id` INT NOT NULL,
        `paper_name` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`paper_id`)
);



-- add foreign key 

ALTER TABLE `detail_record` ADD FOREIGN KEY (`spider_id`) REFERENCES `spider_list`(`spider_id`);

ALTER TABLE `location_` ADD FOREIGN KEY (`record_id`) REFERENCES `detail_record`(`record_id`);

ALTER TABLE `image_` ADD FOREIGN KEY (`record_id`) REFERENCES `detail_record`(`record_id`);

ALTER TABLE `paper_` ADD FOREIGN KEY (`record_id`) REFERENCES `detail_record`(`record_id`);

ALTER TABLE `position_` ADD FOREIGN KEY (`location_id`) REFERENCES `location_`(`location_id`);


-- demo data 
-- 1
INSERT INTO `spider_list` (`family`, `genus`, `species`) VALUES (
        "Agelenidae",
        "Draconarius",
        "abbreviatus"
);

INSERT INTO `detail_record` (
        `spider_id`,
        `author`,
        `public_year`,
        `country_other`,
        `altitude`,
        `methor`,
        `habtat`,
        `microhabtat`,
        `designate`
) VALUES (
        1,
        "Dankittipakul & Wang",
        2003,
        NULL,
        "1000, 1750 m",
        "pitfall trap, litter sample",
        "pine forest, evergreen hill forest",
        NULL,
        "Short retrolateral apophysis"
);

INSERT INTO `location_` (
        `record_id`,
        `province`,
        `district`,
        `locality`
) VALUES (
        1,
        "Chiang Mai",
        "Chomthong",
        "Doi Inthanon National Park"
);

INSERT INTO `position_` (
        `location_id`,
        `position_name`, 
        `lat_`, 
        `long_`
) VALUES (
        1,
        "Doi Inthaonon",
        18.5880,
        98.4871
);

-- 2
INSERT INTO `spider_list` (`family`, `genus`, `species`) VALUES (
        "Agelenidae",
        "Draconarius",
        "anthonyi"
);

INSERT INTO `detail_record` (
        `spider_id`,
        `author`,
        `public_year`,
        `country_other`,
        `altitude`,
        `methor`,
        `habtat`,
        `microhabtat`,
        `designate`
) VALUES (
        2,
        "Dankittipakul & Wang",
        2003,
        NULL,
        "1500, 1500-1600, 1610, 1680 m",
        "not mentioned",
        "evergreen hill forest",
        "road bank, funnel in crevice of trees",
        "patronym dedicated to Anthony Osa, Auckland New Zealand"
);


INSERT INTO `location_` (
        `record_id`,
        `province`,
        `district`,
        `locality`
) VALUES (
        2,
        "Chiang Mai",
        "Muang",
        "Doi Suthep-Pui National Park"
);

INSERT INTO `position_` (
        `location_id`,
        `position_name`, 
        `lat_`, 
        `long_`
) VALUES (
        2,
        "Doi Pui",
        18.8067,
        98.9164
);


-- Dummy database
CREATE TABLE `dummy` (
         `id` INT NOT NULL AUTO_INCREMENT,
         `fname` VARCHAR(20) NOT NULL,
         `lname` VARCHAR(20) NOT NULL,
         `age` INT NOT NULL,
         PRIMARY KEY (`id`)
 )



