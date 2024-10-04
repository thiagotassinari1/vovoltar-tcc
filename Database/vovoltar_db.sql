CREATE DATABASE vovoltar;
USE vovoltar;

select * from empresas;
select * from usuariospf;
select * from vagas;

CREATE TABLE usuariospf (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    nascimento VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ft_perfil VARCHAR(255),
	area_atuacao VARCHAR(255),
    sobre longtext,
    curriculo VARCHAR(255)
);

drop table vagas;
	
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
    qtd_vagas varchar(100) not null,
    descricao longtext,
	empresa_id INT,
    CONSTRAINT fk_empresa_vaga FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);