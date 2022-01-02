-- MySQL dump 10.13  Distrib 8.0.27, for macos11.6 (arm64)
--
-- Host: localhost    Database: spiderDB
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,1,'Doi Inthaonon',18.58889676,98.48697532,1),(2,2,'Doi Pui',18.81665591,98.88327951,1),(3,3,'Doi Inthaonon',18.58889676,98.48697532,1),(4,3,'Kew Mae Pan',18.55602225,98.48219804,1),(5,4,'Doi Inthaonon',18.58889676,98.48697532,1),(6,5,'Doi Inthaonon',18.58889676,98.48697532,1),(7,6,'San Pakia',19.3147805,98.83234301,1),(8,7,'Doi Tung',20.32695563,99.83427269,1),(9,6,'Huay Mae Kok',19.38133517,98.83512952,1),(12,9,'Doi Lanka',19.00352009,99.40564138,1),(13,9,'Mae Toh waterfall',19.13784838,99.46261173,1),(14,10,'Pha Taeng at the foot of Doi Chiang Dao',19.41467045,98.9151012,1),(15,11,'Doi Suthep, San Ku',18.8163071,98.89456219,1),(16,12,'Khao Khieo',14.47653098,101.3901175,1);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail`
--

DROP TABLE IF EXISTS `detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family_id` int NOT NULL,
  `genus_id` int NOT NULL,
  `species_id` int NOT NULL,
  `author` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `publish_year` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Thailand',
  `country_other` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altitude` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `habitat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `microhabitat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `family_id` (`family_id`),
  KEY `genus_id` (`genus_id`),
  KEY `species_id` (`species_id`),
  CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `family` (`id`),
  CONSTRAINT `detail_ibfk_2` FOREIGN KEY (`genus_id`) REFERENCES `genus` (`id`),
  CONSTRAINT `detail_ibfk_3` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
