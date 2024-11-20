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
Define a interface `Order` que representa um pedido na app. Esta interface assegura que todos os objetos do pedido mantenham uma estrutura uniforme, facilitando a manipulação e o gerenciamento dos dados de pedidos.

### src/models/product.ts
Define a interface `Product` que representa um produto disponível na app. Esta interface assegura que todos os objetos de produto mantenham uma estrutura uniforme, promovendo a segurança de tipos e facilitando a manipulação de dados relacionados a produtos.

### src/models/user.ts
Define a interface `User` que representa um user da app. Esta interface garante que todos os users sigam uma estrutura consistente, permitindo a segurança de tipos e a integridade dos dados ao gerenciar informações de users.

### src/utils/database.ts
Define e inicializa as instâncias do NeDB para produtos, users e pedidos. Esta configuração garante o armazenamento e a gestão eficiente dos dados das principais entidades da app. Inclui funções para adicionar e remover users, produtos e pedidos, bem como para obter IDs únicos.

### src/utils/logger.ts
Contém funções úteis para registro de logs e erros em toda a app. Facilita o acompanhamento de eventos e a depuração, garantindo que todas as mensagens de log sigam um formato consistente.

### src/utils/validator.ts
Fornece funções de validação para garantir a integridade e o formato correto dos dados utilizados na aplicação. Inclui funções como `isEmail` para validar formatos de email e `isPositiveNumber` para garantir que valores numéricos sejam positivos.

### src/tests/database.test.ts
Contém unit tests para as operações de banco de dados, incluindo a adição e remoção de users e produtos. Garante que as funções do banco de dados funcionem conforme o esperado e manipulem os dados corretamente.

### src/main.ts
Ponto de entrada da aplicação. Carrega as configurações do servidor a partir de um arquivo JSON e inicia o servidor ouvindo no host e porta especificados.

### src/server.ts
Configura o servidor Express, incluindo middleware para análise de requisições JSON e definição das rotas da API para produtos, users e pedidos. Exporta a instância do aplicativo Express.

### src/serverInfo.ts
Fornece metadados do servidor, incluindo o nome, versão e descrição do servidor REST API. Utilizado nas configurações do servidor e na documentação.

### data/products.db
Base de dados NeDB para armazenar dados dos produtos. Gerido pelo NeDB.

### data/users.db
Base de dados NeDB para armazenar dados dos users. Gerido pelo NeDB.

### data/orders.db
Base de dados NeDB para armazenar dados dos pedidos. Gerido pelo NeDB.