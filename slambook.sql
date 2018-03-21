-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 21, 2018 at 02:04 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `slambook`
--
CREATE DATABASE IF NOT EXISTS `slambook` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `slambook`;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `qid` int(254) NOT NULL AUTO_INCREMENT,
  `questions` varchar(10000) NOT NULL,
  `private` varchar(30) NOT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`qid`, `questions`, `private`) VALUES
(31, 'dedefef', ''),
(32, 'fefefef', ''),
(33, 'efefefef', ''),
(34, 'fefef', ''),
(35, 'hello! your name?', 'true'),
(36, 'buddy', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `userquestions`
--

CREATE TABLE IF NOT EXISTS `userquestions` (
  `userid` varchar(20) NOT NULL,
  `qid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userquestions`
--

INSERT INTO `userquestions` (`userid`, `qid`) VALUES
('selva', '31'),
('selva', '33'),
('selva', '35'),
('selva', '36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Name` varchar(100) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Name`, `userid`, `Password`, `Email`) VALUES
('uouo', 'ou', 'uou', 'ou@fhfh'),
('selvaraj', 'selva', 'selva', 'aelks@cxc');

-- --------------------------------------------------------

--
-- Table structure for table `usersans`
--

CREATE TABLE IF NOT EXISTS `usersans` (
  `qid` varchar(100) NOT NULL,
  `userid` varchar(100) NOT NULL,
  `who` varchar(100) NOT NULL,
  `relatedby` varchar(100) NOT NULL,
  `ans` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usersans`
--

INSERT INTO `usersans` (`qid`, `userid`, `who`, `relatedby`, `ans`) VALUES
('31', 'selva', 'efefef', 'friend', 'fefef'),
('35', 'selva', 'efefef', 'friend', 'dedede'),
('33', 'selva', 'efefef', 'friend', 'deefe'),
('31', 'selva', 'fdf', 'friend', 'dfdfdd'),
('33', 'selva', 'fdf', 'friend', 'dfdf'),
('35', 'selva', 'fdf', 'friend', 'dfdfdf'),
('36', 'selva', 'fdf', 'friend', 'dfdfdf');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
