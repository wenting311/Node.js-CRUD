-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-01-10 09:36:35
-- 伺服器版本： 8.0.26
-- PHP 版本： 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `db01`
--

-- --------------------------------------------------------

--
-- 資料表結構 `admins`
--

CREATE TABLE `admins` (
  `sid` int NOT NULL,
  `account` varchar(10) NOT NULL,
  `pass_hash` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- 傾印資料表的資料 `admins`
--

INSERT INTO `admins` (`sid`, `account`, `pass_hash`, `created_at`) VALUES
(1, 'test', '$2a$10$HGDnv9an7eIanUYVujL3X.FrhJpWi5biyANakuJHbADV.XWdd1t2S', '2022-01-05 16:41:31');

-- --------------------------------------------------------

--
-- 資料表結構 `city`
--

CREATE TABLE `city` (
  `cityno` char(3) NOT NULL,
  `cname` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `city`
--

INSERT INTO `city` (`cityno`, `cname`) VALUES
('101', 'Taipei'),
('102', 'Taoyuan');

-- --------------------------------------------------------

--
-- 資料表結構 `department`
--

CREATE TABLE `department` (
  `deptno` decimal(3,0) NOT NULL,
  `dname` varchar(30) NOT NULL,
  `mgrno` decimal(4,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `department`
--

INSERT INTO `department` (`deptno`, `dname`, `mgrno`) VALUES
('100', 'IT', '1003'),
('200', 'Accounting', '1004'),
('300', 'Marketing', NULL),
('400', 'Research', '1001'),
('500', 'Personnel', '1001');

-- --------------------------------------------------------

--
-- 資料表結構 `dept`
--

CREATE TABLE `dept` (
  `deptno` decimal(3,0) NOT NULL,
  `dname` varchar(30) NOT NULL,
  `level` decimal(3,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `dept`
--

INSERT INTO `dept` (`deptno`, `dname`, `level`) VALUES
('1', '管理部', '0'),
('2', '會計部', '0'),
('3', '業務部', '0'),
('4', '製造部', '0'),
('5', '研發部', '0'),
('6', '品管部', '0'),
('7', '管理師', '1'),
('8', '管理部經理', '1'),
('9', '會計師', '2'),
('10', '會計部經理', '2'),
('11', '業務代表', '3'),
('12', '業務部經理', '3'),
('13', '技術員', '4'),
('14', '領班', '4'),
('15', '製造部經理', '4'),
('16', '研發工程師', '5'),
('17', '研發部經理', '5'),
('18', '製程設備工程師', '6'),
('19', '工程部經理', '6');

-- --------------------------------------------------------

--
-- 資料表結構 `emp`
--

CREATE TABLE `emp` (
  `empno` int NOT NULL,
  `ename` varchar(30) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `hiredate` date NOT NULL,
  `salary` int NOT NULL,
  `deptno` decimal(3,0) NOT NULL,
  `level` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `emp`
--

INSERT INTO `emp` (`empno`, `ename`, `mobile`, `email`, `hiredate`, `salary`, `deptno`, `level`) VALUES
(10001, '潘麗珍', '0918507221', 'a38963@test.com', '2010-11-10', 56000, '1', 'N1'),
(10002, '林麗如', '0914823054', 'a11410@test.com', '2008-03-22', 34000, '1', 'N2'),
(10003, '林建生', '0911969493', 'a23459@test.com', '2011-08-14', 77000, '2', 'C1'),
(10004, '吳美芳', '0912190165', 'a50971@test.com', '2005-04-04', 67000, '2', 'C2'),
(10005, '王小麗', '0910714117', 'a61468@test.com', '2012-12-12', 37000, '3', 'S1'),
(10006, '胡志強', '0911004465', 'a91498@test.com', '2007-07-06', 44000, '3', 'S2'),
(10007, '何偉生', '0914337832', 'a63397@test.com', '2003-09-11', 39000, '4', 'M1'),
(10012, '測試用', '0915650459', 'a78962@test.com', '2022-01-07', 50000, '4', 'M2'),
(10013, '測試用2', '0911298603', 'a98633@test.com', '2022-01-07', 50000, '4', 'M3'),
(10014, '測試用', '0913228928', 'a77344@test.com', '2022-01-07', 50000, '5', 'R1'),
(10015, '測試用4', '0912300646', 'a6111@test.com', '2022-01-10', 26000, '5', 'R2'),
(10016, '測試用', '0916826183', 'a37507@test.com', '2022-01-10', 26000, '6', 'E1'),
(10017, '測試用1', '0912345678', 'test123@test.com', '2022-01-10', 26000, '6', 'E2'),
(10018, '測試用1', '0912345678', 'test123@test.com', '2022-01-10', 26000, '4', 'M1');

-- --------------------------------------------------------

--
-- 資料表結構 `emp1`
--

CREATE TABLE `emp1` (
  `empno` decimal(4,0) NOT NULL,
  `ename` varchar(30) NOT NULL,
  `hiredate` date NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `deptno` decimal(3,0) NOT NULL,
  `title` varchar(20) NOT NULL DEFAULT 'engineer'
) ;

--
-- 傾印資料表的資料 `emp1`
--

INSERT INTO `emp1` (`empno`, `ename`, `hiredate`, `email`, `salary`, `deptno`, `title`) VALUES
('1001', 'David Ho', '2013-09-06', 'davidho@gmail.com', 35000, '200', 'engineer'),
('1003', 'Dave Ho', '2014-09-06', 'daveho11@gmail.com', 34000, '200', 'engineer');

-- --------------------------------------------------------

--
-- 資料表結構 `employee`
--

CREATE TABLE `employee` (
  `empno` decimal(4,0) NOT NULL,
  `ename` varchar(30) NOT NULL,
  `hiredate` date NOT NULL,
  `salary` int NOT NULL,
  `deptno` decimal(3,0) NOT NULL,
  `title` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `employee`
--

INSERT INTO `employee` (`empno`, `ename`, `hiredate`, `salary`, `deptno`, `title`) VALUES
('1001', '潘麗珍', '2010-11-10', 56000, '100', 'senior engineer'),
('1002', '林麗如', '2008-03-22', 34000, '100', 'engineer'),
('1003', '林建生', '2011-08-14', 77000, '200', 'manager'),
('1004', '吳美芳', '2005-04-04', 67000, '300', 'manager'),
('1005', '王小麗', '2012-12-12', 37000, '200', 'engineer'),
('1006', '胡志強', '2007-07-06', 44000, '300', 'senior engineer'),
('1007', '何偉生', '2003-09-11', 39000, '100', 'engineer'),
('1008', '林人生', '1999-05-16', 55000, '100', 'SA_REP'),
('1009', '孫悟空', '2013-11-10', 56000, '100', 'senior engineer'),
('1010', '李大文', '2021-12-01', 89000, '200', 'manager');

-- --------------------------------------------------------

--
-- 資料表結構 `emp_copy`
--

CREATE TABLE `emp_copy` (
  `empno` decimal(4,0) NOT NULL,
  `ename` varchar(30) NOT NULL,
  `hiredate` date NOT NULL,
  `salary` int NOT NULL,
  `deptno` decimal(3,0) NOT NULL,
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `emp_copy1`
--

CREATE TABLE `emp_copy1` (
  `empid` decimal(4,0) NOT NULL,
  `ename` varchar(30) NOT NULL,
  `deptno` decimal(3,0) NOT NULL,
  `hiredate` date NOT NULL,
  `salary` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `lv`
--

CREATE TABLE `lv` (
  `level` varchar(5) NOT NULL,
  `title` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `lv`
--

INSERT INTO `lv` (`level`, `title`) VALUES
('C1', '會計師'),
('C2', '會計部經理'),
('E1', '製程設備工程師'),
('E2', '工程部經理'),
('M1', '技術員'),
('M2', '領班'),
('M3', '製造部經理'),
('N1', '管理師'),
('N2', '管理部經理'),
('R1', '研發工程師'),
('R2', '研發部經理'),
('S1', '業務代表'),
('S2', '業務部經理');

-- --------------------------------------------------------

--
-- 資料表結構 `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-P6vW5c-0bD4vjHaJXOLBKCdhNGh9jdx', 1641805515, '{\"cookie\":{\"originalMaxAge\":1800000,\"expires\":\"2022-01-10T08:54:19.342Z\",\"httpOnly\":true,\"path\":\"/\"},\"admin\":\"test\"}');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `pass_hash` (`pass_hash`);

--
-- 資料表索引 `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`cityno`);

--
-- 資料表索引 `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`deptno`);

--
-- 資料表索引 `dept`
--
ALTER TABLE `dept`
  ADD PRIMARY KEY (`deptno`);

--
-- 資料表索引 `emp`
--
ALTER TABLE `emp`
  ADD PRIMARY KEY (`empno`);

--
-- 資料表索引 `emp1`
--
ALTER TABLE `emp1`
  ADD PRIMARY KEY (`empno`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `emp_deptno_fk` (`deptno`);

--
-- 資料表索引 `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`empno`);

--
-- 資料表索引 `emp_copy`
--
ALTER TABLE `emp_copy`
  ADD PRIMARY KEY (`empno`);

--
-- 資料表索引 `emp_copy1`
--
ALTER TABLE `emp_copy1`
  ADD PRIMARY KEY (`empid`);

--
-- 資料表索引 `lv`
--
ALTER TABLE `lv`
  ADD UNIQUE KEY `title` (`level`,`title`);

--
-- 資料表索引 `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `admins`
--
ALTER TABLE `admins`
  MODIFY `sid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `emp`
--
ALTER TABLE `emp`
  MODIFY `empno` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10019;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `emp1`
--
ALTER TABLE `emp1`
  ADD CONSTRAINT `emp_deptno_fk` FOREIGN KEY (`deptno`) REFERENCES `department` (`deptno`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