INSERT INTO `detail` VALUES (1,1,1,1,'Dankittipakul & Wang','2003','Thailand','-','1000, 1750 m','pitfall trap, litter sample','pine forest, evergreen hill forest','n/a','Short retrolateral apophysis',1),(2,1,1,2,'Dankittipakul & Wang','2003','Thailand','-','1500, 1500-1600, 1610, 1680 m','n/a','evergreen hill forest','road bank, funnel in crevice of trees','patronym dedicated to Anthony Osa, Auckland New Zealand',1),(3,1,1,3,'Dankittipakul & Wang','2003','Thailand','-','2100, 2300, 2530 (1600 - 2560) m','pitfall trap, litter sample','evergreen hill forest','summit','type locality',1),(4,1,1,4,'Dankittipakul & Wang','2003','Thailand','-','2300, 2530, 2500, 2100 m','pitfall trap','moist evergreen hill forest','n/a','adjective siam, the former name of Thailand',1),(5,1,1,5,'Dankittipakul & Wang','2003','Thailand','-','2510 m','pitfall trap','moist evergreen hill forest','near summit','refer to the poited patella apophysis of the male ',1),(6,1,1,6,'Dankittipakul, Sonthichai & Wang','2006','Thailand','-','1380 m, 1500 m, 1350 m','n/a','evergreen hill forests','n/a','refer to the habitat of the spiders, monticola = mountain dweller; masculine noun in apposition',1),(8,1,2,7,'Dankittipakul & Wang','2003','Thailand','-','1200 m','n/a','evergreen hill forest','rotten log','type locality',1),(9,1,1,8,'Dankittipakul & Wang','2004','Thailand','-','500 m','pitfall trap','evergreen forest ','along stream','refer to the laterally extended spermathecae',1),(10,1,3,9,'Dankittipakul, Chami-Kranon & Wang','2005','Thailand','-','1600 m','flight intercept trap','evergreen hill forest','n/a','refer to type locality; Latinized adjective of Suthep is suthepicus',1),(11,1,4,10,'Dankittipakul, Chami-Kranon & Wang','2005','Thailand','-','1020 m','sifting leaf litter and humus','along the road to the military radar station; a lower montane rain forest just above the semi-evergreen forest below','n/a','refer to the shape of the conductor; Latin: spatus = a spear with a corved blade',1);
/*!40000 ALTER TABLE `detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts_list`
--

DROP TABLE IF EXISTS `districts_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts_list` (
  `id` int NOT NULL,
  `code` varchar(4) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name_th` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name_en` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `province_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1007 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts_list`
--

LOCK TABLES `districts_list` WRITE;
/*!40000 ALTER TABLE `districts_list` DISABLE KEYS */;
INSERT INTO `districts_list` VALUES (1,'1001','เขตพระนคร','Khet Phra Nakhon',1),(2,'1002','เขตดุสิต','Khet Dusit',1),(3,'1003','เขตหนองจอก','Khet Nong Chok',1),(4,'1004','เขตบางรัก','Khet Bang Rak',1),(5,'1005','เขตบางเขน','Khet Bang Khen',1),(6,'1006','เขตบางกะปิ','Khet Bang Kapi',1),(7,'1007','เขตปทุมวัน','Khet Pathum Wan',1),(8,'1008','เขตป้อมปราบศัตรูพ่าย','Khet Pom Prap Sattru Phai',1),(9,'1009','เขตพระโขนง','Khet Phra Khanong',1),(10,'1010','เขตมีนบุรี','Khet Min Buri',1),(11,'1011','เขตลาดกระบัง','Khet Lat Krabang',1),(12,'1012','เขตยานนาวา','Khet Yan Nawa',1),(13,'1013','เขตสัมพันธวงศ์','Khet Samphanthawong',1),(14,'1014','เขตพญาไท','Khet Phaya Thai',1),(15,'1015','เขตธนบุรี','Khet Thon Buri',1),(16,'1016','เขตบางกอกใหญ่','Khet Bangkok Yai',1),(17,'1017','เขตห้วยขวาง','Khet Huai Khwang',1),(18,'1018','เขตคลองสาน','Khet Khlong San',1),(19,'1019','เขตตลิ่งชัน','Khet Taling Chan',1),(20,'1020','เขตบางกอกน้อย','Khet Bangkok Noi',1),(21,'1021','เขตบางขุนเทียน','Khet Bang Khun Thian',1),(22,'1022','เขตภาษีเจริญ','Khet Phasi Charoen',1),(23,'1023','เขตหนองแขม','Khet Nong Khaem',1),(24,'1024','เขตราษฎร์บูรณะ','Khet Rat Burana',1),(25,'1025','เขตบางพลัด','Khet Bang Phlat',1),(26,'1026','เขตดินแดง','Khet Din Daeng',1),(27,'1027','เขตบึงกุ่ม','Khet Bueng Kum',1),(28,'1028','เขตสาทร','Khet Sathon',1),(29,'1029','เขตบางซื่อ','Khet Bang Sue',1),(30,'1030','เขตจตุจักร','Khet Chatuchak',1),(31,'1031','เขตบางคอแหลม','Khet Bang Kho Laem',1),(32,'1032','เขตประเวศ','Khet Prawet',1),(33,'1033','เขตคลองเตย','Khet Khlong Toei',1),(34,'1034','เขตสวนหลวง','Khet Suan Luang',1),(35,'1035','เขตจอมทอง','Khet Chom Thong',1),(36,'1036','เขตดอนเมือง','Khet Don Mueang',1),(37,'1037','เขตราชเทวี','Khet Ratchathewi',1),(38,'1038','เขตลาดพร้าว','Khet Lat Phrao',1),(39,'1039','เขตวัฒนา','Khet Watthana',1),(40,'1040','เขตบางแค','Khet Bang Khae',1),(41,'1041','เขตหลักสี่','Khet Lak Si',1),(42,'1042','เขตสายไหม','Khet Sai Mai',1),(43,'1043','เขตคันนายาว','Khet Khan Na Yao',1),(44,'1044','เขตสะพานสูง','Khet Saphan Sung',1),(45,'1045','เขตวังทองหลาง','Khet Wang Thonglang',1),(46,'1046','เขตคลองสามวา','Khet Khlong Sam Wa',1),(47,'1047','เขตบางนา','Khet Bang Na',1),(48,'1048','เขตทวีวัฒนา','Khet Thawi Watthana',1),(49,'1049','เขตทุ่งครุ','Khet Thung Khru',1),(50,'1050','เขตบางบอน','Khet Bang Bon',1),(51,'1081','*บ้านทะวาย','*Bantawai',1),(52,'1101','เมืองสมุทรปราการ','Mueang Samut Prakan',2),(53,'1102','บางบ่อ','Bang Bo',2),(54,'1103','บางพลี','Bang Phli',2),(55,'1104','พระประแดง','Phra Pradaeng',2),(56,'1105','พระสมุทรเจดีย์','Phra Samut Chedi',2),(57,'1106','บางเสาธง','Bang Sao Thong',2),(58,'1201','เมืองนนทบุรี','Mueang Nonthaburi',3),(59,'1202','บางกรวย','Bang Kruai',3),(60,'1203','บางใหญ่','Bang Yai',3),(61,'1204','บางบัวทอง','Bang Bua Thong',3),(62,'1205','ไทรน้อย','Sai Noi',3),(63,'1206','ปากเกร็ด','Pak Kret',3),(64,'1251','เทศบาลนครนนทบุรี (สาขาแขวงท่าทราย)*','Tetsaban Nonthaburi',3),(65,'1297','เทศบาลเมืองปากเกร็ด*','Tetsaban Pak Kret',3),(66,'1301','เมืองปทุมธานี','Mueang Pathum Thani',4),(67,'1302','คลองหลวง','Khlong Luang',4),(68,'1303','ธัญบุรี','Thanyaburi',4),(69,'1304','หนองเสือ','Nong Suea',4),(70,'1305','ลาดหลุมแก้ว','Lat Lum Kaeo',4),(71,'1306','ลำลูกกา','Lam Luk Ka',4),(72,'1307','สามโคก','Sam Khok',4),(73,'1351','ลำลูกกา (สาขาตำบลคูคต)*','Khlong Luang(Kukod)',4),(74,'1401','พระนครศรีอยุธยา','Phra Nakhon Si Ayutthaya',5),(75,'1402','ท่าเรือ','Tha Ruea',5),(76,'1403','นครหลวง','Nakhon Luang',5),(77,'1404','บางไทร','Bang Sai',5),(78,'1405','บางบาล','Bang Ban',5),(79,'1406','บางปะอิน','Bang Pa-in',5),(80,'1407','บางปะหัน','Bang Pahan',5),(81,'1408','ผักไห่','Phak Hai',5),(82,'1409','ภาชี','Phachi',5),(83,'1410','ลาดบัวหลวง','Lat Bua Luang',5),(84,'1411','วังน้อย','Wang Noi',5),(85,'1412','เสนา','Sena',5),(86,'1413','บางซ้าย','Bang Sai',5),(87,'1414','อุทัย','Uthai',5),(88,'1415','มหาราช','Maha Rat',5),(89,'1416','บ้านแพรก','Ban Phraek',5),(90,'1501','เมืองอ่างทอง','Mueang Ang Thong',6),(91,'1502','ไชโย','Chaiyo',6),(92,'1503','ป่าโมก','Pa Mok',6),(93,'1504','โพธิ์ทอง','Pho Thong',6),(94,'1505','แสวงหา','Sawaeng Ha',6),(95,'1506','วิเศษชัยชาญ','Wiset Chai Chan',6),(96,'1507','สามโก้','Samko',6),(97,'1601','เมืองลพบุรี','Mueang Lop Buri',7),(98,'1602','พัฒนานิคม','Phatthana Nikhom',7),(99,'1603','โคกสำโรง','Khok Samrong',7),(100,'1604','ชัยบาดาล','Chai Badan',7),(101,'1605','ท่าวุ้ง','Tha Wung',7),(102,'1606','บ้านหมี่','Ban Mi',7),(103,'1607','ท่าหลวง','Tha Luang',7),(104,'1608','สระโบสถ์','Sa Bot',7),(105,'1609','โคกเจริญ','Khok Charoen',7),(106,'1610','ลำสนธิ','Lam Sonthi',7),(107,'1611','หนองม่วง','Nong Muang',7),(108,'1681','*อ.บ้านเช่า  จ.ลพบุรี','*Amphoe Ban Chao',7),(109,'1701','เมืองสิงห์บุรี','Mueang Sing Buri',8),(110,'1702','บางระจัน','Bang Rachan',8),(111,'1703','ค่ายบางระจัน','Khai Bang Rachan',8),(112,'1704','พรหมบุรี','Phrom Buri',8),(113,'1705','ท่าช้าง','Tha Chang',8),(114,'1706','อินทร์บุรี','In Buri',8),(115,'1801','เมืองชัยนาท','Mueang Chai Nat',9),(116,'1802','มโนรมย์','Manorom',9),(117,'1803','วัดสิงห์','Wat Sing',9),(118,'1804','สรรพยา','Sapphaya',9),(119,'1805','สรรคบุรี','Sankhaburi',9),(120,'1806','หันคา','Hankha',9),(121,'1807','หนองมะโมง','Nong Mamong',9),(122,'1808','เนินขาม','Noen Kham',9),(123,'1901','เมืองสระบุรี','Mueang Saraburi',10),(124,'1902','แก่งคอย','Kaeng Khoi',10),(125,'1903','หนองแค','Nong Khae',10),(126,'1904','วิหารแดง','Wihan Daeng',10),(127,'1905','หนองแซง','Nong Saeng',10),(128,'1906','บ้านหมอ','Ban Mo',10),(129,'1907','ดอนพุด','Don Phut',10),(130,'1908','หนองโดน','Nong Don',10),(131,'1909','พระพุทธบาท','Phra Phutthabat',10),(132,'1910','เสาไห้','Sao Hai',10),(133,'1911','มวกเหล็ก','Muak Lek',10),(134,'1912','วังม่วง','Wang Muang',10),(135,'1913','เฉลิมพระเกียรติ','Chaloem Phra Kiat',10),(136,'2001','เมืองชลบุรี','Mueang Chon Buri',11),(137,'2002','บ้านบึง','Ban Bueng',11),(138,'2003','หนองใหญ่','Nong Yai',11),(139,'2004','บางละมุง','Bang Lamung',11),(140,'2005','พานทอง','Phan Thong',11),(141,'2006','พนัสนิคม','Phanat Nikhom',11),(142,'2007','ศรีราชา','Si Racha',11),(143,'2008','เกาะสีชัง','Ko Sichang',11),(144,'2009','สัตหีบ','Sattahip',11),(145,'2010','บ่อทอง','Bo Thong',11),(146,'2011','เกาะจันทร์','Ko Chan',11),(147,'2051','สัตหีบ (สาขาตำบลบางเสร่)*','Sattahip(Bang Sre)*',11),(148,'2072','ท้องถิ่นเทศบาลเมืองหนองปรือ*','Tong Tin Tetsaban Mueang Nong Prue*',11),(149,'2093','เทศบาลตำบลแหลมฉบัง*','Tetsaban Tambon Lamsabang*',11),(150,'2099','เทศบาลเมืองชลบุรี*','Mueang Chon Buri',11),(151,'2101','เมืองระยอง','Mueang Rayong',12),(152,'2102','บ้านฉาง','Ban Chang',12),(153,'2103','แกลง','Klaeng',12),(154,'2104','วังจันทร์','Wang Chan',12),(155,'2105','บ้านค่าย','Ban Khai',12),(156,'2106','ปลวกแดง','Pluak Daeng',12),(157,'2107','เขาชะเมา','Khao Chamao',12),(158,'2108','นิคมพัฒนา','Nikhom Phatthana',12),(159,'2151','สาขาตำบลมาบข่า*','Saka Tambon Mabka',12),(160,'2201','เมืองจันทบุรี','Mueang Chanthaburi',13),(161,'2202','ขลุง','Khlung',13),(162,'2203','ท่าใหม่','Tha Mai',13),(163,'2204','โป่งน้ำร้อน','Pong Nam Ron',13),(164,'2205','มะขาม','Makham',13),(165,'2206','แหลมสิงห์','Laem Sing',13),(166,'2207','สอยดาว','Soi Dao',13),(167,'2208','แก่งหางแมว','Kaeng Hang Maeo',13),(168,'2209','นายายอาม','Na Yai Am',13),(169,'2210','เขาคิชฌกูฏ','Khoa Khitchakut',13),(170,'2281','*กิ่ง อ.กำพุธ  จ.จันทบุรี','*King Amphoe Kampud',13),(171,'2301','เมืองตราด','Mueang Trat',14),(172,'2302','คลองใหญ่','Khlong Yai',14),(173,'2303','เขาสมิง','Khao Saming',14),(174,'2304','บ่อไร่','Bo Rai',14),(175,'2305','แหลมงอบ','Laem Ngop',14),(176,'2306','เกาะกูด','Ko Kut',14),(177,'2307','เกาะช้าง','Ko Chang',14),(178,'2401','เมืองฉะเชิงเทรา','Mueang Chachoengsao',15),(179,'2402','บางคล้า','Bang Khla',15),(180,'2403','บางน้ำเปรี้ยว','Bang Nam Priao',15),(181,'2404','บางปะกง','Bang Pakong',15),(182,'2405','บ้านโพธิ์','Ban Pho',15),(183,'2406','พนมสารคาม','Phanom Sarakham',15),(184,'2407','ราชสาส์น','Ratchasan',15),(185,'2408','สนามชัยเขต','Sanam Chai Khet',15),(186,'2409','แปลงยาว','Plaeng Yao',15),(187,'2410','ท่าตะเกียบ','Tha Takiap',15),(188,'2411','คลองเขื่อน','Khlong Khuean',15),(189,'2501','เมืองปราจีนบุรี','Mueang Prachin Buri',16),(190,'2502','กบินทร์บุรี','Kabin Buri',16),(191,'2503','นาดี','Na Di',16),(192,'2504','*สระแก้ว','Sa Kaeo',16),(193,'2505','*วังน้ำเย็น','Wang Nam Yen',16),(194,'2506','บ้านสร้าง','Ban Sang',16),(195,'2507','ประจันตคาม','Prachantakham',16),(196,'2508','ศรีมหาโพธิ','Si Maha Phot',16),(197,'2509','ศรีมโหสถ','Si Mahosot',16),(198,'2510','*อรัญประเทศ','Aranyaprathet',16),(199,'2511','*ตาพระยา','Ta Phraya',16),(200,'2512','*วัฒนานคร','Watthana Nakhon',16),(201,'2513','*คลองหาด','Khlong Hat',16),(202,'2601','เมืองนครนายก','Mueang Nakhon Nayok',17),(203,'2602','ปากพลี','Pak Phli',17),(204,'2603','บ้านนา','Ban Na',17),(205,'2604','องครักษ์','Ongkharak',17),(206,'2701','เมืองสระแก้ว','Mueang Sa Kaeo',18),(207,'2702','คลองหาด','Khlong Hat',18),(208,'2703','ตาพระยา','Ta Phraya',18),(209,'2704','วังน้ำเย็น','Wang Nam Yen',18),(210,'2705','วัฒนานคร','Watthana Nakhon',18),(211,'2706','อรัญประเทศ','Aranyaprathet',18),(212,'2707','เขาฉกรรจ์','Khao Chakan',18),(213,'2708','โคกสูง','Khok Sung',18),(214,'2709','วังสมบูรณ์','Wang Sombun',18),(215,'3001','เมืองนครราชสีมา','Mueang Nakhon Ratchasima',19),(216,'3002','ครบุรี','Khon Buri',19),(217,'3003','เสิงสาง','Soeng Sang',19),(218,'3004','คง','Khong',19),(219,'3005','บ้านเหลื่อม','Ban Lueam',19),(220,'3006','จักราช','Chakkarat',19),(221,'3007','โชคชัย','Chok Chai',19),(222,'3008','ด่านขุนทด','Dan Khun Thot',19),(223,'3009','โนนไทย','Non Thai',19),(224,'3010','โนนสูง','Non Sung',19),(225,'3011','ขามสะแกแสง','Kham Sakaesaeng',19),(226,'3012','บัวใหญ่','Bua Yai',19),(227,'3013','ประทาย','Prathai',19),(228,'3014','ปักธงชัย','Pak Thong Chai',19),(229,'3015','พิมาย','Phimai',19),(230,'3016','ห้วยแถลง','Huai Thalaeng',19),(231,'3017','ชุมพวง','Chum Phuang',19),(232,'3018','สูงเนิน','Sung Noen',19),(233,'3019','ขามทะเลสอ','Kham Thale So',19),(234,'3020','สีคิ้ว','Sikhio',19),(235,'3021','ปากช่อง','Pak Chong',19),(236,'3022','หนองบุญมาก','Nong Bunnak',19),(237,'3023','แก้งสนามนาง','Kaeng Sanam Nang',19),(238,'3024','โนนแดง','Non Daeng',19),(239,'3025','วังน้ำเขียว','Wang Nam Khiao',19),(240,'3026','เทพารักษ์','Thepharak',19),(241,'3027','เมืองยาง','Mueang Yang',19),(242,'3028','พระทองคำ','Phra Thong Kham',19),(243,'3029','ลำทะเมนชัย','Lam Thamenchai',19),(244,'3030','บัวลาย','Bua Lai',19),(245,'3031','สีดา','Sida',19),(246,'3032','เฉลิมพระเกียรติ','Chaloem Phra Kiat',19),(247,'3049','ท้องถิ่นเทศบาลตำบลโพธิ์กลาง*','Pho Krang',19),(248,'3051','สาขาตำบลมะค่า-พลสงคราม*','Ma Ka-Pon Songkram*',19),(249,'3081','*โนนลาว','*Non Lao',19),(250,'3101','เมืองบุรีรัมย์','Mueang Buri Ram',20),(251,'3102','คูเมือง','Khu Mueang',20),(252,'3103','กระสัง','Krasang',20),(253,'3104','นางรอง','Nang Rong',20),(254,'3105','หนองกี่','Nong Ki',20),(255,'3106','ละหานทราย','Lahan Sai',20),(256,'3107','ประโคนชัย','Prakhon Chai',20),(257,'3108','บ้านกรวด','Ban Kruat',20),(258,'3109','พุทไธสง','Phutthaisong',20),(259,'3110','ลำปลายมาศ','Lam Plai Mat',20),(260,'3111','สตึก','Satuek',20),(261,'3112','ปะคำ','Pakham',20),(262,'3113','นาโพธิ์','Na Pho',20),(263,'3114','หนองหงส์','Nong Hong',20),(264,'3115','พลับพลาชัย','Phlapphla Chai',20),(265,'3116','ห้วยราช','Huai Rat',20),(266,'3117','โนนสุวรรณ','Non Suwan',20),(267,'3118','ชำนิ','Chamni',20),(268,'3119','บ้านใหม่ไชยพจน์','Ban Mai Chaiyaphot',20),(269,'3120','โนนดินแดง','Din Daeng',20),(270,'3121','บ้านด่าน','Ban Dan',20),(271,'3122','แคนดง','Khaen Dong',20),(272,'3123','เฉลิมพระเกียรติ','Chaloem Phra Kiat',20),(273,'3201','เมืองสุรินทร์','Mueang Surin',21),(274,'3202','ชุมพลบุรี','Chumphon Buri',21),(275,'3203','ท่าตูม','Tha Tum',21),(276,'3204','จอมพระ','Chom Phra',21),(277,'3205','ปราสาท','Prasat',21),(278,'3206','กาบเชิง','Kap Choeng',21),(279,'3207','รัตนบุรี','Rattanaburi',21),(280,'3208','สนม','Sanom',21),(281,'3209','ศีขรภูมิ','Sikhoraphum',21),(282,'3210','สังขะ','Sangkha',21),(283,'3211','ลำดวน','Lamduan',21),(284,'3212','สำโรงทาบ','Samrong Thap',21),(285,'3213','บัวเชด','Buachet',21),(286,'3214','พนมดงรัก','Phanom Dong Rak',21),(287,'3215','ศรีณรงค์','Si Narong',21),(288,'3216','เขวาสินรินทร์','Khwao Sinarin',21),(289,'3217','โนนนารายณ์','Non Narai',21),(290,'3301','เมืองศรีสะเกษ','Mueang Si Sa Ket',22),(291,'3302','ยางชุมน้อย','Yang Chum Noi',22),(292,'3303','กันทรารมย์','Kanthararom',22),(293,'3304','กันทรลักษ์','Kantharalak',22),(294,'3305','ขุขันธ์','Khukhan',22),(295,'3306','ไพรบึง','Phrai Bueng',22),(296,'3307','ปรางค์กู่','Prang Ku',22),(297,'3308','ขุนหาญ','Khun Han',22),(298,'3309','ราษีไศล','Rasi Salai',22),(299,'3310','อุทุมพรพิสัย','Uthumphon Phisai',22),(300,'3311','บึงบูรพ์','Bueng Bun',22),(301,'3312','ห้วยทับทัน','Huai Thap Than',22),(302,'3313','โนนคูณ','Non Khun',22),(303,'3314','ศรีรัตนะ','Si Rattana',22),(304,'3315','น้ำเกลี้ยง','Si Rattana',22),(305,'3316','วังหิน','Wang Hin',22),(306,'3317','ภูสิงห์','Phu Sing',22),(307,'3318','เมืองจันทร์','Mueang Chan',22),(308,'3319','เบญจลักษ์','Benchalak',22),(309,'3320','พยุห์','Phayu',22),(310,'3321','โพธิ์ศรีสุวรรณ','Pho Si Suwan',22),(311,'3322','ศิลาลาด','Sila Lat',22),(312,'3401','เมืองอุบลราชธานี','Mueang Ubon Ratchathani',23),(313,'3402','ศรีเมืองใหม่','Si Mueang Mai',23),(314,'3403','โขงเจียม','Khong Chiam',23),(315,'3404','เขื่องใน','Khueang Nai',23),(316,'3405','เขมราฐ','Khemarat',23),(317,'3406','*ชานุมาน','*Shanuman',23),(318,'3407','เดชอุดม','Det Udom',23),(319,'3408','นาจะหลวย','Na Chaluai',23),(320,'3409','น้ำยืน','Nam Yuen',23),(321,'3410','บุณฑริก','Buntharik',23),(322,'3411','ตระการพืชผล','Trakan Phuet Phon',23),(323,'3412','กุดข้าวปุ้น','Kut Khaopun',23),(324,'3413','*พนา','*Phana',23),(325,'3414','ม่วงสามสิบ','Muang Sam Sip',23),(326,'3415','วารินชำราบ','Warin Chamrap',23),(327,'3416','*อำนาจเจริญ','*Amnat Charoen',23),(328,'3417','*เสนางคนิคม','*Senangkhanikhom',23),(329,'3418','*หัวตะพาน','*Hua Taphan',23),(330,'3419','พิบูลมังสาหาร','Phibun Mangsahan',23),(331,'3420','ตาลสุม','Tan Sum',23),(332,'3421','โพธิ์ไทร','Pho Sai',23),(333,'3422','สำโรง','Samrong',23),(334,'3423','*กิ่งอำเภอลืออำนาจ','*King Amphoe Lue Amnat',23),(335,'3424','ดอนมดแดง','Don Mot Daeng',23),(336,'3425','สิรินธร','Sirindhorn',23),(337,'3426','ทุ่งศรีอุดม','Thung Si Udom',23),(338,'3427','*ปทุมราชวงศา','*Pathum Ratchawongsa',23),(339,'3428','*กิ่งอำเภอศรีหลักชัย','*King Amphoe Sri Lunk Chai',23),(340,'3429','นาเยีย','Na Yia',23),(341,'3430','นาตาล','Na Tan',23),(342,'3431','เหล่าเสือโก้ก','Lao Suea Kok',23),(343,'3432','สว่างวีระวงศ์','Sawang Wirawong',23),(344,'3433','น้ำขุ่น','Nam Khun',23),(345,'3481','*อ.สุวรรณวารี  จ.อุบลราชธานี','*Suwan Wari',23),(346,'3501','เมืองยโสธร','Mueang Yasothon',24),(347,'3502','ทรายมูล','Sai Mun',24),(348,'3503','กุดชุม','Kut Chum',24),(349,'3504','คำเขื่อนแก้ว','Kham Khuean Kaeo',24),(350,'3505','ป่าติ้ว','Pa Tio',24),(351,'3506','มหาชนะชัย','Maha Chana Chai',24),(352,'3507','ค้อวัง','Kho Wang',24),(353,'3508','เลิงนกทา','Loeng Nok Tha',24),(354,'3509','ไทยเจริญ','Thai Charoen',24),(355,'3601','เมืองชัยภูมิ','Mueang Chaiyaphum',25),(356,'3602','บ้านเขว้า','Ban Khwao',25),(357,'3603','คอนสวรรค์','Khon Sawan',25),(358,'3604','เกษตรสมบูรณ์','Kaset Sombun',25),(359,'3605','หนองบัวแดง','Nong Bua Daeng',25),(360,'3606','จัตุรัส','Chatturat',25),(361,'3607','บำเหน็จณรงค์','Bamnet Narong',25),(362,'3608','หนองบัวระเหว','Nong Bua Rawe',25),(363,'3609','เทพสถิต','Thep Sathit',25),(364,'3610','ภูเขียว','Phu Khiao',25),(365,'3611','บ้านแท่น','Ban Thaen',25),(366,'3612','แก้งคร้อ','Kaeng Khro',25),(367,'3613','คอนสาร','Khon San',25),(368,'3614','ภักดีชุมพล','Phakdi Chumphon',25),(369,'3615','เนินสง่า','Noen Sa-nga',25),(370,'3616','ซับใหญ่','Sap Yai',25),(371,'3651','เมืองชัยภูมิ (สาขาตำบลโนนสำราญ)*','Mueang Chaiyaphum(Non Sumran)*',25),(372,'3652','สาขาตำบลบ้านหว่าเฒ่า*','Ban Wha Tao*',25),(373,'3653','หนองบัวแดง (สาขาตำบลวังชมภู)*','Nong Bua Daeng',25),(374,'3654','กิ่งอำเภอซับใหญ่ (สาขาตำบลซับใหญ่)*','King Amphoe Sap Yai*',25),(375,'3655','สาขาตำบลโคกเพชร*','Coke Phet*',25),(376,'3656','เทพสถิต (สาขาตำบลนายางกลัก)*','Thep Sathit*',25),(377,'3657','บ้านแท่น (สาขาตำบลบ้านเต่า)*','Ban Thaen',25),(378,'3658','แก้งคร้อ (สาขาตำบลท่ามะไฟหวาน)*','Kaeng Khro*',25),(379,'3659','คอนสาร (สาขาตำบลโนนคูณ)*','Khon San*',25),(380,'3701','เมืองอำนาจเจริญ','Mueang Amnat Charoen',26),(381,'3702','ชานุมาน','Chanuman',26),(382,'3703','ปทุมราชวงศา','Pathum Ratchawongsa',26),(383,'3704','พนา','Phana',26),(384,'3705','เสนางคนิคม','Senangkhanikhom',26),(385,'3706','หัวตะพาน','Hua Taphan',26),(386,'3707','ลืออำนาจ','Lue Amnat',26),(387,'3901','เมืองหนองบัวลำภู','Mueang Nong Bua Lam Phu',27),(388,'3902','นากลาง','Na Klang',27),(389,'3903','โนนสัง','Non Sang',27),(390,'3904','ศรีบุญเรือง','Si Bun Rueang',27),(391,'3905','สุวรรณคูหา','Suwannakhuha',27),(392,'3906','นาวัง','Na Wang',27),(393,'4001','เมืองขอนแก่น','Mueang Khon Kaen',28),(394,'4002','บ้านฝาง','Ban Fang',28),(395,'4003','พระยืน','Phra Yuen',28),(396,'4004','หนองเรือ','Nong Ruea',28),(397,'4005','ชุมแพ','Chum Phae',28),(398,'4006','สีชมพู','Si Chomphu',28),(399,'4007','น้ำพอง','Nam Phong',28),(400,'4008','อุบลรัตน์','Ubolratana',28),(401,'4009','กระนวน','Kranuan',28),(402,'4010','บ้านไผ่','Ban Phai',28),(403,'4011','เปือยน้อย','Pueai Noi',28),(404,'4012','พล','Phon',28),(405,'4013','แวงใหญ่','Waeng Yai',28),(406,'4014','แวงน้อย','Waeng Noi',28),(407,'4015','หนองสองห้อง','Nong Song Hong',28),(408,'4016','ภูเวียง','Phu Wiang',28),(409,'4017','มัญจาคีรี','Mancha Khiri',28),(410,'4018','ชนบท','Chonnabot',28),(411,'4019','เขาสวนกวาง','Khao Suan Kwang',28),(412,'4020','ภูผาม่าน','Phu Pha Man',28),(413,'4021','ซำสูง','Sam Sung',28),(414,'4022','โคกโพธิ์ไชย','Khok Pho Chai',28),(415,'4023','หนองนาคำ','Nong Na Kham',28),(416,'4024','บ้านแฮด','Ban Haet',28),(417,'4025','โนนศิลา','Non Sila',28),(418,'4029','เวียงเก่า','Wiang Kao',28),(419,'4068','ท้องถิ่นเทศบาลตำบลบ้านเป็ด*','Ban Pet*',28),(420,'4098','เทศบาลตำบลเมืองพล*','Tet Saban Tambon Muang Phon*',28),(421,'4101','เมืองอุดรธานี','Mueang Udon Thani',29),(422,'4102','กุดจับ','Kut Chap',29),(423,'4103','หนองวัวซอ','Nong Wua So',29),(424,'4104','กุมภวาปี','Kumphawapi',29),(425,'4105','โนนสะอาด','Non Sa-at',29),(426,'4106','หนองหาน','Nong Han',29),(427,'4107','ทุ่งฝน','Thung Fon',29),(428,'4108','ไชยวาน','Chai Wan',29),(429,'4109','ศรีธาตุ','Si That',29),(430,'4110','วังสามหมอ','Wang Sam Mo',29),(431,'4111','บ้านดุง','Ban Dung',29),(432,'4112','*หนองบัวลำภู','*Nong Bua Lam Phu',29),(433,'4113','*ศรีบุญเรือง','*Si Bun Rueang',29),(434,'4114','*นากลาง','*Na Klang',29),(435,'4115','*สุวรรณคูหา','*Suwannakhuha',29),(436,'4116','*โนนสัง','*Non Sang',29),(437,'4117','บ้านผือ','Ban Phue',29),(438,'4118','น้ำโสม','Nam Som',29),(439,'4119','เพ็ญ','Phen',29),(440,'4120','สร้างคอม','Sang Khom',29),(441,'4121','หนองแสง','Nong Saeng',29),(442,'4122','นายูง','Na Yung',29),(443,'4123','พิบูลย์รักษ์','Phibun Rak',29),(444,'4124','กู่แก้ว','Ku Kaeo',29),(445,'4125','ประจักษ์ศิลปาคม','rachak-sinlapakhom',29),(446,'4201','เมืองเลย','Mueang Loei',30),(447,'4202','นาด้วง','Na Duang',30),(448,'4203','เชียงคาน','Chiang Khan',30),(449,'4204','ปากชม','Pak Chom',30),(450,'4205','ด่านซ้าย','Dan Sai',30),(451,'4206','นาแห้ว','Na Haeo',30),(452,'4207','ภูเรือ','Phu Ruea',30),(453,'4208','ท่าลี่','Tha Li',30),(454,'4209','วังสะพุง','Wang Saphung',30),(455,'4210','ภูกระดึง','Phu Kradueng',30),(456,'4211','ภูหลวง','Phu Luang',30),(457,'4212','ผาขาว','Pha Khao',30),(458,'4213','เอราวัณ','Erawan',30),(459,'4214','หนองหิน','Nong Hin',30),(460,'4301','เมืองหนองคาย','Mueang Nong Khai',31),(461,'4302','ท่าบ่อ','Tha Bo',31),(464,'4305','โพนพิสัย','Phon Phisai',31),(466,'4307','ศรีเชียงใหม่','Si Chiang Mai',31),(467,'4308','สังคม','Sangkhom',31),(473,'4314','สระใคร','Sakhrai',31),(474,'4315','เฝ้าไร่','Fao Rai',31),(475,'4316','รัตนวาปี','Rattanawapi',31),(476,'4317','โพธิ์ตาก','Pho Tak',31),(477,'4401','เมืองมหาสารคาม','Mueang Maha Sarakham',32),(478,'4402','แกดำ','Kae Dam',32),(479,'4403','โกสุมพิสัย','Kosum Phisai',32),(480,'4404','กันทรวิชัย','Kantharawichai',32),(481,'4405','เชียงยืน','Kantharawichai',32),(482,'4406','บรบือ','Borabue',32),(483,'4407','นาเชือก','Na Chueak',32),(484,'4408','พยัคฆภูมิพิสัย','Phayakkhaphum Phisai',32),(485,'4409','วาปีปทุม','Wapi Pathum',32),(486,'4410','นาดูน','Na Dun',32),(487,'4411','ยางสีสุราช','Yang Sisurat',32),(488,'4412','กุดรัง','Kut Rang',32),(489,'4413','ชื่นชม','Chuen Chom',32),(490,'4481','*หลุบ','*Lub',32),(491,'4501','เมืองร้อยเอ็ด','Mueang Roi Et',33),(492,'4502','เกษตรวิสัย','Kaset Wisai',33),(493,'4503','ปทุมรัตต์','Pathum Rat',33),(494,'4504','จตุรพักตรพิมาน','Chaturaphak Phiman',33),(495,'4505','ธวัชบุรี','Thawat Buri',33),(496,'4506','พนมไพร','Phanom Phrai',33),(497,'4507','โพนทอง','Phon Thong',33),(498,'4508','โพธิ์ชัย','Pho Chai',33),(499,'4509','หนองพอก','Nong Phok',33),(500,'4510','เสลภูมิ','Selaphum',33),(501,'4511','สุวรรณภูมิ','Suwannaphum',33),(502,'4512','เมืองสรวง','Mueang Suang',33),(503,'4513','โพนทราย','Phon Sai',33),(504,'4514','อาจสามารถ','At Samat',33),(505,'4515','เมยวดี','Moei Wadi',33),(506,'4516','ศรีสมเด็จ','Si Somdet',33),(507,'4517','จังหาร','Changhan',33),(508,'4518','เชียงขวัญ','Chiang Khwan',33),(509,'4519','หนองฮี','Nong Hi',33),(510,'4520','ทุ่งเขาหลวง','Thung Khao Luangกิ่',33),(511,'4601','เมืองกาฬสินธุ์','Mueang Kalasin',34),(512,'4602','นามน','Na Mon',34),(513,'4603','กมลาไสย','Kamalasai',34),(514,'4604','ร่องคำ','Rong Kham',34),(515,'4605','กุฉินารายณ์','Kuchinarai',34),(516,'4606','เขาวง','Khao Wong',34),(517,'4607','ยางตลาด','Yang Talat',34),(518,'4608','ห้วยเม็ก','Huai Mek',34),(519,'4609','สหัสขันธ์','Sahatsakhan',34),(520,'4610','คำม่วง','Kham Muang',34),(521,'4611','ท่าคันโท','Tha Khantho',34),(522,'4612','หนองกุงศรี','Nong Kung Si',34),(523,'4613','สมเด็จ','Somdet',34),(524,'4614','ห้วยผึ้ง','Huai Phueng',34),(525,'4615','สามชัย','Sam Chai',34),(526,'4616','นาคู','Na Khu',34),(527,'4617','ดอนจาน','Don Chan',34),(528,'4618','ฆ้องชัย','Khong Chai',34),(529,'4701','เมืองสกลนคร','Mueang Sakon Nakhon',35),(530,'4702','กุสุมาลย์','Kusuman',35),(531,'4703','กุดบาก','Kut Bak',35),(532,'4704','พรรณานิคม','Phanna Nikhom',35),(533,'4705','พังโคน','Phang Khon',35),(534,'4706','วาริชภูมิ','Waritchaphum',35),(535,'4707','นิคมน้ำอูน','Nikhom Nam Un',35),(536,'4708','วานรนิวาส','Wanon Niwat',35),(537,'4709','คำตากล้า','Kham Ta Kla',35),(538,'4710','บ้านม่วง','Ban Muang',35),(539,'4711','อากาศอำนวย','Akat Amnuai',35),(540,'4712','สว่างแดนดิน','Sawang Daen Din',35),(541,'4713','ส่องดาว','Song Dao',35),(542,'4714','เต่างอย','Tao Ngoi',35),(543,'4715','โคกศรีสุพรรณ','Khok Si Suphan',35),(544,'4716','เจริญศิลป์','Charoen Sin',35),(545,'4717','โพนนาแก้ว','Phon Na Kaeo',35),(546,'4718','ภูพาน','Phu Phan',35),(547,'4751','วานรนิวาส (สาขาตำบลกุดเรือคำ)*','Wanon Niwat',35),(548,'4781','*อ.บ้านหัน  จ.สกลนคร','*Banhan',35),(549,'4801','เมืองนครพนม','Mueang Nakhon Phanom',36),(550,'4802','ปลาปาก','Pla Pak',36),(551,'4803','ท่าอุเทน','Tha Uthen',36),(552,'4804','บ้านแพง','Ban Phaeng',36),(553,'4805','ธาตุพนม','That Phanom',36),(554,'4806','เรณูนคร','Renu Nakhon',36),(555,'4807','นาแก','Na Kae',36),(556,'4808','ศรีสงคราม','Si Songkhram',36),(557,'4809','นาหว้า','Na Wa',36),(558,'4810','โพนสวรรค์','Phon Sawan',36),(559,'4811','นาทม','Na Thom',36),(560,'4812','วังยาง','Wang Yang',36),(561,'4901','เมืองมุกดาหาร','Mueang Mukdahan',37),(562,'4902','นิคมคำสร้อย','Nikhom Kham Soi',37),(563,'4903','ดอนตาล','Don Tan',37),(564,'4904','ดงหลวง','Dong Luang',37),(565,'4905','คำชะอี','Khamcha-i',37),(566,'4906','หว้านใหญ่','Wan Yai',37),(567,'4907','หนองสูง','Nong Sung',37),(568,'5001','เมืองเชียงใหม่','Mueang Chiang Mai',38),(569,'5002','จอมทอง','Chom Thong',38),(570,'5003','แม่แจ่ม','Mae Chaem',38),(571,'5004','เชียงดาว','Chiang Dao',38),(572,'5005','ดอยสะเก็ด','Doi Saket',38),(573,'5006','แม่แตง','Mae Taeng',38),(574,'5007','แม่ริม','Mae Rim',38),(575,'5008','สะเมิง','Samoeng',38),(576,'5009','ฝาง','Fang',38),(577,'5010','แม่อาย','Mae Ai',38),(578,'5011','พร้าว','Phrao',38),(579,'5012','สันป่าตอง','San Pa Tong',38),(580,'5013','สันกำแพง','San Kamphaeng',38),(581,'5014','สันทราย','San Sai',38),(582,'5015','หางดง','Hang Dong',38),(583,'5016','ฮอด','Hot',38),(584,'5017','ดอยเต่า','Doi Tao',38),(585,'5018','อมก๋อย','Omkoi',38),(586,'5019','สารภี','Saraphi',38),(587,'5020','เวียงแหง','Wiang Haeng',38),(588,'5021','ไชยปราการ','Chai Prakan',38),(589,'5022','แม่วาง','Mae Wang',38),(590,'5023','แม่ออน','Mae On',38),(591,'5024','ดอยหล่อ','Doi Lo',38),(592,'5051','เทศบาลนครเชียงใหม่ (สาขาแขวงกาลวิละ)*','Tet Saban Nakorn Chiangmai(Kan lawi la)*',38),(593,'5052','เทศบาลนครเชียงใหม่ (สาขาแขวงศรีวิชั)*','Tet Saban Nakorn Chiangmai(Sri Wi)*',38),(594,'5053','เทศบาลนครเชียงใหม่ (สาขาเม็งราย)*','Tet Saban Nakorn Chiangmai(Meng Rai)*',38),(595,'5101','เมืองลำพูน','Mueang Lamphun',39),(596,'5102','แม่ทา','Mae Tha',39),(597,'5103','บ้านโฮ่ง','Ban Hong',39),(598,'5104','ลี้','Li',39),(599,'5105','ทุ่งหัวช้าง','Thung Hua Chang',39),(600,'5106','ป่าซาง','Pa Sang',39),(601,'5107','บ้านธิ','Ban Thi',39),(602,'5108','เวียงหนองล่อง','Wiang Nong Long',39),(603,'5201','เมืองลำปาง','Mueang Lampang',40),(604,'5202','แม่เมาะ','Mae Mo',40),(605,'5203','เกาะคา','Ko Kha',40),(606,'5204','เสริมงาม','Soem Ngam',40),(607,'5205','งาว','Ngao',40),(608,'5206','แจ้ห่ม','Chae Hom',40),(609,'5207','วังเหนือ','Wang Nuea',40),(610,'5208','เถิน','Thoen',40),(611,'5209','แม่พริก','Mae Phrik',40),(612,'5210','แม่ทะ','Mae Tha',40),(613,'5211','สบปราบ','Sop Prap',40),(614,'5212','ห้างฉัตร','Hang Chat',40),(615,'5213','เมืองปาน','Mueang Pan',40),(616,'5301','เมืองอุตรดิตถ์','Mueang Uttaradit',41),(617,'5302','ตรอน','Tron',41),(618,'5303','ท่าปลา','Tha Pla',41),(619,'5304','น้ำปาด','Nam Pat',41),(620,'5305','ฟากท่า','Fak Tha',41),(621,'5306','บ้านโคก','Ban Khok',41),(622,'5307','พิชัย','Phichai',41),(623,'5308','ลับแล','Laplae',41),(624,'5309','ทองแสนขัน','Thong Saen Khan',41),(625,'5401','เมืองแพร่','Mueang Phrae',42),(626,'5402','ร้องกวาง','Rong Kwang',42),(627,'5403','ลอง','Long',42),(628,'5404','สูงเม่น','Sung Men',42),(629,'5405','เด่นชัย','Den Chai',42),(630,'5406','สอง','Song',42),(631,'5407','วังชิ้น','Wang Chin',42),(632,'5408','หนองม่วงไข่','Nong Muang Khai',42),(633,'5501','เมืองน่าน','Mueang Nan',43),(634,'5502','แม่จริม','Mae Charim',43),(635,'5503','บ้านหลวง','Ban Luang',43),(636,'5504','นาน้อย','Na Noi',43),(637,'5505','ปัว','Pua',43),(638,'5506','ท่าวังผา','Tha Wang Pha',43),(639,'5507','เวียงสา','Wiang Sa',43),(640,'5508','ทุ่งช้าง','Thung Chang',43),(641,'5509','เชียงกลาง','Chiang Klang',43),(642,'5510','นาหมื่น','Na Muen',43),(643,'5511','สันติสุข','Santi Suk',43),(644,'5512','บ่อเกลือ','Bo Kluea',43),(645,'5513','สองแคว','Song Khwae',43),(646,'5514','ภูเพียง','Phu Phiang',43),(647,'5515','เฉลิมพระเกียรติ','Chaloem Phra Kiat',43),(648,'5601','เมืองพะเยา','Mueang Phayao',44),(649,'5602','จุน','Chun',44),(650,'5603','เชียงคำ','Chiang Kham',44),(651,'5604','เชียงม่วน','Chiang Muan',44),(652,'5605','ดอกคำใต้','Dok Khamtai',44),(653,'5606','ปง','Pong',44),(654,'5607','แม่ใจ','Mae Chai',44),(655,'5608','ภูซาง','Phu Sang',44),(656,'5609','ภูกามยาว','Phu Kamyao',44),(657,'5701','เมืองเชียงราย','Mueang Chiang Rai',45),(658,'5702','เวียงชัย','Wiang Chai',45),(659,'5703','เชียงของ','Chiang Khong',45),(660,'5704','เทิง','Thoeng',45),(661,'5705','พาน','Phan',45),(662,'5706','ป่าแดด','Pa Daet',45),(663,'5707','แม่จัน','Mae Chan',45),(664,'5708','เชียงแสน','Chiang Saen',45),(665,'5709','แม่สาย','Mae Sai',45),(666,'5710','แม่สรวย','Mae Suai',45),(667,'5711','เวียงป่าเป้า','Wiang Pa Pao',45),(668,'5712','พญาเม็งราย','Phaya Mengrai',45),(669,'5713','เวียงแก่น','Wiang Kaen',45),(670,'5714','ขุนตาล','Khun Tan',45),(671,'5715','แม่ฟ้าหลวง','Mae Fa Luang',45),(672,'5716','แม่ลาว','Mae Lao',45),(673,'5717','เวียงเชียงรุ้ง','Wiang Chiang Rung',45),(674,'5718','ดอยหลวง','Doi Luang',45),(675,'5801','เมืองแม่ฮ่องสอน','Mueang Mae Hong Son',46),(676,'5802','ขุนยวม','Khun Yuam',46),(677,'5803','ปาย','Pai',46),(678,'5804','แม่สะเรียง','Mae Sariang',46),(679,'5805','แม่ลาน้อย','Mae La Noi',46),(680,'5806','สบเมย','Sop Moei',46),(681,'5807','ปางมะผ้า','Pang Mapha',46),(682,'5881','*อ.ม่วยต่อ  จ.แม่ฮ่องสอน','Muen Tor',46),(683,'6001','เมืองนครสวรรค์','Mueang Nakhon Sawan',47),(684,'6002','โกรกพระ','Krok Phra',47),(685,'6003','ชุมแสง','Chum Saeng',47),(686,'6004','หนองบัว','Nong Bua',47),(687,'6005','บรรพตพิสัย','Banphot Phisai',47),(688,'6006','เก้าเลี้ยว','Kao Liao',47),(689,'6007','ตาคลี','Takhli',47),(690,'6008','ท่าตะโก','Takhli',47),(691,'6009','ไพศาลี','Phaisali',47),(692,'6010','พยุหะคีรี','Phayuha Khiri',47),(693,'6011','ลาดยาว','Phayuha Khiri',47),(694,'6012','ตากฟ้า','Tak Fa',47),(695,'6013','แม่วงก์','Mae Wong',47),(696,'6014','แม่เปิน','Mae Poen',47),(697,'6015','ชุมตาบง','Chum Ta Bong',47),(698,'6051','สาขาตำบลห้วยน้ำหอม*','Huen Nam Hom',47),(699,'6052','กิ่งอำเภอชุมตาบง (สาขาตำบลชุมตาบง)*','Chum Ta Bong',47),(700,'6053','แม่วงก์ (สาขาตำบลแม่เล่ย์)*','Mea Ley',47),(701,'6101','เมืองอุทัยธานี','Mueang Uthai Thani',48),(702,'6102','ทัพทัน','Thap Than',48),(703,'6103','สว่างอารมณ์','Sawang Arom',48),(704,'6104','หนองฉาง','Nong Chang',48),(705,'6105','หนองขาหย่าง','Nong Khayang',48),(706,'6106','บ้านไร่','Ban Rai',48),(707,'6107','ลานสัก','Lan Sak',48),(708,'6108','ห้วยคต','Huai Khot',48),(709,'6201','เมืองกำแพงเพชร','Mueang Kamphaeng Phet',49),(710,'6202','ไทรงาม','Sai Ngam',49),(711,'6203','คลองลาน','Khlong Lan',49),(712,'6204','ขาณุวรลักษบุรี','Khanu Woralaksaburi',49),(713,'6205','คลองขลุง','Khlong Khlung',49),(714,'6206','พรานกระต่าย','Phran Kratai',49),(715,'6207','ลานกระบือ','Lan Krabue',49),(716,'6208','ทรายทองวัฒนา','Sai Thong Watthana',49),(717,'6209','ปางศิลาทอง','Pang Sila Thong',49),(718,'6210','บึงสามัคคี','Bueng Samakkhi',49),(719,'6211','โกสัมพีนคร','Kosamphi Nakhon',49),(720,'6301','เมืองตาก','Mueang Tak',50),(721,'6302','บ้านตาก','Ban Tak',50),(722,'6303','สามเงา','Sam Ngao',50),(723,'6304','แม่ระมาด','Mae Ramat',50),(724,'6305','ท่าสองยาง','Tha Song Yang',50),(725,'6306','แม่สอด','Mae Sot',50),(726,'6307','พบพระ','Phop Phra',50),(727,'6308','อุ้มผาง','Umphang',50),(728,'6309','วังเจ้า','Wang Chao',50),(729,'6381','*กิ่ง อ.ท่าปุย  จ.ตาก','*King Ta Pui',50),(730,'6401','เมืองสุโขทัย','Mueang Sukhothai',51),(731,'6402','บ้านด่านลานหอย','Ban Dan Lan Hoi',51),(732,'6403','คีรีมาศ','Khiri Mat',51),(733,'6404','กงไกรลาศ','Kong Krailat',51),(734,'6405','ศรีสัชนาลัย','Si Satchanalai',51),(735,'6406','ศรีสำโรง','Si Samrong',51),(736,'6407','สวรรคโลก','Sawankhalok',51),(737,'6408','ศรีนคร','Si Nakhon',51),(738,'6409','ทุ่งเสลี่ยม','Thung Saliam',51),(739,'6501','เมืองพิษณุโลก','Mueang Phitsanulok',52),(740,'6502','นครไทย','Nakhon Thai',52),(741,'6503','ชาติตระการ','Chat Trakan',52),(742,'6504','บางระกำ','Bang Rakam',52),(743,'6505','บางกระทุ่ม','Bang Krathum',52),(744,'6506','พรหมพิราม','Phrom Phiram',52),(745,'6507','วัดโบสถ์','Wat Bot',52),(746,'6508','วังทอง','Wang Thong',52),(747,'6509','เนินมะปราง','Noen Maprang',52),(748,'6601','เมืองพิจิตร','Mueang Phichit',53),(749,'6602','วังทรายพูน','Wang Sai Phun',53),(750,'6603','โพธิ์ประทับช้าง','Pho Prathap Chang',53),(751,'6604','ตะพานหิน','Taphan Hin',53),(752,'6605','บางมูลนาก','Bang Mun Nak',53),(753,'6606','โพทะเล','Pho Thale',53),(754,'6607','สามง่าม','Sam Ngam',53),(755,'6608','ทับคล้อ','Tap Khlo',53),(756,'6609','สากเหล็ก','Sak Lek',53),(757,'6610','บึงนาราง','Bueng Na Rang',53),(758,'6611','ดงเจริญ','Dong Charoen',53),(759,'6612','วชิรบารมี','Wachirabarami',53),(760,'6701','เมืองเพชรบูรณ์','Mueang Phetchabun',54),(761,'6702','ชนแดน','Chon Daen',54),(762,'6703','หล่มสัก','Lom Sak',54),(763,'6704','หล่มเก่า','Lom Kao',54),(764,'6705','วิเชียรบุรี','Wichian Buri',54),(765,'6706','ศรีเทพ','Si Thep',54),(766,'6707','หนองไผ่','Nong Phai',54),(767,'6708','บึงสามพัน','Bueng Sam Phan',54),(768,'6709','น้ำหนาว','Nam Nao',54),(769,'6710','วังโป่ง','Wang Pong',54),(770,'6711','เขาค้อ','Khao Kho',54),(771,'7001','เมืองราชบุรี','Mueang Ratchaburi',55),(772,'7002','จอมบึง','Chom Bueng',55),(773,'7003','สวนผึ้ง','Suan Phueng',55),(774,'7004','ดำเนินสะดวก','Damnoen Saduak',55),(775,'7005','บ้านโป่ง','Ban Pong',55),(776,'7006','บางแพ','Bang Phae',55),(777,'7007','โพธาราม','Photharam',55),(778,'7008','ปากท่อ','Pak Tho',55),(779,'7009','วัดเพลง','Wat Phleng',55),(780,'7010','บ้านคา','Ban Kha',55),(781,'7074','ท้องถิ่นเทศบาลตำบลบ้านฆ้อง','Tet Saban Ban Kong',55),(782,'7101','เมืองกาญจนบุรี','Mueang Kanchanaburi',56),(783,'7102','ไทรโยค','Sai Yok',56),(784,'7103','บ่อพลอย','Bo Phloi',56),(785,'7104','ศรีสวัสดิ์','Si Sawat',56),(786,'7105','ท่ามะกา','Tha Maka',56),(787,'7106','ท่าม่วง','Tha Muang',56),(788,'7107','ทองผาภูมิ','Pha Phum',56),(789,'7108','สังขละบุรี','Sangkhla Buri',56),(790,'7109','พนมทวน','Phanom Thuan',56),(791,'7110','เลาขวัญ','Lao Khwan',56),(792,'7111','ด่านมะขามเตี้ย','Dan Makham Tia',56),(793,'7112','หนองปรือ','Nong Prue',56),(794,'7113','ห้วยกระเจา','Huai Krachao',56),(795,'7151','สาขาตำบลท่ากระดาน*','Tha Kra Dan',56),(796,'7181','*บ้านทวน  จ.กาญจนบุรี','*Ban Tuan',56),(797,'7201','เมืองสุพรรณบุรี','Mueang Suphan Buri',57),(798,'7202','เดิมบางนางบวช','Doem Bang Nang Buat',57),(799,'7203','ด่านช้าง','Dan Chang',57),(800,'7204','บางปลาม้า','Bang Pla Ma',57),(801,'7205','ศรีประจันต์','Si Prachan',57),(802,'7206','ดอนเจดีย์','Don Chedi',57),(803,'7207','สองพี่น้อง','Song Phi Nong',57),(804,'7208','สามชุก','Sam Chuk',57),(805,'7209','อู่ทอง','U Thong',57),(806,'7210','หนองหญ้าไซ','Nong Ya Sai',57),(807,'7301','เมืองนครปฐม','Mueang Nakhon Pathom',58),(808,'7302','กำแพงแสน','Kamphaeng Saen',58),(809,'7303','นครชัยศรี','Nakhon Chai Si',58),(810,'7304','ดอนตูม','Don Tum',58),(811,'7305','บางเลน','Bang Len',58),(812,'7306','สามพราน','Sam Phran',58),(813,'7307','พุทธมณฑล','Phutthamonthon',58),(814,'7401','เมืองสมุทรสาคร','Mueang Samut Sakhon',59),(815,'7402','กระทุ่มแบน','Krathum Baen',59),(816,'7403','บ้านแพ้ว','Ban Phaeo',59),(817,'7501','เมืองสมุทรสงคราม','Mueang Samut Songkhram',60),(818,'7502','บางคนที','Bang Khonthi',60),(819,'7503','อัมพวา','Amphawa',60),(820,'7601','เมืองเพชรบุรี','Mueang Phetchaburi',61),(821,'7602','เขาย้อย','Khao Yoi',61),(822,'7603','หนองหญ้าปล้อง','Nong Ya Plong',61),(823,'7604','ชะอำ','Cha-am',61),(824,'7605','ท่ายาง','Tha Yang',61),(825,'7606','บ้านลาด','Ban Lat',61),(826,'7607','บ้านแหลม','Ban Laem',61),(827,'7608','แก่งกระจาน','Kaeng Krachan',61),(828,'7701','เมืองประจวบคีรีขันธ์','Mueang Prachuap Khiri Khan',62),(829,'7702','กุยบุรี','Kui Buri',62),(830,'7703','ทับสะแก','Thap Sakae',62),(831,'7704','บางสะพาน','Bang Saphan',62),(832,'7705','บางสะพานน้อย','Bang Saphan Noi',62),(833,'7706','ปราณบุรี','Pran Buri',62),(834,'7707','หัวหิน','Hua Hin',62),(835,'7708','สามร้อยยอด','Sam Roi Yot',62),(836,'8001','เมืองนครศรีธรรมราช','Mueang Nakhon Si Thammarat',63),(837,'8002','พรหมคีรี','Phrom Khiri',63),(838,'8003','ลานสกา','Lan Saka',63),(839,'8004','ฉวาง','Chawang',63),(840,'8005','พิปูน','Phipun',63),(841,'8006','เชียรใหญ่','Chian Yai',63),(842,'8007','ชะอวด','Cha-uat',63),(843,'8008','ท่าศาลา','Tha Sala',63),(844,'8009','ทุ่งสง','Thung Song',63),(845,'8010','นาบอน','Na Bon',63),(846,'8011','ทุ่งใหญ่','Thung Yai',63),(847,'8012','ปากพนัง','Pak Phanang',63),(848,'8013','ร่อนพิบูลย์','Ron Phibun',63),(849,'8014','สิชล','Sichon',63),(850,'8015','ขนอม','Khanom',63),(851,'8016','หัวไทร','Hua Sai',63),(852,'8017','บางขัน','Bang Khan',63),(853,'8018','ถ้ำพรรณรา','Tham Phannara',63),(854,'8019','จุฬาภรณ์','Chulabhorn',63),(855,'8020','พระพรหม','Phra Phrom',63),(856,'8021','นบพิตำ','Nopphitam',63),(857,'8022','ช้างกลาง','Chang Klang',63),(858,'8023','เฉลิมพระเกียรติ','Chaloem Phra Kiat',63),(859,'8051','เชียรใหญ่ (สาขาตำบลเสือหึง)*','Chian Yai*',63),(860,'8052','สาขาตำบลสวนหลวง**','Suan Luang',63),(861,'8053','ร่อนพิบูลย์ (สาขาตำบลหินตก)*','Ron Phibun',63),(862,'8054','หัวไทร (สาขาตำบลควนชะลิก)*','Hua Sai',63),(863,'8055','ทุ่งสง (สาขาตำบลกะปาง)*','Thung Song',63),(864,'8101','เมืองกระบี่','Mueang Krabi',64),(865,'8102','เขาพนม','Khao Phanom',64),(866,'8103','เกาะลันตา','Ko Lanta',64),(867,'8104','คลองท่อม','Khlong Thom',64),(868,'8105','อ่าวลึก','Ao Luek',64),(869,'8106','ปลายพระยา','Plai Phraya',64),(870,'8107','ลำทับ','Lam Thap',64),(871,'8108','เหนือคลอง','Nuea Khlong',64),(872,'8201','เมืองพังงา','Mueang Phang-nga',65),(873,'8202','เกาะยาว','Ko Yao',65),(874,'8203','กะปง','Kapong',65),(875,'8204','ตะกั่วทุ่ง','Takua Thung',65),(876,'8205','ตะกั่วป่า','Takua Pa',65),(877,'8206','คุระบุรี','Khura Buri',65),(878,'8207','ทับปุด','Thap Put',65),(879,'8208','ท้ายเหมือง','Thai Mueang',65),(880,'8301','เมืองภูเก็ต','Mueang Phuket',66),(881,'8302','กะทู้','Kathu',66),(882,'8303','ถลาง','Thalang',66),(883,'8381','*ทุ่งคา','*Tung Ka',66),(884,'8401','เมืองสุราษฎร์ธานี','Mueang Surat Thani',67),(885,'8402','กาญจนดิษฐ์','Kanchanadit',67),(886,'8403','ดอนสัก','Don Sak',67),(887,'8404','เกาะสมุย','Ko Samui',67),(888,'8405','เกาะพะงัน','Ko Pha-ngan',67),(889,'8406','ไชยา','Chaiya',67),(890,'8407','ท่าชนะ','Tha Chana',67),(891,'8408','คีรีรัฐนิคม','Khiri Rat Nikhom',67),(892,'8409','บ้านตาขุน','Ban Ta Khun',67),(893,'8410','พนม','Phanom',67),(894,'8411','ท่าฉาง','Tha Chang',67),(895,'8412','บ้านนาสาร','Ban Na San',67),(896,'8413','บ้านนาเดิม','Ban Na Doem',67),(897,'8414','เคียนซา','Khian Sa',67),(898,'8415','เวียงสระ','Wiang Sa',67),(899,'8416','พระแสง','Phrasaeng',67),(900,'8417','พุนพิน','Phunphin',67),(901,'8418','ชัยบุรี','Chai Buri',67),(902,'8419','วิภาวดี','Vibhavadi',67),(903,'8451','เกาะพงัน (สาขาตำบลเกาะเต่า)*','Ko Pha-ngan',67),(904,'8481','*อ.บ้านดอน  จ.สุราษฎร์ธานี','*Ban Don',67),(905,'8501','เมืองระนอง','Mueang Ranong',68),(906,'8502','ละอุ่น','La-un',68),(907,'8503','กะเปอร์','Kapoe',68),(908,'8504','กระบุรี','Kra Buri',68),(909,'8505','สุขสำราญ','Suk Samran',68),(910,'8601','เมืองชุมพร','Mueang Chumphon',69),(911,'8602','ท่าแซะ','Tha Sae',69),(912,'8603','ปะทิว','Pathio',69),(913,'8604','หลังสวน','Lang Suan',69),(914,'8605','ละแม','Lamae',69),(915,'8606','พะโต๊ะ','Phato',69),(916,'8607','สวี','Sawi',69),(917,'8608','ทุ่งตะโก','Thung Tako',69),(918,'9001','เมืองสงขลา','Mueang Songkhla',70),(919,'9002','สทิงพระ','Sathing Phra',70),(920,'9003','จะนะ','Chana',70),(921,'9004','นาทวี','Na Thawi',70),(922,'9005','เทพา','Thepha',70),(923,'9006','สะบ้าย้อย','Saba Yoi',70),(924,'9007','ระโนด','Ranot',70),(925,'9008','กระแสสินธุ์','Krasae Sin',70),(926,'9009','รัตภูมิ','Rattaphum',70),(927,'9010','สะเดา','Sadao',70),(928,'9011','หาดใหญ่','Hat Yai',70),(929,'9012','นาหม่อม','Na Mom',70),(930,'9013','ควนเนียง','Khuan Niang',70),(931,'9014','บางกล่ำ','Bang Klam',70),(932,'9015','สิงหนคร','Singhanakhon',70),(933,'9016','คลองหอยโข่ง','Khlong Hoi Khong',70),(934,'9077','ท้องถิ่นเทศบาลตำบลสำนักขาม','Sum Nung Kam',70),(935,'9096','เทศบาลตำบลบ้านพรุ*','Ban Pru*',70),(936,'9101','เมืองสตูล','Mueang Satun',71),(937,'9102','ควนโดน','Khuan Don',71),(938,'9103','ควนกาหลง','Khuan Kalong',71),(939,'9104','ท่าแพ','Tha Phae',71),(940,'9105','ละงู','La-ngu',71),(941,'9106','ทุ่งหว้า','Thung Wa',71),(942,'9107','มะนัง','Manang',71),(943,'9201','เมืองตรัง','Mueang Trang',72),(944,'9202','กันตัง','Kantang',72),(945,'9203','ย่านตาขาว','Yan Ta Khao',72),(946,'9204','ปะเหลียน','Palian',72),(947,'9205','สิเกา','Sikao',72),(948,'9206','ห้วยยอด','Huai Yot',72),(949,'9207','วังวิเศษ','Wang Wiset',72),(950,'9208','นาโยง','Na Yong',72),(951,'9209','รัษฎา','Ratsada',72),(952,'9210','หาดสำราญ','Hat Samran',72),(953,'9251','อำเภอเมืองตรัง(สาขาคลองเต็ง)**','Mueang Trang(Krong Teng)**',72),(954,'9301','เมืองพัทลุง','Mueang Phatthalung',73),(955,'9302','กงหรา','Kong Ra',73),(956,'9303','เขาชัยสน','Khao Chaison',73),(957,'9304','ตะโหมด','Tamot',73),(958,'9305','ควนขนุน','Khuan Khanun',73),(959,'9306','ปากพะยูน','Pak Phayun',73),(960,'9307','ศรีบรรพต','Si Banphot',73),(961,'9308','ป่าบอน','Pa Bon',73),(962,'9309','บางแก้ว','Bang Kaeo',73),(963,'9310','ป่าพะยอม','Pa Phayom',73),(964,'9311','ศรีนครินทร์','Srinagarindra',73),(965,'9401','เมืองปัตตานี','Mueang Pattani',74),(966,'9402','โคกโพธิ์','Khok Pho',74),(967,'9403','หนองจิก','Nong Chik',74),(968,'9404','ปะนาเระ','Panare',74),(969,'9405','มายอ','Mayo',74),(970,'9406','ทุ่งยางแดง','Thung Yang Daeng',74),(971,'9407','สายบุรี','Sai Buri',74),(972,'9408','ไม้แก่น','Mai Kaen',74),(973,'9409','ยะหริ่ง','Yaring',74),(974,'9410','ยะรัง','Yarang',74),(975,'9411','กะพ้อ','Kapho',74),(976,'9412','แม่ลาน','Mae Lan',74),(977,'9501','เมืองยะลา','Mueang Yala',75),(978,'9502','เบตง','Betong',75),(979,'9503','บันนังสตา','Bannang Sata',75),(980,'9504','ธารโต','Than To',75),(981,'9505','ยะหา','Yaha',75),(982,'9506','รามัน','Raman',75),(983,'9507','กาบัง','Kabang',75),(984,'9508','กรงปินัง','Krong Pinang',75),(985,'9601','เมืองนราธิวาส','Mueang Narathiwat',76),(986,'9602','ตากใบ','Tak Bai',76),(987,'9603','บาเจาะ','Bacho',76),(988,'9604','ยี่งอ','Yi-ngo',76),(989,'9605','ระแงะ','Ra-ngae',76),(990,'9606','รือเสาะ','Rueso',76),(991,'9607','ศรีสาคร','Si Sakhon',76),(992,'9608','แว้ง','Waeng',76),(993,'9609','สุคิริน','Sukhirin',76),(994,'9610','สุไหงโก-ลก','Su-ngai Kolok',76),(995,'9611','สุไหงปาดี','Su-ngai Padi',76),(996,'9612','จะแนะ','Chanae',76),(997,'9613','เจาะไอร้อง','Cho-airong',76),(998,'9681','*อ.บางนรา  จ.นราธิวาส','*Bang Nra',76),(1005,'3807','ปากคาด','Pak Khat',77),(1004,'3806','บึงโขงหลง','Bueng Khong Long',77),(1003,'3805','ศรีวิไล','Si Wilai',77),(1002,'3804','พรเจริญ','Phon Charoen',77),(1001,'3803','โซ่พิสัย','So Phisai',77),(1000,'3802','เซกา','Seka',77),(999,'3801','เมืองบึงกาฬ','Mueang Bueng Kan',77),(1006,'3808','บุ่งคล้า','Bung Khla',77);
/*!40000 ALTER TABLE `districts_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family`
--

DROP TABLE IF EXISTS `family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family`
--

LOCK TABLES `family` WRITE;
/*!40000 ALTER TABLE `family` DISABLE KEYS */;
INSERT INTO `family` VALUES (1,'Agelenidae');
/*!40000 ALTER TABLE `family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genus`
--

DROP TABLE IF EXISTS `genus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family_id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `family_id` (`family_id`),
  CONSTRAINT `genus_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `family` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genus`
--

LOCK TABLES `genus` WRITE;
/*!40000 ALTER TABLE `genus` DISABLE KEYS */;
INSERT INTO `genus` VALUES (1,1,'Draconarius'),(2,1,'Sinocoelotes'),(3,1,'Coelotes'),(4,1,'Notiocoelotes');
/*!40000 ALTER TABLE `genus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `detail_id` (`detail_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,1,'b588c18113ae45c56753cad47c6a3907','app/image/b588c18113ae45c56753cad47c6a3907',1),(2,2,'b11c9d38d2d901f3b083f77396e9015e','app/image/b11c9d38d2d901f3b083f77396e9015e',1),(3,3,'445f83d230e853ed2f0f4425f5a25808','app/image/445f83d230e853ed2f0f4425f5a25808',1),(4,4,'a2d4182a29b7633685a0645d2bbe7a59','app/image/a2d4182a29b7633685a0645d2bbe7a59',1),(5,5,'9e12a01b81176bed77603dd4ef1035be','app/image/9e12a01b81176bed77603dd4ef1035be',1),(6,6,'b9f261b129553502e61aed93dbb7b550','app/image/b9f261b129553502e61aed93dbb7b550',1),(9,8,'6e434ec81e70a836bdf4ec00535f421d','app/image/6e434ec81e70a836bdf4ec00535f421d',1),(10,9,'651db10653e222afb631970165d1b667','app/image/651db10653e222afb631970165d1b667',1),(11,10,'0478f55c544f4ee62edf3a604415a17b','app/image/0478f55c544f4ee62edf3a604415a17b',1),(12,11,'12b46712d044220415fc3f438b4162da','app/image/12b46712d044220415fc3f438b4162da',1);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail_id` int NOT NULL,
  `province` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locality` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `detail_id` (`detail_id`),
  CONSTRAINT `location_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,1,'38','569','Doi Inthanon National Park',1),(2,2,'38','568','Doi Suthep-Pui National Park',1),(3,3,'38','569','Doi Inthanon National Park',1),(4,4,'38','569','Chomthong',1),(5,5,'38','569','Doi Inthanon National Park',1),(6,6,'38','571','Doi Chiang Dao',1),(7,6,'45','665','Doi Tung',1),(9,8,'45','667','Khun Jae National Park ',1),(10,9,'38','571','Doi Chiang Dao Wildlife Sanctiary',1),(11,10,'38','568','Doi Suthep-Pui National Park',1),(12,11,'19','235','Khao Yai National Park',1);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paper`
--

DROP TABLE IF EXISTS `paper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paper` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `detail_id` (`detail_id`),
  CONSTRAINT `paper_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paper`
--

LOCK TABLES `paper` WRITE;
/*!40000 ALTER TABLE `paper` DISABLE KEYS */;
INSERT INTO `paper` VALUES (1,1,'Dankittipakul & Wang (2003)',1),(2,2,'Dankittipakul & Wang (2003)',1),(3,3,'Dankittipakul & Wang (2003)',1),(4,4,'Dankittipakul & Wang (2003)',1),(5,5,'Dankittipakul & Wang (2003)',1),(6,6,'Dankittipakul, Sonthichai & Wang (2006)',1),(8,8,'Dankittipakul & Wang (2003)',1),(9,9,'Dankittipakul & Wang (2004)',1),(10,10,'Dankittipakul, Chami-Kranon & Wang (2005)',1),(11,11,'Dankittipakul, Chami-Kranon & Wang (2005)',1);
/*!40000 ALTER TABLE `paper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinces_list`
--

DROP TABLE IF EXISTS `provinces_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provinces_list` (
  `id` int NOT NULL,
  `code` varchar(2) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name_th` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name_en` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `geography_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinces_list`
--

LOCK TABLES `provinces_list` WRITE;
/*!40000 ALTER TABLE `provinces_list` DISABLE KEYS */;
INSERT INTO `provinces_list` VALUES (1,'10','กรุงเทพมหานคร','Bangkok',2),(2,'11','สมุทรปราการ','Samut Prakan',2),(3,'12','นนทบุรี','Nonthaburi',2),(4,'13','ปทุมธานี','Pathum Thani',2),(5,'14','พระนครศรีอยุธยา','Phra Nakhon Si Ayutthaya',2),(6,'15','อ่างทอง','Ang Thong',2),(7,'16','ลพบุรี','Loburi',2),(8,'17','สิงห์บุรี','Sing Buri',2),(9,'18','ชัยนาท','Chai Nat',2),(10,'19','สระบุรี','Saraburi',2),(11,'20','ชลบุรี','Chon Buri',5),(12,'21','ระยอง','Rayong',5),(13,'22','จันทบุรี','Chanthaburi',5),(14,'23','ตราด','Trat',5),(15,'24','ฉะเชิงเทรา','Chachoengsao',5),(16,'25','ปราจีนบุรี','Prachin Buri',5),(17,'26','นครนายก','Nakhon Nayok',2),(18,'27','สระแก้ว','Sa Kaeo',5),(19,'30','นครราชสีมา','Nakhon Ratchasima',3),(20,'31','บุรีรัมย์','Buri Ram',3),(21,'32','สุรินทร์','Surin',3),(22,'33','ศรีสะเกษ','Si Sa Ket',3),(23,'34','อุบลราชธานี','Ubon Ratchathani',3),(24,'35','ยโสธร','Yasothon',3),(25,'36','ชัยภูมิ','Chaiyaphum',3),(26,'37','อำนาจเจริญ','Amnat Charoen',3),(27,'39','หนองบัวลำภู','Nong Bua Lam Phu',3),(28,'40','ขอนแก่น','Khon Kaen',3),(29,'41','อุดรธานี','Udon Thani',3),(30,'42','เลย','Loei',3),(31,'43','หนองคาย','Nong Khai',3),(32,'44','มหาสารคาม','Maha Sarakham',3),(33,'45','ร้อยเอ็ด','Roi Et',3),(34,'46','กาฬสินธุ์','Kalasin',3),(35,'47','สกลนคร','Sakon Nakhon',3),(36,'48','นครพนม','Nakhon Phanom',3),(37,'49','มุกดาหาร','Mukdahan',3),(38,'50','เชียงใหม่','Chiang Mai',1),(39,'51','ลำพูน','Lamphun',1),(40,'52','ลำปาง','Lampang',1),(41,'53','อุตรดิตถ์','Uttaradit',1),(42,'54','แพร่','Phrae',1),(43,'55','น่าน','Nan',1),(44,'56','พะเยา','Phayao',1),(45,'57','เชียงราย','Chiang Rai',1),(46,'58','แม่ฮ่องสอน','Mae Hong Son',1),(47,'60','นครสวรรค์','Nakhon Sawan',2),(48,'61','อุทัยธานี','Uthai Thani',2),(49,'62','กำแพงเพชร','Kamphaeng Phet',2),(50,'63','ตาก','Tak',4),(51,'64','สุโขทัย','Sukhothai',2),(52,'65','พิษณุโลก','Phitsanulok',2),(53,'66','พิจิตร','Phichit',2),(54,'67','เพชรบูรณ์','Phetchabun',2),(55,'70','ราชบุรี','Ratchaburi',4),(56,'71','กาญจนบุรี','Kanchanaburi',4),(57,'72','สุพรรณบุรี','Suphan Buri',2),(58,'73','นครปฐม','Nakhon Pathom',2),(59,'74','สมุทรสาคร','Samut Sakhon',2),(60,'75','สมุทรสงคราม','Samut Songkhram',2),(61,'76','เพชรบุรี','Phetchaburi',4),(62,'77','ประจวบคีรีขันธ์','Prachuap Khiri Khan',4),(63,'80','นครศรีธรรมราช','Nakhon Si Thammarat',6),(64,'81','กระบี่','Krabi',6),(65,'82','พังงา','Phangnga',6),(66,'83','ภูเก็ต','Phuket',6),(67,'84','สุราษฎร์ธานี','Surat Thani',6),(68,'85','ระนอง','Ranong',6),(69,'86','ชุมพร','Chumphon',6),(70,'90','สงขลา','Songkhla',6),(71,'91','สตูล','Satun',6),(72,'92','ตรัง','Trang',6),(73,'93','พัทลุง','Phatthalung',6),(74,'94','ปัตตานี','Pattani',6),(75,'95','ยะลา','Yala',6),(76,'96','นราธิวาส','Narathiwat',6),(77,'97','บึงกาฬ','buogkan',3);
/*!40000 ALTER TABLE `provinces_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genus_id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `genus_id` (`genus_id`),
  CONSTRAINT `species_ibfk_1` FOREIGN KEY (`genus_id`) REFERENCES `genus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species`
--

LOCK TABLES `species` WRITE;
/*!40000 ALTER TABLE `species` DISABLE KEYS */;
INSERT INTO `species` VALUES (1,1,'abbreviatus'),(2,1,'anthonyi'),(3,1,'inthanonensis'),(4,1,'siamensis'),(5,1,'subulatus'),(6,1,'monticola'),(7,2,'thailandensis'),(8,1,'lateralis'),(9,3,'suthepicus'),(10,4,'sparus');
/*!40000 ALTER TABLE `species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','adminadmin','Admin Spider Web','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-02  3:32:10
