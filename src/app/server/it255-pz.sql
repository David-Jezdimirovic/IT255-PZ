-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2018 at 10:35 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it255-pz`
--
CREATE DATABASE IF NOT EXISTS `it255-pz` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `it255-pz`;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ime` varchar(20) DEFAULT NULL,
  `date1` date NOT NULL,
  `date2` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `room_id`, `user_id`, `ime`, `date1`, `date2`) VALUES
(38, 9, 22, 'm', '2018-06-06', '2018-06-07'),
(41, 1, 27, 'petar', '2018-08-15', '2018-08-25'),
(42, 7, 27, 'petar', '2018-07-19', '2018-07-23'),
(43, 1, 22, 'David', '2018-07-27', '2018-07-29'),
(44, 9, 27, 'petar', '2018-07-11', '2018-07-12'),
(45, 1, 27, 'petar', '2018-07-09', '2018-07-10'),
(46, 7, 22, 'david', '2018-07-14', '2018-07-18'),
(47, 7, 27, 'petar', '2018-04-05', '2018-05-14'),
(48, 7, 22, 'david', '2018-08-27', '2018-08-28'),
(49, 7, 22, 'david', '2018-08-20', '2018-08-22'),
(51, 11, 22, 'd', '2018-07-26', '2018-07-27'),
(52, 7, 22, 'd', '2018-07-04', '2018-07-05'),
(53, 7, 22, 'pera_detlic', '2018-08-29', '2018-08-30');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `broj` int(11) NOT NULL,
  `naziv` varchar(30) NOT NULL,
  `tv` tinyint(1) NOT NULL,
  `kvadrati` int(11) NOT NULL,
  `kreveti` int(11) NOT NULL,
  `room_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rooms_ibfk_1` (`room_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `broj`, `naziv`, `tv`, `kvadrati`, `kreveti`, `room_type_id`) VALUES
(1, 33, 'soba', 1, 34, 1, 4),
(7, 45, 'apartman', 1, 78, 4, 7),
(9, 114, 'apartman', 0, 89, 5, 4),
(11, 23, 'as', 1, 23, 23, 4);

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

CREATE TABLE IF NOT EXISTS `room_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`id`, `tip`) VALUES
(4, 'delux'),
(7, 'exlusiv'),
(10, 'ambijent');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `password`, `token`, `admin`) VALUES
(13, 'zegile', 'zxcvbnm', 'zegilex', '02c75fb22c75b23dc963c7eb91a062cc', 'd4953a27c0b72d87f822293cfedef0f3e34fe335', 0),
(22, 'david', 'jezdimirovic', 'david', '172522ec1028ab781d9dfd17eaca4427', '9916349a1cdc365470854e57d5667f0124044d47', 1),
(23, 'zikan', 'zikic', 'zikan', 'd07c80309ab133cb388aa6c6902a408e', '41ab3cb6e39c90cbdbf366f6f2b8817175cdc0a5', 0),
(27, 'petar', 'peric', 'petar', '597e3b12820151caa6062612caec8056', '978f785a64ec68f60a49fa69f1289485bef9c91c', 0),
(30, 'asdf', 'asdf', 'asdfg', '040b7cf4a55014e185813e0644502ea9', '3fe7941f92710b38e0e7864c17ba0cafa88aba30', 0),
(34, 'asdasd', 'asdasd', 'aaaaaaaaaaaa', '5d793fc5b00a2348c3fb9ab59e5ca98a', '1c44fdf7ca687c362e7f8f346f3587feb05650bd', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
