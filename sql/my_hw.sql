-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2023 at 03:14 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `my_hw`
--

CREATE TABLE `my_hw` (
  `id` int(11) NOT NULL,
  `name` char(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` int(11) DEFAULT NULL COMMENT '0:non or other, 1:male, 2:female',
  `address` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `my_hw`
--

INSERT INTO `my_hw` (`id`, `name`, `birthdate`, `gender`, `address`) VALUES
(1, 'Mizushima Misae', '1990-01-01', 2, ''),
(2, 'Yoshimura Nana', '1992-05-02', 2, ''),
(3, 'Takami Chika', '1995-08-01', 2, ''),
(4, 'Roy Bacardi', '1942-05-22', 1, ''),
(5, 'Robo Robo', '1984-02-09', 0, ''),
(6, 'Wang Lee', '1929-02-02', 1, ''),
(7, 'William Roanger', '1997-04-08', 2, ''),
(8, 'Aragaki Ayase', '1997-07-26', 2, ''),
(9, 'GLaDOS', '1956-08-09', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `my_hw`
--
ALTER TABLE `my_hw`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `my_hw`
--
ALTER TABLE `my_hw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
