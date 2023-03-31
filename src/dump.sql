--drop database relicario;
--create database relicario;
--drop table  usuarios;

CREATE  TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    cpf VARCHAR(11),
    data_nascimento DATE,
    telefone VARCHAR(11),
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado CHAR(2),
    cep CHAR(8)
);

CREATE  TABLE administradores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE  TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE  TABLE subcategorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id)
);

CREATE  TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    subcategoria_id INTEGER REFERENCES subcategorias(id),
    categoria_id integer not null,
    quantidade INTEGER NOT NULL
);

CREATE  TABLE entregas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL
);

CREATE  TABLE transacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    produto_id INTEGER REFERENCES produtos(id),
    quantidade INTEGER NOT NULL,
    valor_total NUMERIC(10,2) NOT NULL,
    custo_envio NUMERIC(10,2) NOT NULL,
    tipo_envio VARCHAR(10) NOT NULL,
    data TIMESTAMP DEFAULT NOW()
);

INSERT INTO categorias (descricao)
VALUES ('Vestuário'), ('Calçados'), ('Acessórios'), ('Beleza');

INSERT INTO subcategorias (descricao, categoria_id)
VALUES 
    ('Feminino', 1), ('Masculino', 1), ('Infantil', 1), ('Esportivo', 1),
    ('Sapatilhas', 2), ('Sandálias', 2), ('Botas', 2),
    ('Bolsas', 3), ('Óculos de sol', 3), ('Relógios', 3),
    ('Cabelos', 4), ('Maquiagem', 4), ('Fragrâncias', 4);

INSERT INTO produtos (nome, descricao, preco, subcategoria_id, quantidade, categoria_id,imagem)
VALUES
    ('Vestido Longo', 'Vestido longo preto para festas', 249.99, 1, 10, 1,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Camiseta', 'Camiseta básica branca', 29.99, 2, 10, 2,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Tênis', 'Tênis para corrida', 179.99, 2, 10, 3,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Malbec Absoluto', 'Perfume masculino com notas amadeiradas e toque de bergamota e pimenta rosa', 199.99, 13, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Make B. Eau de Parfum', 'Perfume feminino com notas florais de rosa e peônia, e toque de baunilha e musk', 159.90, 11, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Lily', 'Perfume feminino com notas de lírio e jasmim, e toque de baunilha e musk', 239.90, 11, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Coffee Man', 'Perfume masculino com notas de café, especiarias e madeiras', 119.90, 13, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Kriska', 'Perfume feminino com notas de frutas vermelhas e flores brancas, e toque de baunilha e musk', 79.90, 11, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Quasar Evolution', 'Perfume masculino com notas de menta, limão e musk', 109.90, 13, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Essencial Oud', 'Perfume masculino com notas amadeiradas de oud e sândalo, e toque de pimenta rosa', 289.90, 13, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Humor da Minha Vida', 'Perfume feminino com notas de mandarina, damasco e musk', 99.90, 11, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg'),
    ('Cuide-se Bem Jardim de Sol', 'Perfume feminino com notas florais de jasmim, gardênia e frésia', 79.90, 11, 10, 4,'https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg');

INSERT INTO destaques (url,descricao) values
    ('https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg','Kit Natura')
    ('https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg','Kit Natura')
    ('https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg','Kit Natura')
    ('https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg','Kit Natura')
    ('https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg','Kit Natura')

    --drop database relicario;
--create database relicario;

DROP TABLE IF EXISTS carrinho;
DROP TABLE IF EXISTS transacoes;
DROP TABLE IF EXISTS entregas;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS subcategorias;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS administradores;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha TEXT NOT NULL,
cpf VARCHAR(11),
data_nascimento DATE,
telefone VARCHAR(11),
logradouro VARCHAR(100),
numero VARCHAR(10),
complemento VARCHAR(100),
bairro VARCHAR(100),
cidade VARCHAR(100),
estado CHAR(2),
cep CHAR(8)
);

CREATE TABLE IF NOT EXISTS administradores (
id SERIAL PRIMARY KEY,
nome VARCHAR(50) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
id SERIAL PRIMARY KEY,
descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS subcategorias (
id SERIAL PRIMARY KEY,
descricao VARCHAR(100) NOT NULL,
categoria_id INTEGER REFERENCES categorias (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS produtos (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
descricao TEXT NOT NULL,
preco NUMERIC(10,2) NOT NULL,
subcategoria_id INTEGER REFERENCES subcategorias (id),
categoria_id INTEGER NOT NULL REFERENCES categorias (id),
quantidade INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS entregas (
id SERIAL PRIMARY KEY,
usuario_id INTEGER REFERENCES usuarios (id),
rua VARCHAR(100) NOT NULL,
numero VARCHAR(10) NOT NULL,
complemento VARCHAR(100),
bairro VARCHAR(100) NOT NULL,
cidade VARCHAR(100) NOT NULL,
estado CHAR(2) NOT NULL,
cep CHAR(8) NOT NULL
);

CREATE TABLE IF NOT EXISTS transacoes (
id SERIAL PRIMARY KEY,
usuario_id INTEGER REFERENCES usuarios (id),
produto_id INTEGER REFERENCES produtos (id),
quantidade INTEGER NOT NULL,
valor_total NUMERIC(10,2) NOT NULL,
custo_envio NUMERIC(10,2) NOT NULL,
tipo_envio VARCHAR(10) NOT NULL,
data TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS carrinho (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
produto_id INTEGER REFERENCES produtos (id),
usuario_id INTEGER REFERENCES usuarios (id),
quantidade INTEGER NOT NULL,
valor_total NUMERIC(10,2) NOT NULL,
custo_envio NUMERIC(10,2) NOT NULL,
tipo_envio VARCHAR(10) NOT NULL,
data TIMESTAMP DEFAULT NOW()
);