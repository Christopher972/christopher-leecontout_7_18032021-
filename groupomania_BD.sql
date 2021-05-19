CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

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

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Contout','Christopher-Lee','contout.christopher@hotmail.fr','$2b$10$ki/AF2klovRSzfSQ/D97uePt2ZveXzUTGExJ8vKcwiox.IhQ48AD2','http://localhost:3000/images/téléchargement_(1).jpg1619952913162.jpg',0),(2,'Ersin','Marie-Thérèse','ersin.marietherese@hotmail.fr','$2b$10$sbX3XvRIw4Yo3LAahB3WFeT1RZY01cPscThLXm1bp.wvWfTZ6kA4W','http://localhost:3000/images/4.jpg1619964698887.jpg',0),(3,'Contout','Paul','contout.paul@hotmail.fr','$2b$10$3uvXjhWAgnAycAReD.tcg.hRsN//8gZg4B1RBr6x4aBWCzkqTO29W',NULL,0),(4,'Ersin','Karl','contout.karl@hotmail.fr','$2b$10$LmHvxHIIt7OuOyYv306tde3WlFXCeRYgRZJOEmruSiweY9sEPCSD.',NULL,0),(5,'Vaast','Aurélien','vaast.aurélien@hotmail.fr','$2b$10$AMCmblYzRHPIYeYphZPQDeS3wciEsVULa0.RxWuC2Ta06QxoRhok2','http://localhost:3000/images/depositphotos_378351798-stock-photo-working-studing-in-ones-own.jpg1619868213866.jpg',0),(19,'Gerault','Thomas','gerault.thomas@hotmail.fr','$2b$10$ifnub6fotM1goRhEtBSqnuj1QxDYHwxewA5J/wV.73DGJ64.rqJfO','http://localhost:3000/images/Zen-du-travail.jpg1620458160380.jpg',0),(45,'ersin','dimitri','ersin.dimitri@hotmail.fr','$2b$10$b9SZy5z/wQGGQZAezQbQIePXHmV4Xs/jzQqs.2Kq2UprlTxLxU.h.',NULL,0),(48,'Communication','Chargé ','charge.communication@hotmail.fr','$2b$10$9QDmx4GEU9yBquvNgixuUeL5XxXaMzCZRl66RIMmbmT8vrLd6q0uu','http://localhost:3000/images/admin.jpg1620105803832.jpg',1);
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

-- Dump completed on 2021-05-19 11:12:04

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  `title` varchar(150) NOT NULL,
  `postContent` text NOT NULL,
  `postArticle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_userId` (`userId`),
  CONSTRAINT `fk_post_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `postId` int unsigned NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comContent` text NOT NULL,
  `comArticle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_userId` (`userId`),
  KEY `fk_comments_postId` (`postId`),
  CONSTRAINT `fk_comments_postId` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (25,5,39,'2021-05-01 12:33:51','Hahahaha...\nHello Thomas, publication sympathique et véridique, hormis dans notre secteur d\'activité !!! Mdrrr',NULL),(27,2,39,'2021-05-01 13:10:06','Hello les Guys, effectivement Aurélien tu as raison. \nNous pourrions manifester Mdrrrr','http://localhost:3000/images/200501-1-mai-confinement-mutio-full.jpg1619867406326.jpg'),(32,1,39,'2021-05-01 13:27:14','Hello EveryBody... \nAttention tout de même Mdrrr','http://localhost:3000/images/234.jpg1619868434088.jpg'),(38,19,50,'2021-05-03 08:54:15','hahahaha.... Je te reconnais bien là Marie-Thérèse mdrrrrr ',NULL),(39,5,50,'2021-05-03 08:59:39','Salut tout le monde, excellent Marie-thérèse, \nbizarrement j\'imagine l\'arrière plan de ta publication comme cela mdrrr','http://localhost:3000/images/Capture-d’écran-2020-03-21-à-15.45.23.png1620025179229.png'),(40,2,50,'2021-05-03 09:02:58','Vous n\'êtes pas mignon avec moi les guys mdrrrrrrrr... Bon lundi et avec le sourire svp ',NULL),(41,1,51,'2021-05-03 09:10:38','Et les patrons se permettent de douter de nos performances et surtout de notre investissement, cette réplique est juste magique mdrrr ','http://localhost:3000/images/21-2-teletravail-glandouille-2.jpg1620025838256.jpg');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-19 11:12:04