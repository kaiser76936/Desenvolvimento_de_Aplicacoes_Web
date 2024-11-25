# Project Overview
Este projeto é um servidor REST API para gerenciar produtos, usuários e pedidos. Utiliza Express.js para criar as rotas da API, NeDB como banco de dados leve e TypeScript para garantir segurança de tipos.

## Estrutura de Arquivos

### src/api/orderController.ts
Gerencia as operações CRUD para pedidos. Fornece endpoints para recuperar todos os pedidos, recuperar um pedido específico por ID, criar e remover pedidos. Utiliza o `orderDB` da base de dados para interagir com os dados de pedidos.

### src/api/productController.ts
Gerencia as operações CRUD para produtos. Fornece endpoints para recuperar todos os produtos, recuperar um produto específico por ID, criar e remover produtos. Utiliza o `productDB` da base de dados para interagir com os dados de produtos.

### src/api/userController.ts
Gerencia as operações CRUD para users. Fornece endpoints para recuperar todos os users e recuperar um user específico via ID. Utiliza o `userDB` da base de dados para interagir com os dados de users.

### src/models/order.ts
Define a interface `Order` que representa um pedido na aplicação. Assegura estrutura uniforme para objetos de pedido, facilitando a manipulação e gerenciamento dos dados.

### src/models/product.ts
Define a interface `Product` que representa um produto disponível na aplicação. Assegura estrutura uniforme para objetos de produto, promovendo segurança de tipos.

### src/models/user.ts
Define a interface `User` que representa um user da aplicação. Garante estrutura consistente para objetos de user, permitindo segurança de tipos e integridade dos dados.

### src/tests/database.test.ts
Contém unit tests para operações de banco de dados, garantindo que as funções manipulam dados corretamente.

### src/tests/insertOrders.js
Script de teste para inserir dados na base de dados `orders.db`.

### src/tests/insertProducts.js
Script de teste para inserir dados na base de dados `products.db`.

### src/tests/insertUsers.js
Script de teste para inserir dados na base de dados `users.db`.

### src/utils/database.ts
Define e inicializa instâncias do NeDB para produtos, users e pedidos. Inclui funções para adicionar, remover e obter IDs únicos.

### src/utils/logger.ts
Contém funções para registro de logs e erros na aplicação, facilitando depuração e acompanhamento de eventos.

### src/utils/validator.ts
Fornece funções de validação para garantir integridade e formato correto dos dados, como `isEmail` e `isPositiveNumber`.

### src/main.ts
Ponto de entrada da aplicação. Carrega configurações do servidor e inicia o servidor ouvindo no host e porta especificados.

### src/server.ts
Configura o servidor Express, incluindo middleware para análise de requisições JSON e definição das rotas da API.

### src/serverInfo.ts
Fornece metadados do servidor, como nome, versão e descrição da API. Utilizado nas configurações e documentação do servidor.

### data/products.db
Base de dados NeDB para armazenar dados dos produtos.

### data/users.db
Base de dados NeDB para armazenar dados dos users.

### data/orders.db
Base de dados NeDB para armazenar dados dos pedidos.