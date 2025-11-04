-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sigita
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sigita
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sigita` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `sigita` ;

-- -----------------------------------------------------
-- Table `sigita`.`categoría`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigita`.`categoría` (
  `idcategoría` INT NOT NULL,
  `nombre_categoria` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idcategoría`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sigita`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigita`.`producto` (
  `idproducto` INT NOT NULL,
  `SKU` VARCHAR(100) NOT NULL,
  `nombre_producto` VARCHAR(200) NOT NULL,
  `unidades` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  `stock_minimo` INT(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  INDEX `fk_categoria_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `sigita`.`categoría` (`idcategoría`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sigita`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigita`.`usuario` (
  `idusuario` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `rol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `sigita`.`movimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sigita`.`movimiento` (
  `idmovimiento` INT NOT NULL,
  `tipo_movimiento` VARCHAR(45) NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `fecha` TIMESTAMP NOT NULL,
  `id_usuario` INT NOT NULL,
  `nota` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idmovimiento`),
  INDEX `fk_usuario_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_producto_idx` (`id_producto` ASC) VISIBLE,
  INDEX `idx_movimiento_producto_fecha` (`id_producto` ASC, `fecha` ASC) VISIBLE,
  CONSTRAINT `fk_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `sigita`.`producto` (`idproducto`),
  CONSTRAINT `fk_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `sigita`.`usuario` (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
