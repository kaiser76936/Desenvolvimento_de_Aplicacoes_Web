## Estrutura de Arquivos

### src/index.html
Arquivo HTML principal que carrega a aplicação React. Inclui a referência ao arquivo CSS e ao bundle JavaScript gerado pelo build.

### models/Product.ts
Define a interface `Product` que representa um produto na aplicação. Esta interface assegura que todos os objetos de produto mantenham uma estrutura uniforme, promovendo a segurança de tipos e facilitando a manipulação de dados relacionados a produtos.

### css/main.css
Arquivo CSS principal que define os estilos básicos para a aplicação, incluindo estilos para o corpo, cabeçalhos, formulários e inputs.

### code//components/app.tsx
Ponto de entrada principal da aplicação React. Configura o provedor do Redux e renderiza o componente `AppRouter` dentro do elemento raiz do HTML.

### code/components/Product.tsx
Define o componente `Product`, que mostra a lista de produtos. Utiliza `useSelector` para obter a lista de produtos da store do Redux e renderiza um `ProductView` para cada produto.

### code/components/ShoppingCart.tsx
Define a componente `ShoppingCart`, que mostra os itens atualmente no carrinho de compras. Permite remover produtos do carrinho utilizando ações do Redux.

### code/components/UserLogin.tsx
Define a componente `UserLogin`, que fornece um formulário de login para os users. Gerencia o estado local para email e senha e despacha ações do Redux para autenticar o user.

### code/components/Navbar.tsx
Define a componente `Navbar`, que fornece links de navegação para diferentes páginas da aplicação.

### code/components/Register.tsx
Define a componente `Register`, que fornece um formulário de registro para novos users.

### code/state/cartSlice.ts
Define o slice do Redux para o carrinho de compras. Gerencia o estado dos itens no carrinho, incluindo ações para adicionar e remover produtos.

### code/state/productsSlice.ts
Define o slice do Redux para os produtos. Gerencia o estado da lista de produtos disponíveis, incluindo ações para definir a lista de produtos.

### code/state/store.ts
Configura a store do Redux, combinando os reducers dos slices de user, carrinho e produtos. Exporta os tipos para o estado raiz e despacho da aplicação.

### code/state/userSlice.ts
Define o slice do Redux para o user. Gerencia o estado de autenticação do user, incluindo ações para login e logout.

### code/router.tsx
Define as rotas da aplicação utilizando `react-router-dom`, incluindo as rotas para produtos, registro, carrinho e login.

Ligações entre ficheiros:
Product.tsx<->productsSlice.ts (e cartSlice.ts)<->Product.ts<->database.ts<->productController.ts<->product.ts
Register.tsx e UserLogin.tsx<->userSlice.ts<->database.ts<->userController.ts<->user.ts