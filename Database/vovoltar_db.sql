CREATE DATABASE vovoltar;

USE vovoltar;

CREATE TABLE usuariospf (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    nascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ft_perfil VARCHAR(255)
);

CREATE TABLE empresas (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cnpj VARCHAR(255) UNIQUE NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ft_perfil VARCHAR(255)
);

create table vagas (
	id int primary key auto_increment,
    area varchar(255) not null,
    email_empresa varchar(255) not null,
    cidade varchar(255) not null,
    estado varchar(255) not null,
    qtd_vagas varchar(100) not null
);

select * from empresas;
select * from vagas;
select * from usuariospf;