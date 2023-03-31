Projeto Toro Investimentos Challenge
Este projeto foi criado como parte do processo seletivo da Toro Investimentos. Consiste em uma aplicação web de investimentos que permite aos usuários visualizar suas posições de investimento e executar operações de compra e venda de ativos financeiros.

O projeto é dividido em duas partes: frontend e backend. O frontend é uma aplicação web React que consome uma API RESTful fornecida pelo backend. O backend é uma aplicação Node.js que utiliza um banco de dados PostgreSQL para armazenar informações sobre usuários, ativos financeiros e transações de investimento.

Instruções de execução
Backend
O backend pode ser executado usando o Docker Compose. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Em seguida, execute os seguintes comandos:

cd backend
docker-compose up
O Docker Compose irá baixar as imagens necessárias e criar os contêineres Docker do banco de dados PostgreSQL e da API Node.js.
API http://localhost:5000
BD 5432

Além disso, no backend, fizemos a integração com um banco de dados PostgreSQL. Já incluímos alguns dados iniciais para facilitar o desenvolvimento e teste da aplicação.

Frontend
O frontend pode ser executado localmente em modo de desenvolvimento usando o seguinte comando:

cd frontend
npm install --force (por conta de alguns conflitos que deixei para resolver depois)
npm run dev
Isso iniciará a aplicação web em http://localhost:3000.

Execução completa
Para executar a aplicação completa, primeiro execute o backend usando o Docker Compose e, em seguida, execute o frontend em modo de desenvolvimento usando o comando npm run dev e abra http://localhost:3000 no navegador.

Design Patterns
Este projeto foi desenvolvido utilizando alguns padrões de design comuns no desenvolvimento de aplicações web. Alguns exemplos incluem:

MVC (Model-View-Controller): o backend da aplicação foi desenvolvido seguindo a arquitetura MVC, separando as responsabilidades em Modelos, Controladores, Serviços e Persistência. O modelo representa a estrutura dos dados, o controlador é responsável pelo gerenciamento de requisições e respostas, o serviço é responsável por implementar a lógica de negócio e a persistência é responsável pela interação com o banco de dados. Dessa forma, cada componente da aplicação tem uma responsabilidade bem definida e pode ser desenvolvido, testado e mantido de forma independente.

Singleton: O uso de uma instância única do banco de dados foi implementado utilizando o padrão Singleton.

Service Layer: Foi utilizado para encapsular a lógica de negócios da aplicação, mantendo a separação de responsabilidades e tornando o código mais modular.

Injeção de Dependência: A biblioteca de injeção de dependência NestJS foi utilizada para facilitar a gestão das dependências na aplicação Node.js.

No contexto do projeto, o padrão DTO foi utilizado para transferir os dados da requisição HTTP para o serviço e vice-versa, permitindo uma comunicação mais estruturada e organizada entre as camadas. Além disso, também foi utilizado para transferir os dados do banco de dados para os objetos da aplicação, evitando que a camada de serviço acesse diretamente o banco de dados.

Design System
A aplicação web foi desenvolvida utilizando o framework de design Material-UI, que fornece uma grande variedade de componentes e estilos de UI reutilizáveis e personalizáveis.

Durante o desenvolvimento do frontend, utilizei alguns padrões de design para tornar o código mais organizado e fácil de manter. Um desses padrões foi o Flux, que é uma variação do padrão MVC e ajuda a gerenciar o estado da aplicação de forma mais eficiente.

Também utilizei o padrão de design Componentização, que consiste em dividir a aplicação em pequenos componentes reutilizáveis. Isso torna o código mais modular e fácil de manter. Além disso, adotei o padrão Atomic Design, que consiste em dividir os componentes em pequenos blocos atômicos, criando uma hierarquia que facilita a organização e reutilização de código.

Por fim, utilizei o padrão de design de estilo Material Design, que é um conjunto de diretrizes criado pela Google para fornecer uma interface visual consistente em todas as suas plataformas e aplicativos. O Material Design é um padrão moderno e limpo que ajuda a criar uma interface intuitiva e agradável para os usuários.

Detalhamento do Projeto
O projeto consiste em uma aplicação web dividida em duas partes principais: o frontend e o backend. O frontend é uma aplicação React que fornece a interface do usuário para visualização e gerenciamento das posições de investimento e operações de compra e venda de ativos financeiros. O backend é uma aplicação Node.js que fornece uma API RESTful para o frontend, bem como a camada de persistência para os dados da aplicação.