--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: administradores; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.administradores (
    id integer NOT NULL,
    nome character varying(50) NOT NULL,
    senha character varying(255) NOT NULL
);


ALTER TABLE public.administradores OWNER TO yfajfrbz;

--
-- Name: administradores_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.administradores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.administradores_id_seq OWNER TO yfajfrbz;

--
-- Name: administradores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.administradores_id_seq OWNED BY public.administradores.id;


--
-- Name: carrinho; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.carrinho (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    produto_id integer,
    usuario_id integer,
    quantidade integer NOT NULL,
    valor_total numeric(10,2) NOT NULL,
    custo_envio numeric(10,2) NOT NULL,
    tipo_envio character varying(10) NOT NULL,
    data timestamp without time zone DEFAULT now()
);


ALTER TABLE public.carrinho OWNER TO yfajfrbz;

--
-- Name: carrinho_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.carrinho_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carrinho_id_seq OWNER TO yfajfrbz;

--
-- Name: carrinho_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.carrinho_id_seq OWNED BY public.carrinho.id;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    descricao text NOT NULL
);


ALTER TABLE public.categorias OWNER TO yfajfrbz;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categorias_id_seq OWNER TO yfajfrbz;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: destaques; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.destaques (
    id integer NOT NULL,
    url text NOT NULL,
    descricao character varying(50)
);


ALTER TABLE public.destaques OWNER TO yfajfrbz;

--
-- Name: destaques_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.destaques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.destaques_id_seq OWNER TO yfajfrbz;

--
-- Name: destaques_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.destaques_id_seq OWNED BY public.destaques.id;


--
-- Name: entregas; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.entregas (
    id integer NOT NULL,
    usuario_id integer,
    rua character varying(100) NOT NULL,
    numero character varying(10) NOT NULL,
    complemento character varying(100),
    bairro character varying(100) NOT NULL,
    cidade character varying(100) NOT NULL,
    estado character(2) NOT NULL,
    cep character(8) NOT NULL
);


ALTER TABLE public.entregas OWNER TO yfajfrbz;

--
-- Name: entregas_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.entregas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entregas_id_seq OWNER TO yfajfrbz;

--
-- Name: entregas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.entregas_id_seq OWNED BY public.entregas.id;


--
-- Name: produtos; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.produtos (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao text NOT NULL,
    preco numeric(10,2) NOT NULL,
    subcategoria_id integer,
    categoria_id integer NOT NULL,
    quantidade integer NOT NULL,
    imagem text NOT NULL
);


ALTER TABLE public.produtos OWNER TO yfajfrbz;

--
-- Name: produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.produtos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produtos_id_seq OWNER TO yfajfrbz;

--
-- Name: produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.produtos_id_seq OWNED BY public.produtos.id;


--
-- Name: subcategorias; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.subcategorias (
    id integer NOT NULL,
    descricao character varying(100) NOT NULL,
    categoria_id integer
);


ALTER TABLE public.subcategorias OWNER TO yfajfrbz;

--
-- Name: subcategorias_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.subcategorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategorias_id_seq OWNER TO yfajfrbz;

--
-- Name: subcategorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.subcategorias_id_seq OWNED BY public.subcategorias.id;


--
-- Name: transacoes; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.transacoes (
    id integer NOT NULL,
    usuario_id integer,
    produto_id integer,
    quantidade integer NOT NULL,
    valor_total numeric(12,2) NOT NULL,
    custo_envio numeric(12,2) NOT NULL,
    tipo_envio character varying(10) NOT NULL,
    data timestamp without time zone DEFAULT now(),
    nome character varying(100),
    imagem text
);


ALTER TABLE public.transacoes OWNER TO yfajfrbz;

--
-- Name: transacoes_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.transacoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transacoes_id_seq OWNER TO yfajfrbz;

--
-- Name: transacoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.transacoes_id_seq OWNED BY public.transacoes.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: yfajfrbz
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha text NOT NULL,
    cpf character varying(11),
    data_nascimento date,
    telefone character varying(11),
    logradouro character varying(100),
    numero character varying(10),
    complemento character varying(100),
    bairro character varying(100),
    cidade character varying(100),
    estado character(2),
    cep character(8)
);


ALTER TABLE public.usuarios OWNER TO yfajfrbz;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: yfajfrbz
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO yfajfrbz;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yfajfrbz
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: administradores id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.administradores ALTER COLUMN id SET DEFAULT nextval('public.administradores_id_seq'::regclass);


--
-- Name: carrinho id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.carrinho ALTER COLUMN id SET DEFAULT nextval('public.carrinho_id_seq'::regclass);


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: destaques id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.destaques ALTER COLUMN id SET DEFAULT nextval('public.destaques_id_seq'::regclass);


--
-- Name: entregas id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.entregas ALTER COLUMN id SET DEFAULT nextval('public.entregas_id_seq'::regclass);


--
-- Name: produtos id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id SET DEFAULT nextval('public.produtos_id_seq'::regclass);


--
-- Name: subcategorias id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.subcategorias ALTER COLUMN id SET DEFAULT nextval('public.subcategorias_id_seq'::regclass);


