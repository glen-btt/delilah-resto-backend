-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-09-2020 a las 01:27:02
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah-acamica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla de PLATOS
--

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `name` varchar(500) NOT NULL,
  `description` varchar(4500) NOT NULL,
  `price` double NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `requestedBy` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `platos``
--

INSERT INTO `platos` (`id`, `name`, `category`, `description`, `price`, `createdAt`, `updatedAt`, `requestedBy`) VALUES
(1, 'Hamburguesa Deliciosa', 'Hamburguesas', 'Hamburguesa completa con tomate, muzarella y huevo.', 100, '2020-09-11', '2020-09-11', 'string4'),
(2, 'Ensalada Premium', 'Ensaladaas', 'Ensalada coon muzarella, tomates secos, queso roquefort y rucula.', 200, '2020-09-11', '2020-09-11', 'string4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla ORDENES
--

CREATE TABLE `ordenes` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` date NOT NULL,
  `payment` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `address_user` varchar(100) NOT NULL,
  `phone_user` varchar(15) NOT NULL,
  `comments` varchar(4000) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_platos`
--

CREATE TABLE `ordenes_platos` (
  `id_order` int(11) NOT NULL,
  `id_dish` int(11) NOT NULL,
  `cant_dish` int(11) NOT NULL,
  `price_dish` double NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMIN', '2020-09-11', '2020-09-11'),
(2, 'USER', '2020-09-11', '2020-09-11');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla USUARIOS
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nick_name` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(11) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla USUARIOS
--

INSERT INTO `users` (`id`, `nick_name`, `name`, `last_name`, `email`, `phone`, `address`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMIN', 'admin', 'admin', 'admin@admin.com.ar', '2392', '123456', 'admin', 1, '2020-09-25', '2020-09-25');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla platos
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `ordenes_platos`
--
ALTER TABLE `ordenes_platos`
  ADD PRIMARY KEY (`id_order`,`id_dish`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NAME_ROLE` (`id`,`name`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniqueNickName` (`nick_name`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla PLATOS
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ORDENES`
--
ALTER TABLE `ordenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
