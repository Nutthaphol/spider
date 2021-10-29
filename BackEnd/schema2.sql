DROP DATABASE `spiderDB_`;
CREATE DATABASE `spiderDB_`;
USE `spiderDB_`;

-- create table auth
DROP TABLE `user`;
CREATE TABLE `user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `username` VARCHAR(20)  NOT NULL,
        `password` VARCHAR(20) NOT NULL,
        `full_name` VARCHAR(150) NOT NULL,
        `auth` VARCHAR(20) DEFAULT "user",
        PRIMARY KEY (`id`)
);

-- insert admin id
INSERT INTO `user` (
        `username`, 
        `password`, 
        `full_name`,
        `auth`
) VALUES (
        "admin", 
        "admin123", 
        "Admin Spider Web",
        "admin"
);


-- create table type of spider
DROP TABLE `family`;
CREATE TABLE `family` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(20) NOT NULL,
        PRIMARY KEY (`id`)
);

DROP TABLE `genus`;
CREATE TABLE `genus` (
         `id` INT NOT NULL AUTO_INCREMENT,
         `family_id` INT NOT NULL,
         `name` VARCHAR(20) NOT NULL,
         PRIMARY KEY(`id`)
);

 DROP TABLE `species`;
 CREATE TABLE `species` (
         `id` INT NOT NULL AUTO_INCREMENT,
         `genus_id` INT NOT NULL,
         `name` VARCHAR(20) NOT NULL,
         PRIMARY KEY (`id`)
 );

 ALTER TABLE `genus` ADD FOREIGN KEY (`family_id`) REFERENCES `family`(`id`);
 ALTER TABLE `species` ADD FOREIGN KEY (`genus_id`) REFERENCES `genus`(`id`);

--  create table detail
DROP TABLE `detail`;
CREATE TABLE `detail` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `family_id` INT NOT NULL,
        `genus_id` INT NOT NULL,
        `species_id` INT NOT NULL,
        `author` VARCHAR(100) NOT NULL,
        `publish_year` VARCHAR(4) NOT NULL,
        `country` VARCHAR(20) DEFAULT "Thailand",
        `country_other` VARCHAR(20),
        `altitude` VARCHAR(50),
        `method` VARCHAR(255),
        `habtat` VARCHAR(255),
        `microhabtat` VARCHAR(255),
        `designate` VARCHAR(255),
        PRIMARY KEY(`id`)
);

-- create table location and position
DROP TABLE `location`;
CREATE TABLE `location` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `detail_id` INT NOT NULL,
        `province` VARCHAR(30),
        `district` VARCHAR(30),
        `locality` VARCHAR(255),
        PRIMARY KEY (`id`)
);


-- create Position table
DROP TABLE `position`;
CREATE TABLE `position` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `location_id` INT NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `lat` DECIMAL(8,6) NOT NULL,
        `long` DECIMAL(9,6) NOT NULL,
        PRIMARY KEY (`id`)
);

-- create table image
DROP TABLE `image`;
CREATE TABLE `image` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `detail_id` INT NOT NULL,
        `path` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
);

DROP TABLE `paper`;
CREATE TABLE `paper` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `detail_id` INT NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
);




-- Add foreign key
ALTER TABLE `detail` ADD FOREIGN KEY (`family`) REFERENCES `family`(`id`);
ALTER TABLE `detail` ADD FOREIGN KEY (`genus_id`) REFERENCES `genus`(`id`);
ALTER TABLE `detail` ADD FOREIGN KEY (`species_id`) REFERENCES `species`(`id`);
ALTER TABLE `location` ADD FOREIGN KEY (`location_id`) REFERENCES `detail`(`id`);
ALTER TABLE `position` ADD FOREIGN KEY (`position_id`) REFERENCES `location`(`id`);
ALTER TABLE `image` ADD FOREIGN KEY (`detail_id`) REFERENCES `detail`(`id`);
ALTER TABLE `paper` ADD FOREIGN KEY (`detail_id`) REFERENCES `detail`(`id`);


-- INSER DATA ----------
INSERT INTO `family` (`name`) VALUES ("Agelenidae");

INSERT INTO `genus` (`family_id`, `name`) VALUES (1, "Draconarius");
INSERT INTO `genus` (`family_id`, `name`) VALUES (1, "Sinocoelotes");
INSERT INTO `genus` (`family_id`, `name`) VALUES (1, "Coelotes");
INSERT INTO `genus` (`family_id`, `name`) VALUES (1, "Notiocoelotes");
INSERT INTO `genus` (`family_id`, `name`) VALUES (1, "Orumcekia");
INSERT INTO `genus` (`family_id`, `name`) VALUES (1, "Allagelena");
INSERT INTO `genus` (`family_id`, `name`) VALUES (1, "Acutipetala");

ALTER TABLE `species`DROP FOREIGN KEY `species_ibfk_1`;





INSERT INTO `family` (`fa_name`) VALUES ("	Actinopodidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Agelenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Stiphidiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Cycloctenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Amaurobiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Titanoecidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Desidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Zoropsidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Toxopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Ammoxenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Anapidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Antrodiaetidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Anyphaenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Araneidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Theridiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Arkyidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Linyphiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Archaeidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Atypidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Austrochilidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Barychelidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Theraphosidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Pycnothelidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Caponiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Cithaeronidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Clubionidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Cheiracanthiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Phrurolithidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Corinnidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Trachelidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Liocranidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Miturgidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Ctenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Trechaleidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Xenoctenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Viridasiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Halonoproctidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Ctenizidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Stasimopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Cyatholipidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Dictynidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Cybaeidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Cyrtaucheniidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Microstigmatidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Nemesiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Bemmeridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Deinopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Hahniidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Diguetidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Euagridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Ischnothelidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Dipluridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Microhexuridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Anamidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Drymusidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Dysderidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Eresidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Euctenizidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Filistatidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Gallieniellidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Gnaphosidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Trochanteriidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Gradungulidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Hersiliidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Atracidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Hexathelidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Macrothelidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Porrhothelidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Zodariidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Homalonychidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Huttoniidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Hypochilidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Idiopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Migidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Lamponidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Leptonetidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Archoleptonetidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Liphistiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Lycosidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Pisauridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Malkaridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Hexurellidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Mecicobothriidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Megahexuridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Mecysmaucheniidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Mimetidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Tetragnathidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Mysmenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Symphytognathidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Entypesidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Nesticidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Nicodamidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Megadictynidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Psilodercidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Ochyroceratidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Oecobiidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Oonopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Orsolobidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Oxyopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Palpimanidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Paratropididae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Penestomidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Periegopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Philodromidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Thomisidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Pholcidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Phyxelididae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Pimoidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Plectreuridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Psechridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Salticidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Scytodidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Segestriidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Selenopidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Senoculidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Sicariidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Sparassidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Stenochilidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Synaphridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Physoglenidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Synotaxidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Telemidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Udubidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Tetrablemmidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Pacullidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Theridiosomatidae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Trogloraptoridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Uloboridae	");
INSERT INTO `family` (`fa_name`) VALUES ("	Myrmecicultoridae	");