# Rotas de Usuários

## Cadastro de Usuário
Rota: /usuario

Método: POST

Função: Cadastrar um novo usuário no sistema

```   
{               
  "nome": "Marcus Roza",
  "email": "teste@teste.com",
  "senha":"153624",
  "cpf": 11122233345,
  "data_nascimento": "1990-05-12",
  "telefone": "21964642376",
  "logradouro": "rua javascript",
  "numero": 1,
  "complemento":"casa 1",
  "bairro": "jardim 25 de agosto",
  "cidade":"duque de caxias",
  "estado": "RJ",
  "cep": "25000000"
}
```


## Login de Usuário

 Rota: /login 

 Método: POST 

 Função: Realizar o login de um usuário já cadastrado 

```
{
   "email": "teste@teste.com",
   "senha": "153624"
}
```

## Alteração de Cadastro de Usuário
Rota: /usuario/:id/editar
Método: PUT
Função: Alterar o cadastro de um usuário específico pelo seu ID

## Extrato de Transações por Usuário
Rota: /transacao/extrato
Método: GET
Função: Listar o extrato de transações de um usuário

## Detalhamento de Transação por ID
Rota: /transacao/:id
Método: GET
Função: Detalhar uma transação específica pelo seu ID

## Cadastro de Transação
Rota: /transacao
Método: POST
Função: Cadastrar uma nova transação

## Atualização de Transação por ID
Rota: /transacao/:id
Método: PUT
Função: Alterar os dados de uma transação específica pelo seu ID

## Exclusão de Transação por ID
Rota: /transacao/:id
Método: DELETE

## Função: Excluir uma transação específica pelo seu ID
Rotas de Produtos

## Listagem de Produtos
``https://relicario-backend.herokuapp.com/produtos/``

Rota: /produtos

Método: GET

Função: Listar todos os produtos disponíveis

```
[
 {
  "id": 137,
  "nome": "Vestido Longo",
  "descricao": "Vestido longo preto para festas",
  "preco": "249.99",
  "subcategoria_id": 1,
  "categoria_id": 1,
  "quantidade": 10,
  "imagem": "https://img.ltwebstatic.com/gspCenter/goodsImage/2022/10/30/8028119953_1022351/41F2BE5AED08F8F7C0D4BD42BEC046A5_thumbnail_600x.jpg",
  "subcategoria_nome": "Feminino",
  "categoria_nome": "Vestuário"
 }
]
```

## Listagem de Produtos Destaque

Rota: /destaques

Método: GET

Função: Listar todos os produtos em destaque

```
[
 {
  "id": 1,
  "url": "https://epocacosmeticos.vteximg.com.br/arquivos/ids/531250/FullBannercategoriamobile.png?v=638097296376370000",
  "descricao": "Kit Natura"
 },
 {
  "id": 2,
  "url": "https://fragrance.vteximg.com.br/arquivos/ids/158912/banner-DESKTOP-1260X410-fame-mulher-1.jpg?v=638138792299270000",
  "descricao": "Kit Natura"
 },
 {
  "id": 3,
  "url": "https://www.perfumesecompanhia.pt/dw/image/v2/BGXV_PRD/on/demandware.static/-/Sites-PC-Library/default/dwf4081989/images/clp/video/fame-video-thumbnail-clp-desktop.jpg?sw=1400",
  "descricao": "Kit Natura"
 },
 {
  "id": 4,
  "url": "https://distribuidoraparis.com.br/wp-content/uploads/2019/06/perfumes-banner-importados-2.jpg",
  "descricao": "Kit Natura"
 }
]
```

## Listagem de Categorias
Rota: /categorias
Método: GET
Função: Listar todas as categorias disponíveis