--
-- Name: transacoes id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.transacoes ALTER COLUMN id SET DEFAULT nextval('public.transacoes_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: administradores; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.administradores (id, nome, senha) FROM stdin;
\.


--
-- Data for Name: carrinho; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.carrinho (id, nome, produto_id, usuario_id, quantidade, valor_total, custo_envio, tipo_envio, data) FROM stdin;
\.


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.categorias (id, descricao) FROM stdin;
1	Vestuário
2	Calçados
3	Acessórios
4	Beleza
\.


--
-- Data for Name: destaques; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.destaques (id, url, descricao) FROM stdin;
1	https://epocacosmeticos.vteximg.com.br/arquivos/ids/531250/FullBannercategoriamobile.png?v=638097296376370000	Kit Natura
2	https://fragrance.vteximg.com.br/arquivos/ids/158912/banner-DESKTOP-1260X410-fame-mulher-1.jpg?v=638138792299270000	Kit Natura
3	https://www.perfumesecompanhia.pt/dw/image/v2/BGXV_PRD/on/demandware.static/-/Sites-PC-Library/default/dwf4081989/images/clp/video/fame-video-thumbnail-clp-desktop.jpg?sw=1400	Kit Natura
4	https://distribuidoraparis.com.br/wp-content/uploads/2019/06/perfumes-banner-importados-2.jpg	Kit Natura
\.


--
-- Data for Name: entregas; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.entregas (id, usuario_id, rua, numero, complemento, bairro, cidade, estado, cep) FROM stdin;
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.produtos (id, nome, descricao, preco, subcategoria_id, categoria_id, quantidade, imagem) FROM stdin;
137	Vestido Longo	Vestido longo preto para festas	249.99	1	1	10	https://img.ltwebstatic.com/gspCenter/goodsImage/2022/10/30/8028119953_1022351/41F2BE5AED08F8F7C0D4BD42BEC046A5_thumbnail_600x.jpg
138	Camiseta	Camiseta básica branca	29.99	2	1	10	https://img.ltwebstatic.com/gspCenter/goodsImage/2022/10/30/8028119953_1022351/41F2BE5AED08F8F7C0D4BD42BEC046A5_thumbnail_600x.jpg
139	Malbec Absoluto	Perfume masculino com notas amadeiradas e toque de bergamota e pimenta rosa	199.99	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
140	Make B. Eau de Parfum	Perfume feminino com notas florais de rosa e peônia, e toque de baunilha e musk	159.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
141	Lily	Perfume feminino com notas de lírio e jasmim, e toque de baunilha e musk	239.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
142	Coffee Man	Perfume masculino com notas de café, especiarias e madeiras	119.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
143	Kriska	Perfume feminino com notas de frutas vermelhas e flores brancas, e toque de baunilha e musk	79.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
144	Quasar Evolution	Perfume masculino com notas de menta, limão e musk	109.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
145	Essencial Oud	Perfume masculino com notas amadeiradas de oud e sândalo, e toque de pimenta rosa	289.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
146	Humor da Minha Vida	Perfume feminino com notas de mandarina, damasco e musk	99.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
147	Cuide-se Bem Jardim de Sol	Perfume feminino com notas florais de jasmim, gardênia e frésia	79.90	4	4	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
148	Tênis	Tênis para corrida	179.99	3	2	10	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
149	Relógio Invicta Pro Diver	Relógio masculino à prova d\\ água com pulseira de aço inoxidável	1299.99	3	3	5	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
150	Relógio Invicta Pro Diver 2	Relógio masculino à prova d\\ água com pulseira de couro marrom	999.99	3	3	5	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
151	Relógio Invicta Angel	Relógio feminino com caixa e pulseira de aço inoxidável	899.99	3	3	5	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
152	Relógio Invicta Angel 2	Relógio feminino com caixa e pulseira de couro branca	749.99	3	3	5	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
\.


--
-- Data for Name: subcategorias; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.subcategorias (id, descricao, categoria_id) FROM stdin;
1	Feminino	1
2	Masculino	1
3	Infantil	1
4	Esportivo	1
5	Sapatilhas	2
6	Sandálias	2
7	Botas	2
8	Bolsas	3
9	Óculos de sol	3
10	Relógios	3
11	Cabelos	4
12	Maquiagem	4
13	Fragrâncias	4
\.


--
-- Data for Name: transacoes; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.transacoes (id, usuario_id, produto_id, quantidade, valor_total, custo_envio, tipo_envio, data, nome, imagem) FROM stdin;
62	1	152	1	749.99	1.00	correios	2023-04-11 02:52:57.792767	Relógio Invicta Angel 2	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
37	1	150	8	999.99	1.00	correios	2023-04-07 14:15:29.007024	Relógio Invicta Pro Diver 2	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
41	2	150	8	999.99	1.00	correios	2023-04-07 14:54:12.670685	Relógio Invicta Pro Diver 2	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
63	1	148	1	179.99	1.00	correios	2023-04-11 16:12:12.822415	Tênis	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
56	1	141	1	239.90	1.00	correios	2023-04-09 03:33:15.982946	Lily	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
57	1	143	1	79.90	1.00	correios	2023-04-09 03:33:17.522812	Kriska	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
58	1	145	1	289.90	1.00	correios	2023-04-09 03:33:19.408779	Essencial Oud	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
59	1	146	1	99.90	1.00	correios	2023-04-09 03:33:21.323849	Humor da Minha Vida	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
60	1	147	1	79.90	1.00	correios	2023-04-09 03:33:22.941951	Cuide-se Bem Jardim de Sol	https://images-americanas.b2w.io/produtos/5098863751/imagens/kit-presente-perfume-masculino-natura-homem-essence-100ml-sabonete-liquido-100ml-deo-corporal-100ml-natura/5098863751_1_large.jpg
61	1	137	6	249.99	1.00	correios	2023-04-10 18:20:17.137968	Vestido Longo	https://img.ltwebstatic.com/gspCenter/goodsImage/2022/10/30/8028119953_1022351/41F2BE5AED08F8F7C0D4BD42BEC046A5_thumbnail_600x.jpg
55	1	149	15	1299.99	1.00	correios	2023-04-08 05:22:34.144716	Relógio Invicta Pro Diver	https://carrefourbr.vtexassets.com/arquivos/ids/88646350/92aefa754ca7492d8f99cc92e4a32483.jpg?v=638059243534070000
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: yfajfrbz
--

COPY public.usuarios (id, nome, email, senha, cpf, data_nascimento, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep) FROM stdin;
1	Marcus Roza	mavirolero@gmail.com	$2b$10$HbuFIUiFPCXYmcVX7nMmP.mDhZSGUwjwXUbjj6iztLrDOYaQJmoM.	13722354773	1990-05-12	21964642376	Rua: Java	502	L3 Q1	jardim anhanga	Duque de Caxias	RJ	25264253
2	teste	teste@teste.com	$2b$10$/l7wltDoodJTasqtSg3mquFstUzXAwqIsPIo0uQzcqU5/RYychDZ6	13722354774	2012-12-12	21964642376	Java	1	1	jardim anhanga	Duque de Caxias	AC	25264253
3	Caio Graco	caio@teste.com	$2b$10$VFK04AY8Q1.NvBw00k4Reejrvy.3skXuwGYXRcOBVEmsN6PJ/GaMq	13722354773	1991-10-24	21964642376	Java	1	5	jardim anhanga	Duque de Caxias	AC	25264253
4	a	a@a.com	$2b$10$f9g0ic5Mc5qviOLDaDBE9eJJC2qTj8OL.hORvixbap8fdEQHkdRAq	13679642883	1991-05-12	21964642376	Rua: Java	56	5	jardim anhanga	Duque de Caxias	RJ	25000000
5	Marcus Vinicius Rodrigues Leandro da Roza	mavirolero1@gmail.com	$2b$10$Bx/aXPquYZEycgFjmeYqWe4pfPACze3SVYtrv1OAxiD5evcp9CB1e	13679642885	1990-05-12	21964642376	Java	5	5	Duque de Caxias	Duque de Caxias	RJ	25264253
\.


--
-- Name: administradores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.administradores_id_seq', 1, false);


--
-- Name: carrinho_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.carrinho_id_seq', 1, false);


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.categorias_id_seq', 4, true);


--
-- Name: destaques_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.destaques_id_seq', 35, true);


--
-- Name: entregas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.entregas_id_seq', 1, false);


--
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.produtos_id_seq', 152, true);


--
-- Name: subcategorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.subcategorias_id_seq', 13, true);


--
-- Name: transacoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.transacoes_id_seq', 63, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yfajfrbz
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);


