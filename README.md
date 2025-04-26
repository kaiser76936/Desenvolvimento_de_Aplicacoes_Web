# DESCRIÇÃO
Repositório do projeto da cadeira Desenvolvimento para Aplicações Web, este projeto consiste na implementação da base de dados, backend e frontend, para a construção de um website.

## Dependências Principais
|Package             |Versão  | Lado  |
|--------------------|--------|-------|
|@types/bcrypt       |5.0.2   |Server |
|@types/cors         |2.8.17  |Server |
|@types/express      |4.17.21 |Server |
|@types/jest         |29.5.14 |Server |
|@types/nedb         |1.8.16  |Server |
|@types/node         |18.19.61|Server |
|bcrypt              |5.1.1   |Server |
|body-parser         |1.20.3  |Server |
|cors                |2.8.5   |Server |
|express             |4.21.1  |Server |
|jest                |29.7.0  |Server |
|nedb                |1.8.0   |Server |
|nodemon             |3.1.7   |Server |
|ts-jest             |29.2.5  |Server |
|typescript          |5.6.3   |Server |
|react               |18.3.1  |Cliente|
|react-dom           |18.3.1  |Cliente|
|react-router-dom    |7.0.1   |Cliente|
|@reduxjs/toolkit    |2.3.0   |Cliente|
|axios               |1.7.7   |Cliente|
|typescript          |5.6.3   |Cliente|
|webpack             |5.96.1  |Cliente|
|webpack-dev-server  |5.1.0   |Cliente|

### Instalação
```
// Lado servidor
cd server
npm install

// Lado Cliente
cd client
npm install
```

#### Execução Lado Servidor
```
npm run build
npm run start // Para iniciar o server
ou
npm run dev // para usar em development:
npm test // jest tests

// Noutro cmd, para inserir dados na base de dados:
node tests/insertOrders.js
node tests/insertProducts.js
node tests/insertUsers.js
```

##### Execução Lado Cliente
```
#Build do lado cliente (development ou production)
npm run build:dev
ou
npm run build:prod

npm run serve // Para lançar o lado cliente
```