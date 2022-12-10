CREATE DATABASE  IF NOT EXISTS `buddybudget` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `buddybudget`;
-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: buddybudget
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `fixedbudget`
--

DROP TABLE IF EXISTS `fixedbudget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fixedbudget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(60) NOT NULL,
  `expense` decimal(10,2) unsigned NOT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `FIXEDBUDGET_USER_FK_idx` (`user`),
  CONSTRAINT `FIXEDBUDGET_USER_FK` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixedbudget`
--

LOCK TABLES `fixedbudget` WRITE;
/*!40000 ALTER TABLE `fixedbudget` DISABLE KEYS */;
INSERT INTO `fixedbudget` VALUES (2,'TESTING2',100000.00,13);
/*!40000 ALTER TABLE `fixedbudget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incomebudget`
--

DROP TABLE IF EXISTS `incomebudget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incomebudget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(60) NOT NULL,
  `expense` decimal(10,2) unsigned NOT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `INCOME_USER_FK_idx` (`user`),
  CONSTRAINT `INCOME_USER_FK` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incomebudget`
--

LOCK TABLES `incomebudget` WRITE;
/*!40000 ALTER TABLE `incomebudget` DISABLE KEYS */;
INSERT INTO `incomebudget` VALUES (2,'testing',10000.00,13);
/*!40000 ALTER TABLE `incomebudget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mainbudget`
--

DROP TABLE IF EXISTS `mainbudget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainbudget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(60) NOT NULL,
  `type` char(3) NOT NULL,
  `expense` decimal(10,2) unsigned NOT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `mainBudget to users_idx` (`user`),
  CONSTRAINT `mainBudget to users` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainbudget`
--

LOCK TABLES `mainbudget` WRITE;
/*!40000 ALTER TABLE `mainbudget` DISABLE KEYS */;
INSERT INTO `mainbudget` VALUES (65,'food','var',500.00,13),(67,'Hulu','fix',100.00,13),(68,'DC Park & Rec','inc',100.00,13),(75,'Uber','inc',100.00,13),(82,'shoes','var',500.00,13),(86,'Netflix','fix',14.99,13),(87,'This is a longer testes','inc',99999999.99,13),(88,'Food','var',250.00,21),(89,'Desserts','var',200.00,21),(90,'Travel','var',0.00,21),(91,'Clothes','var',200.00,21),(92,'Amazon','var',100.00,21),(93,'Big Box Stores (Target, Walmart)','var',100.00,21),(94,'Entertainment','var',200.00,21),(95,'Other - Unneccessary/Luxury','var',100.00,21),(96,'Other - Neccessary ','var',100.00,21),(97,'Gas','var',150.00,21),(98,'Grocery','var',100.00,21),(99,'HBO Max','fix',14.99,21),(100,'Hulu','fix',68.99,21),(101,'Optum','inc',3744.46,21),(102,'Gifts','var',0.00,21),(103,'Fitness 19','fix',19.99,21),(104,'Emergency','var',0.00,21),(108,'Other','inc',0.00,21),(109,'fsdf','fix',4.53,23),(110,'fsdf','fix',4.53,23),(111,'ljkljk','var',5.60,23),(112,'dfasdf','inc',4.30,23),(113,'hgh','inc',34.23,23),(114,'Zelle','inc',0.00,21),(115,'Computer/Games','var',100.00,21),(116,'Pet','var',150.00,21),(117,'Azel School','fix',900.00,21);
/*!40000 ALTER TABLE `mainbudget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthlybudget`
--

DROP TABLE IF EXISTS `monthlybudget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthlybudget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `category` int NOT NULL,
  `expense` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `comment` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `MONTHLY_USER_FK_idx` (`user`),
  KEY `MONTHLY_MAIN_FK_idx` (`category`),
  CONSTRAINT `MONTHLY_MAIN_FK` FOREIGN KEY (`category`) REFERENCES `mainbudget` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MONTHLY_USER_FK` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=444 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthlybudget`
--

LOCK TABLES `monthlybudget` WRITE;
/*!40000 ALTER TABLE `monthlybudget` DISABLE KEYS */;
INSERT INTO `monthlybudget` VALUES (17,13,65,100.00,'2021-09-02',''),(49,13,65,12.00,'2022-09-14','Jollibee'),(51,13,68,1200.00,'2022-09-08','work'),(69,13,82,100.00,'2022-06-15','nike'),(72,13,65,1.00,'2022-05-02',''),(73,21,89,14.00,'2022-06-09','85 Boba'),(74,21,90,146.89,'2022-06-08','Monterey Hotel for 6/24'),(75,21,101,2791.91,'2022-06-11','First Pay'),(76,21,96,271.00,'2022-06-14','Car Registration'),(77,21,89,18.00,'2022-06-08','MTL'),(78,21,92,47.18,'2022-06-10','Ties for Wedding'),(79,21,95,3.36,'2022-06-10','Ate meds'),(80,21,95,2.99,'2022-06-11','Steam Game'),(81,21,93,11.39,'2022-06-11','Mom Baking Supplies'),(82,21,96,43.95,'2022-06-12','Parking Ticket'),(83,21,89,41.92,'2022-06-13','Grubhub Boba'),(84,21,88,14.34,'2022-06-13','In n Out'),(85,21,89,35.08,'2022-06-14','MTL'),(86,21,102,63.16,'2022-06-14','Anni Present'),(87,21,94,13.05,'2022-06-13','Movie Food'),(88,21,88,31.31,'2022-06-14','Pho'),(89,21,98,16.46,'2022-06-14','Azel Grocery'),(90,21,88,13.96,'2022-06-15','Popeyes'),(91,21,98,12.49,'2022-06-15','Smart N Final Jello'),(92,21,98,16.37,'2022-06-15','Lucky'),(93,21,89,37.67,'2022-06-16','Aqua Club'),(94,21,88,12.97,'2022-06-18','Chipotle'),(95,21,89,45.00,'2022-06-19','Coco3'),(96,21,102,76.92,'2022-06-18','Father\'s Day'),(97,21,104,243.60,'2022-06-17','Coco Emergency'),(98,21,91,230.20,'2022-06-19','Running Shoes'),(99,21,91,78.92,'2022-06-19','Dress Shoes'),(100,21,88,22.91,'2022-06-19','Hillsdale Chicken'),(101,21,89,17.00,'2022-06-19','Tpumps'),(102,21,93,20.77,'2022-06-21','Face Sunscreen'),(106,21,88,34.89,'2022-06-21','Stix'),(108,21,89,50.68,'2022-06-20','Yifang'),(109,21,88,19.74,'2022-06-21','Panda panda panda'),(110,21,97,70.36,'2022-06-24',''),(111,21,90,10.00,'2022-06-24','Super 8 Deposit'),(112,21,90,20.76,'2022-06-24','Nacho Bizness'),(113,21,90,41.41,'2022-06-25','Brunch Village Corner'),(114,21,90,20.00,'2022-06-25','Museum'),(115,21,90,408.00,'2022-06-25','Spa'),(117,21,101,2277.73,'2022-06-24','Direct Deposit'),(120,21,90,14.48,'2022-06-26','Jack in the Crack'),(122,21,90,12.50,'2022-06-26','Boba Pekoe'),(123,21,90,1.00,'2022-06-26','Parking Garage'),(124,21,90,11.42,'2022-06-26','Coffee'),(126,21,90,15.30,'2022-06-26','Nacho Bizness pt 2 Mac Attack'),(127,21,90,12.01,'2022-06-26','Kawaii Tanjiro uwu'),(128,21,95,87.90,'2022-06-28','Grip Grand Art'),(129,21,102,43.94,'2022-06-29','Mom Back Thingy'),(130,21,88,5.48,'2022-06-29','McDo (Last Supper)'),(131,21,108,78.46,'2022-06-24','DC Last Check'),(132,21,108,10.35,'2022-06-29','Doordash Settlement'),(133,21,91,154.84,'2022-07-03','ALD 550s'),(134,21,90,7.46,'2022-06-24','Walgreens Drinks'),(135,23,111,4.20,'2022-08-01','no comments'),(136,21,101,480.19,'2022-07-08','Direct Deposit'),(137,21,89,15.75,'2022-07-07','Quickly'),(138,21,89,12.50,'2022-07-03','Bobabill'),(139,21,88,26.92,'2022-07-01','L&L&L&L&L'),(140,21,94,36.00,'2022-07-10','Escape Room'),(141,21,88,24.00,'2022-07-10','El Techo'),(142,21,88,10.97,'2022-07-07','Taco Bell'),(143,21,89,6.25,'2022-07-08','TFM (Boba)'),(145,21,88,10.00,'2022-07-09','Chipotle'),(146,21,88,11.20,'2022-07-09','Tokyo Grill'),(147,21,95,23.60,'2022-07-09','Fishing at Dicks'),(148,21,89,11.25,'2022-07-09','Quicklys (Boba)'),(149,21,88,6.68,'2022-07-09','Jack in the Crack'),(150,21,97,65.72,'2022-07-08','Gass'),(152,21,88,17.48,'2022-07-11','Nick the Greek (Grubhub)'),(153,21,96,43.95,'2022-07-11','Parking Ticket :('),(154,21,89,31.00,'2022-07-13','Cococo'),(155,21,91,205.47,'2022-07-13','Suit'),(156,21,95,0.84,'2022-07-15','USPS Grip Grand'),(157,21,89,5.15,'2022-07-15','85 Boba'),(158,21,92,71.38,'2022-07-15','Chargers'),(159,21,92,43.95,'2022-07-15','Cleaner/Mom\'s cups'),(160,21,89,22.66,'2022-07-16','Happy Lemon Boba'),(161,21,88,52.30,'2022-07-16','Cafe 382 Brunch'),(162,21,98,5.65,'2022-07-11','Luckys (Jam)'),(163,21,98,36.00,'2022-07-16','Costco'),(164,21,89,18.30,'2022-07-17','Boba Guys'),(165,21,92,43.25,'2022-07-17','Weighted blanket + car towel'),(166,21,98,11.57,'2022-07-16','Kukje (Flour + Banana milk)'),(167,21,90,12.99,'2022-05-31','SD to SF Flight'),(168,21,90,110.00,'2022-05-31','SD to SF Flight'),(169,21,89,28.75,'2022-05-28','Cococo'),(170,21,98,84.59,'2022-05-27','Dog food'),(171,21,102,60.29,'2022-05-25','Azel Photo'),(172,21,89,29.65,'2022-05-22','Genkis'),(173,21,89,22.25,'2022-05-22','Pit Stop'),(174,21,88,13.16,'2022-05-21','Dominos'),(175,21,92,71.30,'2022-05-20','Car wash stuff?'),(176,21,88,8.74,'2022-05-18','In-n-Out'),(177,21,88,5.57,'2022-05-17','7-11'),(178,21,88,9.13,'2022-05-15','Taqueria'),(179,21,98,10.98,'2022-05-15','Safeway'),(180,21,94,49.50,'2022-05-15','Movies'),(181,21,88,47.47,'2022-05-14','Pho Great Mall'),(182,21,89,30.79,'2022-05-14','T4'),(183,21,102,46.46,'2022-05-14','Veeboy boxes'),(184,21,88,19.40,'2022-06-04','Eggies (SD)'),(185,21,89,28.25,'2022-06-04','Bobaville'),(186,21,91,48.73,'2022-06-04','Wotown Clothes'),(187,21,94,32.38,'2022-06-04','Happy Does Bar'),(188,21,88,17.26,'2022-06-05','Tacos el gordo'),(189,21,94,184.37,'2022-06-05','Skydiving'),(190,21,88,34.97,'2022-05-13','Chick-fil-a'),(191,21,89,11.00,'2022-05-13','Tpumps'),(192,21,88,9.88,'2022-05-12','Taco Bell'),(193,21,92,7.68,'2022-05-12',''),(194,21,92,12.06,'2022-05-12',''),(195,21,89,20.25,'2022-05-11','Cococo'),(196,21,88,16.45,'2022-05-10','McDo'),(197,21,89,12.00,'2022-05-10','Teaspoon'),(198,21,92,150.13,'2022-05-09','MoCa kit'),(199,21,89,43.41,'2022-05-08','True Dan'),(200,21,88,13.16,'2022-05-08','Dominos'),(201,21,88,30.73,'2022-05-07','Starbird'),(202,21,89,28.50,'2022-05-07','Pekoe'),(203,21,89,29.00,'2022-05-05','Cococo'),(204,21,88,12.97,'2022-05-05','Chipotle'),(205,21,89,11.99,'2022-05-04','Quicklys'),(206,21,96,60.00,'2022-05-03','Coco eye meds'),(207,21,92,31.29,'2022-05-03','New phone stuff'),(208,21,102,3.11,'2022-05-01','Walgreens meds?'),(209,21,88,66.64,'2022-05-01','Amano Pasta'),(210,21,88,30.49,'2022-05-01','Tanis'),(211,21,108,638.31,'2022-05-27','DC Parks'),(212,21,108,146.00,'2022-05-18','Desk Sold'),(213,21,108,676.12,'2022-05-13','DC Parks'),(214,21,114,54.00,'2022-05-11','Zelle from Azel'),(215,21,88,6.75,'2022-05-21','Glizzy'),(216,21,94,133.00,'2022-05-31','Skydiving pt. 2'),(217,21,88,64.00,'2022-06-06','SD Food'),(218,21,89,14.00,'2022-06-08','Boba'),(219,21,114,16.00,'2022-06-12','Azel - Pho'),(220,21,114,15.00,'2022-06-13','Azel - Covid Grocery'),(221,21,114,15.00,'2022-06-14','Covid Grocery'),(222,21,88,26.43,'2022-07-16','Dominos'),(223,13,82,10.00,'2022-07-11',''),(224,13,82,1000.00,'2022-09-01',''),(225,13,68,10000.00,'2022-03-01',''),(226,13,75,100.95,'2022-02-01',''),(227,21,101,1868.74,'2022-07-22','Normal Pay'),(228,21,91,60.00,'2022-07-24','Nike from Ate'),(229,21,92,20.87,'2022-07-22','Dog poop bags'),(230,21,89,23.25,'2022-07-23','Bobaville'),(231,21,88,9.00,'2022-07-23','McDo'),(232,21,91,216.45,'2022-07-24','Lulu\'s'),(233,21,90,15.99,'2022-07-24','Lyft'),(234,21,89,6.50,'2022-07-24','Sharetea'),(235,21,114,8.00,'2022-07-24','Azel Lyft payback'),(236,21,97,51.72,'2022-07-22','Chevron'),(237,21,88,17.48,'2022-07-25','Societea food + boba'),(238,21,88,3.36,'2022-07-25','7-11 taquito'),(239,21,95,85.22,'2022-07-26','Hi\'s Fishing Reel'),(240,21,95,76.90,'2022-07-26','Dick\'s Fishing Rod'),(241,21,89,3.75,'2022-07-27','Zelle candy TJ'),(242,21,114,19.63,'2022-07-27','Taco Bell Payback'),(243,21,88,19.63,'2022-07-26','Taco KFC'),(244,21,96,140.00,'2022-07-29','Coco cut + cash'),(245,21,115,4.99,'2022-07-28','Before your eyes'),(246,21,94,397.90,'2022-07-28','Outside Lands'),(247,21,88,21.38,'2022-07-29','Panda'),(248,21,88,10.55,'2022-07-29','Panda pt 2 Ate'),(249,21,114,198.95,'2022-07-31','Azel Outside Lands'),(250,21,98,6.00,'2022-07-27','Safeway chips'),(251,21,115,4.99,'2022-07-28','Clash '),(252,21,101,1872.24,'2022-08-05','Paycheck'),(253,21,88,42.49,'2022-07-30','Thai BBQ'),(254,21,89,20.07,'2022-07-31','85'),(255,21,97,44.67,'2022-07-30','Shell'),(256,21,93,8.74,'2022-08-02','Batteries (Juan)'),(257,21,95,20.48,'2022-08-02','Fishbites'),(258,21,93,3.79,'2022-08-02','Triscuit'),(259,21,88,5.37,'2022-08-02','McDo flurry'),(260,21,88,14.86,'2022-08-03','Subway'),(261,21,88,13.77,'2022-08-04','McDo Breakfast'),(262,21,91,26.37,'2022-08-05','Crocs'),(263,21,88,6.32,'2022-08-05','In n Out'),(264,21,88,19.55,'2022-08-05','Cheesesteak (OSL)'),(265,21,88,21.51,'2022-08-05','Tacos (OSL)'),(266,21,89,9.56,'2022-08-05','Churro (OSL)'),(267,21,89,13.04,'2022-08-05','Ube Shake (OSL)'),(268,21,94,14.12,'2022-08-05','Ate Beer (OSL)'),(269,21,92,70.15,'2022-08-06','Socks'),(270,21,93,6.79,'2022-08-06','Walgreens'),(271,21,89,6.75,'2022-08-07','Pkow (Veeboy Zelle)'),(272,21,88,14.01,'2022-08-06','Bonchon buns'),(273,21,88,63.62,'2022-08-06','Bonchon'),(274,21,94,233.05,'2022-08-08','Joji tix'),(275,21,96,24.75,'2022-08-08','Joji tix insurance'),(276,21,116,58.75,'2022-08-08','Petsmart Flea medication'),(277,21,114,25.00,'2022-08-08','Azelle for Binka'),(278,21,88,27.75,'2022-08-11','Chick fil a Azelle'),(279,21,91,20.00,'2022-08-11','Belt'),(280,21,96,50.00,'2022-08-12','haircut'),(281,21,88,67.74,'2022-08-11','Chinese food for fam'),(282,21,89,43.65,'2022-08-11','85'),(283,21,93,8.73,'2022-08-12','Target wedding cards'),(284,21,88,25.36,'2022-08-14','Taqeuria Grubhub'),(285,21,114,100.00,'2022-08-14','Azelle wedding gift'),(286,21,102,300.00,'2022-08-16','Ate wedding gift'),(287,21,97,50.87,'2022-08-11','Shell'),(288,21,114,20.00,'2022-08-16','Taqueria Azelle payback'),(289,21,90,68.00,'2022-08-16','Hotel post wedding'),(290,21,114,25.00,'2022-08-17','Azelle Binka Supplies'),(291,21,101,1872.23,'2022-08-19','Direct Deposit'),(292,21,116,123.12,'2022-08-17','Dog food + Binka stuff'),(293,21,88,92.30,'2022-08-18','Tomo Sushi'),(294,21,89,5.65,'2022-08-19','Tselogs Pie'),(295,21,88,39.00,'2022-08-20','Ohgane Zelle to Mark'),(296,21,89,6.75,'2022-08-20','Sharetea Zelle Veeboy'),(297,21,97,22.31,'2022-08-20','Shell'),(298,21,98,5.99,'2022-08-20','Oreos'),(299,21,89,21.85,'2022-08-21','Dutch Hoes'),(300,21,89,5.25,'2022-08-21','Pit Stop'),(301,21,98,17.67,'2022-08-21','Luckys Burger Stuff'),(302,21,88,10.97,'2022-08-21','Jollibee'),(303,21,89,20.42,'2022-08-22','Aqua Club'),(304,21,88,19.10,'2022-08-23','Popeyes'),(305,21,88,12.48,'2022-08-23','Taco Bell'),(306,21,116,86.00,'2022-08-23','Binka Vet'),(307,21,116,184.00,'2022-08-23','Binka Vet 2'),(308,21,98,71.52,'2022-08-25','H Mart'),(309,21,115,8.79,'2022-08-25','Tower Tactics Steam'),(310,21,116,29.90,'2022-08-25','Dewormers'),(311,21,89,10.50,'2022-08-26','MTL'),(312,21,96,13.77,'2022-08-27','Walgreens Cocos wraps'),(313,21,116,42.82,'2022-08-27','Petsmart (cone, spray, treat)'),(314,21,93,8.54,'2022-08-27','Dog food topper Target'),(315,21,94,70.00,'2022-08-27','Bowling'),(316,21,88,64.66,'2022-08-28','Hashes and Brews'),(317,21,89,39.00,'2022-08-31','Coco3'),(318,21,114,30.00,'2022-08-28','Hashes Brew Payback'),(319,21,97,50.60,'2022-08-29','Shell'),(320,21,116,43.94,'2022-09-01','Dog bed'),(321,21,91,16.55,'2022-09-01','Optum Clothes'),(322,21,88,45.59,'2022-09-02','Wingstop'),(323,21,97,10.00,'2022-09-02','Clipper'),(324,21,89,9.35,'2022-09-03','85 pastry'),(325,21,91,152.08,'2022-09-03','Joji sweater '),(326,21,90,867.77,'2022-09-02','Germany Flight'),(327,21,101,1872.23,'2022-09-02','Payroll'),(328,21,89,9.15,'2022-09-06','85'),(329,21,116,9.40,'2022-09-06','Pet food topper at target'),(331,21,101,1872.21,'2022-09-16','Payroll'),(332,21,101,1872.23,'2022-09-30','Payroll'),(333,21,97,56.52,'2022-09-08','Speedway near house'),(334,21,116,7.48,'2022-09-08','Broth Topper'),(335,21,88,17.69,'2022-09-10','Mochi Donut Shop'),(336,21,90,260.74,'2022-09-11','Monos Suitcase'),(337,21,88,47.80,'2022-09-11','Pho'),(338,21,89,21.51,'2022-09-11','Genki'),(339,21,95,57.90,'2022-09-12','Ebay Camcorder'),(340,21,91,98.66,'2022-09-13','Uniqlo pants'),(341,21,91,109.88,'2022-09-13','Reebok sandals'),(342,21,94,35.00,'2022-09-13','Giants game'),(343,21,116,114.00,'2022-09-13','Binka vet'),(344,21,88,9.00,'2022-09-13','Giants water'),(345,21,88,15.25,'2022-09-13','Giants tenders + fries'),(346,21,88,19.00,'2022-09-13','Giants hot dog + fries'),(347,21,89,35.00,'2022-09-14','Coco3'),(348,21,89,27.05,'2022-09-15','Yifang'),(349,21,89,25.52,'2022-09-17','Pitstop'),(350,21,89,43.36,'2022-09-17','Dutch hoes'),(351,21,90,200.00,'2022-09-19','Euro zelle to ate'),(352,21,116,95.00,'2022-09-23','Binka cut'),(353,21,88,12.61,'2022-09-18','Naan n Curry'),(354,21,89,7.69,'2022-09-18','Auntie annes'),(355,21,88,26.21,'2022-09-18','Taco Bell'),(356,21,88,45.11,'2022-09-18','Super Duper'),(357,21,90,313.18,'2022-09-19','Germany car rental'),(358,21,89,28.50,'2022-09-19','Bobaville'),(359,21,88,1.09,'2022-09-20','Mcdo fries'),(360,21,88,13.13,'2022-09-20','Chipotle'),(361,21,92,16.25,'2022-09-20','Pet stuffed toys'),(362,21,116,76.90,'2022-09-21','Dog food'),(363,21,92,13.17,'2022-09-22','Camera battery'),(364,21,94,82.41,'2022-09-18','Camcorder (ebay)'),(365,21,89,13.35,'2022-09-22','PKow'),(366,21,92,25.26,'2022-09-23','Coco suit'),(367,21,88,170.44,'2022-09-24','Texas Roadhouse'),(368,21,92,21.76,'2022-09-25','Switch SD Card'),(369,21,89,7.60,'2022-09-25','Marco Polo'),(370,21,95,43.80,'2022-09-23','Camcorder tapes'),(371,21,90,10.00,'2022-09-26','SFO Parking'),(372,21,93,28.43,'2022-09-27','Fly trap'),(373,21,92,19.65,'2022-09-28','coax cable stuff'),(374,21,96,34.96,'2022-09-29','Home Depot boxes'),(375,21,88,14.04,'2022-09-29','Taco Bell'),(376,21,89,14.25,'2022-09-29','Happy Lemon'),(377,21,88,113.02,'2022-09-30','Mazra'),(379,21,96,40.00,'2022-10-01','Cash'),(380,21,102,48.56,'2022-09-29','Fake tats'),(381,21,101,1872.23,'2022-10-14','Payroll'),(382,21,101,1872.23,'2022-10-28','Payroll'),(383,21,102,2000.00,'2022-09-01','Couch'),(384,21,95,40.00,'2022-10-01','Cash'),(385,21,102,490.00,'2022-10-11','Ate Vacuum'),(386,21,88,10.99,'2022-10-02','Castro Pizza'),(387,21,88,31.19,'2022-10-02','Super Duper'),(388,21,88,25.72,'2022-10-02','Calamari MoM'),(389,21,89,80.00,'2022-10-02','Quicklys'),(390,21,88,14.05,'2022-10-03','Chick fil a'),(391,21,102,250.00,'2022-10-04','Cooking classes Azel'),(392,21,91,49.43,'2022-10-04','Old Navy Quarter Zip'),(393,21,91,82.31,'2022-10-04','Vans'),(394,21,88,18.10,'2022-10-05','McDo'),(395,21,91,43.74,'2022-10-05','Uniqlo'),(396,21,88,108.46,'2022-10-08','Hula Hoops (Mom)'),(397,21,93,10.94,'2022-10-08','TSA Lock (Target)'),(398,21,96,32.80,'2022-10-08','Best Buy Portable'),(399,21,88,17.40,'2022-10-09','Asian Box (Airport)'),(400,21,90,27.00,'2022-10-09','Seat Change'),(401,21,96,10.48,'2022-10-09','Airport water + candy'),(402,21,92,11.42,'2022-10-11','Light bulb'),(403,21,92,15.37,'2022-10-11','Jem hat'),(404,21,102,3.06,'2022-10-13','Chocolate museum'),(405,21,90,155.24,'2022-10-13','Vatican Museum'),(406,21,102,13.15,'2022-10-15','Vatican Puzzle'),(407,21,90,105.75,'2022-10-15','Nap Cab'),(408,21,92,19.72,'2022-10-06','Europe Plugs'),(409,21,92,19.58,'2022-10-06','socks (Azel)'),(410,21,97,57.65,'2022-10-09','Gas'),(411,21,88,13.73,'2022-10-16','Eataly (Italy airport)'),(412,21,96,3.53,'2022-10-16','airport water'),(413,21,88,9.03,'2022-10-17','Frankfurt bfast'),(414,21,102,21.94,'2022-10-18','Azel flowers'),(415,21,88,22.25,'2022-10-19','In n Out'),(416,21,98,127.29,'2022-10-19','MoM Nanay'),(417,21,89,6.00,'2022-10-19','Tpumps'),(418,21,98,20.88,'2022-10-20','Kukje (Soju)'),(419,21,98,10.72,'2022-10-21','Pacific Super (Kare Kare mix)'),(420,21,89,8.55,'2022-10-23','Tastea'),(421,21,88,22.10,'2022-10-23','Mochi Donut Shop'),(422,21,93,55.18,'2022-10-23','Walgreens'),(423,21,89,18.60,'2022-10-26','85 Bakery'),(424,21,102,64.80,'2022-10-27','Old Navy (Mari Gift)'),(425,21,88,8.78,'2022-10-28','Dominos'),(426,21,89,32.35,'2022-10-29','Tea It Up'),(427,21,88,14.37,'2022-10-29','7/11 taquitos'),(428,21,89,6.25,'2022-10-30','Teaspoon'),(429,21,97,25.00,'2022-10-21','Dad\'s car speedway'),(430,21,97,35.29,'2022-10-22','Speedway'),(431,21,88,34.00,'2022-10-24','Shabu shabu'),(432,21,115,69.99,'2022-11-01','Modern Warfare'),(433,21,92,152.73,'2022-11-03','Prime'),(434,21,98,30.75,'2022-11-04','Target Snacks'),(435,21,89,7.25,'2022-11-04','Happy Lemon'),(436,21,96,30.15,'2022-11-04','Walgreens Dad Meds'),(437,21,88,37.19,'2022-11-04','Chipotle'),(438,21,89,13.73,'2022-11-04','Nations Pies'),(439,21,94,16.00,'2022-11-06','Driving Range'),(440,21,88,49.44,'2022-11-06','Pho'),(441,21,92,43.93,'2022-11-07','Wire Holder + Screen Protector'),(442,21,97,53.98,'2022-11-04','Shell'),(443,21,114,20.00,'2022-11-07','Venmo from deknes');
/*!40000 ALTER TABLE `monthlybudget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dbtest','dbtest@mail.com','dbpass',0,'2021-07-27 22:21:14'),(5,'firstconnectiontest','firstconnect@mail.com','$2b$15$ow4oPgnJR.hPBV4grT4bCO4w0yVUkIWSIr3w9g2N8pXn4L.w3SSxy',0,'2021-07-27 22:50:06'),(6,'abc','abc@mail.com','$2b$15$SqRJf.0D.dLnI7db7s8d1uo31bgcIHp.Tbp/iRWedFlYbTVnpGf0.',0,'2021-07-27 22:53:03'),(7,'abcd','abcd@mail.com','$2b$15$sZm7wqUXtKKTnQGfrGzMxOEVmDNPmaoYjRzvYY1oVDjMSFH5F9KE2',0,'2021-07-28 23:19:06'),(10,'abcde','abcde@mail.com','$2b$15$L3zFsQhciwAf6eloEQE04uTUDC/KR2XFlUn7WnZqtopHFemZpy3hG',0,'2021-07-28 23:24:38'),(11,'testing','testing@ma.com','$2b$15$w8oCzkRSN/ivel0HVU4OSOZVfCXnniDu.1v5kuR.0hoR4xvR3TgXm',0,'2021-07-29 18:12:59'),(12,'basdfdijsfa','nathan@maicl.com','$2b$15$jazTZ/FPmaVN/WeCObilTe4UcHpQSvRjz4x4QoXno7AJNXduN16hu',0,'2021-12-19 18:42:02'),(13,'testes','nathan@mail.com','$2b$15$Siu7dgNbRBrsDyLSwWc6KO5sGOi6bZpavYgA1.6VZJbkNcEm8kYz2',0,'2021-12-19 18:42:43'),(14,'qwerty','qwerty@mail.com','$2b$15$ZMwFAbsFyf8dVPuBPvxyg.g/yeWsgv3bNGF8D7t8SdozE/.4q1M9i',0,'2021-12-24 23:05:04'),(15,'test12391','abc@mial.com','$2b$15$2ICCdTJdtkogV2OvFaNu1erwtVd153zg7QZI6bZVh3buEmIkcy/g6',0,'2022-01-03 04:46:24'),(16,'azed','aze@mail.com','$2b$15$z2Neagb27i1lGNt02df6aeZakdelV.mIBFLH.5l8xFC5wn1yG9V1S',0,'2022-01-03 05:12:48'),(17,'teste','abjih@mial.com','$2b$15$YJWcLNcX/gTWitb8pto8W.1w/ouEyhViVH9BIGvpZuqQQ8kwPSZDG',0,'2022-01-03 05:37:28'),(18,'stephenjusto24','stephenjusto24@gmail.com','$2b$15$p6wsLLOkjvWoY88g4EZHs.ZLL2HG48mqFs1GclqGxCe.XH7X0rgRG',0,'2022-01-04 18:19:36'),(19,'admin','admin@example.com','$2b$15$OrPK2x/SOBXLRrgaHnRKY.tpd1S.TM6lhtwLBe9vhe7sQCByk19nC',0,'2022-05-06 13:44:25'),(21,'nrduya','nathanielduya@yahoo.com','$2b$15$kfhKpgdVxHNKKKJ8e2dDkudSJrS0vxRw7NZk45I975e7qw2hBF1nG',0,'2022-06-09 04:26:07'),(23,'abd','abd@email.com','$2b$15$5vtWuMfU7Sy/sb8kMlqb0.lZpLzvlTAVv7whETfFjwccfLtdcy31q',0,'2022-07-06 06:05:15'),(24,'testnew','testen@mail.com','$2b$15$PULYmZriPfGgd7yYSP24lOtrLHEV9OXTy7t78BLMBtIK.gIafLL.2',0,'2022-07-22 22:44:01'),(25,'testing1','nat@mail.com','$2b$15$5cKgRrQ.kD2tYwNnyqgBS.FWZ1yQ/Ui7831lNVAAsWvjZnsiFZXNy',0,'2022-07-22 22:44:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-09 22:07:13
