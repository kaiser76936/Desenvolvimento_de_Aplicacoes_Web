# Project Overview
Este projeto é uma aplicação React que consome a REST API do servidor para gerenciar produtos, users e pedidos. Utiliza Redux para gerenciamento de estado, React Router para navegação e TypeScript para segurança de tipos.

## Estrutura de Arquivos

### src/index.html
Arquivo HTML principal que carrega a aplicação React. Inclui referência ao CSS e ao bundle JavaScript gerado pelo build.

### css/main.css
Arquivo CSS principal que define estilos básicos como corpo, cabeçalhos, formulários e inputs.

### code/components/app.tsx
Ponto de entrada da aplicação React. Configura o provedor do Redux e renderiza o componente `AppRouter` no elemento raiz do HTML.

### code/components/Login.tsx
Componente `UserLogin` que fornece formulário de login para users. Gerencia estado local para email e senha e despacha ações Redux para autenticação.

### code/components/Message.tsx
Componente `Message` que exibe mensagens de feedback para o user, como notificações de login, logout, entre outros.

### code/components/Navbar.tsx
Componente `Navbar` que fornece links de navegação para diferentes páginas da aplicação.

### code/components/Orders.tsx
Componente `Orders` que lista todos os pedidos realizados pelo user com sessão iniciada, permitindo visualização de detalhes das suas encomendas.

### code/components/Product.tsx
Componente `Product` que exibe a lista de produtos. Utiliza `useSelector` para obter produtos da store Redux e renderiza um `ProductView` para cada produto.

### code/components/Register.tsx
Componente `Register` que fornece formulário de registro para novos users.

### code/components/ShoppingCart.tsx
Componente `ShoppingCart` que mostra itens no carrinho de compras. Permite remover produtos utilizando ações do Redux.

### code/state/axiosConfig.ts
Configuração personalizada do Axios para gerenciar request HTTP à API.

### code/state/cartSlice.ts
Slice do Redux para o carrinho de compras. Gerencia itens no carrinho com ações para adicionar e remover produtos.

### code/state/ordersSlice.ts
Slice do Redux para pedidos. Gerencia o estado dos pedidos dos users, incluindo criação e listagem de pedidos.

### code/state/productsSlice.ts
Slice do Redux para produtos. Gerencia a lista de produtos disponíveis com ações para definir a lista.

### code/state/store.ts
Configura a store do Redux, combinando reducers dos slices de user, carrinho e produtos. Exporta tipos para o estado raiz e despacho.

### code/state/userSlice.ts
Slice do Redux para user. Gerencia estado de autenticação com ações para login e logout.

### code/router.tsx
Define rotas da aplicação utilizando `react-router-dom`, incluindo rotas para produtos, registro, carrinho e login.