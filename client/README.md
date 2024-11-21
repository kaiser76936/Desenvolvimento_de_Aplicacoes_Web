## Estrutura de Arquivos

### src/index.html
Arquivo HTML principal que carrega a aplicação React. Inclui a referência ao arquivo CSS e ao bundle JavaScript gerado pelo build.

### models/Product.ts
Define a interface `Product` que representa um produto na aplicação. Esta interface assegura que todos os objetos de produto mantenham uma estrutura uniforme, promovendo a segurança de tipos e facilitando a manipulação de dados relacionados a produtos.

### css/main.css
Arquivo CSS principal que define os estilos básicos para a aplicação, incluindo estilos para o corpo, cabeçalhos, formulários e inputs.

### code/app.tsx
Ponto de entrada principal da aplicação React. Configura o provedor do Redux e renderiza o componente `ProductList` dentro do elemento raiz do HTML.

### code/components/ProductList.tsx
Define a componente `ProductList`, que obtém e mostra uma lista de produtos a partir do estado do Redux. Utiliza a componente `ProductView` para renderizar cada produto individualmente.

### code/components/ProductView.tsx
Define a componente `ProductView`, responsável por exibir os detalhes de um único produto, incluindo nome e preço. Permite adicionar o produto ao carrinho através de uma ação do Redux.

### code/components/ShoppingCart.tsx
Define a componente `ShoppingCart`, que exibe os itens atualmente no carrinho de compras. Permite remover produtos do carrinho utilizando ações do Redux.

### code/components/UserLogin.tsx
Define a componente `UserLogin`, que fornece um formulário de login para os users. Gerencia o estado local para email e senha e despacha ações do Redux para autenticar o usuário.

### code/state/cartSlice.ts
Define o slice do Redux para o carrinho de compras. Gerencia o estado dos itens no carrinho, incluindo ações para adicionar e remover produtos.

### code/state/productsSlice.ts
Define o slice do Redux para os produtos. Gerencia o estado da lista de produtos disponíveis, incluindo ações para definir a lista de produtos.

### code/state/store.ts
Configura a store do Redux, combinando os reducers dos slices de usuário, carrinho e produtos. Exporta os tipos para o estado raiz e despacho da aplicação.

### code/state/userSlice.ts
Define o slice do Redux para o usuário. Gerencia o estado de autenticação do usuário, incluindo ações para login e logout.

Ligações entre ficheiros:
ProductList.tsx<->ProductView.tsx<->productSlice.ts<->Product.ts<->productController.ts<->product.ts