--
-- Name: administradores administradores_nome_key; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.administradores
    ADD CONSTRAINT administradores_nome_key UNIQUE (nome);


--
-- Name: administradores administradores_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.administradores
    ADD CONSTRAINT administradores_pkey PRIMARY KEY (id);


--
-- Name: carrinho carrinho_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.carrinho
    ADD CONSTRAINT carrinho_pkey PRIMARY KEY (id);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: destaques destaques_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.destaques
    ADD CONSTRAINT destaques_pkey PRIMARY KEY (id);


--
-- Name: entregas entregas_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.entregas
    ADD CONSTRAINT entregas_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- Name: subcategorias subcategorias_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_pkey PRIMARY KEY (id);


--
-- Name: transacoes transacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT transacoes_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: carrinho carrinho_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.carrinho
    ADD CONSTRAINT carrinho_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id);


--
-- Name: carrinho carrinho_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.carrinho
    ADD CONSTRAINT carrinho_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: entregas entregas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.entregas
    ADD CONSTRAINT entregas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: produtos produtos_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);


--
-- Name: produtos produtos_subcategoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_subcategoria_id_fkey FOREIGN KEY (subcategoria_id) REFERENCES public.subcategorias(id);


--
-- Name: subcategorias subcategorias_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) ON DELETE CASCADE;


--
-- Name: transacoes transacoes_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT transacoes_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id);


--
-- Name: transacoes transacoes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yfajfrbz
--

ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT transacoes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--

