# API de Gerenciamento de Tarefas
 
Uma API RESTful simples para gerenciar tarefas, usuários, projetos, categorias e comentários, desenvolvida com Node.js e Express. Os dados são armazenados em memória para simplificar, sem a necessidade de um banco de dados.
 
## Entidades da API
 
*   **Tarefa:** `id`, `titulo`, `descricao`, `status` (pendente, em andamento, concluída), `dataCriacao`, `dataConclusao`, `usuarioId`, `projetoId`
*   **Usuário:** `id`, `nome`, `email`
*   **Projeto:** `id`, `nome`, `descricao`
*   **Categoria:** `id`, `nome`
*   **Comentário:** `id`, `texto`, `dataCriacao`, `usuarioId`, `tarefaId`
 
## Instalação e Execução
 
Para configurar e executar a API localmente, siga os passos abaixo:
 
1.  **Clone o repositório (se aplicável):**
    ```bash
    # Se você estiver clonando de um repositório Git
    git clone <URL_DO_SEU_REPOSITORIO>
    cd trabalho-p1-api-rest-ads28 # Ou o nome que você deu ao repositório
    ```
    Se você está criando o projeto do zero seguindo este guia, você já deve estar no diretório correto.
 
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
 
3.  **Inicie o servidor:**
    ```bash
    node app.js
    ```
 
A API estará rodando em `http://localhost:3000`.
 
## Endpoints da API
 
### Tarefas
 
*   **GET /tarefas**
    *   **Descrição:** Retorna todas as tarefas.
*   **GET /tarefas/:id**
    *   **Descrição:** Retorna uma tarefa específica pelo ID.
*   **POST /tarefas**
    *   **Descrição:** Cria uma nova tarefa.
    *   **Exemplo de Requisição:**
        ```json
        {
            "titulo": "Estudar para a prova de P1",
            "descricao": "Revisar todo o conteúdo de Node.js e Express.",
            "status": "pendente",
            "usuarioId": 1,
            "projetoId": 1
        }
        ```
*   **PUT /tarefas/:id**
    *   **Descrição:** Atualiza uma tarefa existente pelo ID.
    *   **Exemplo de Requisição:**
        ```json
        {
            "titulo": "Estudar para a prova de P1 (Atualizado)",
            "descricao": "Revisar todo o conteúdo de Node.js e Express e fazer exercícios.",
            "status": "em andamento",
            "usuarioId": 1,
            "projetoId": 1
        }
        ```
*   **DELETE /tarefas/:id**
    *   **Descrição:** Deleta uma tarefa pelo ID.
 
### Usuários
 
*   **GET /usuarios**
    *   **Descrição:** Retorna todos os usuários.
*   **GET /usuarios/:id**
    *   **Descrição:** Retorna um usuário específico pelo ID.
*   **POST /usuarios**
    *   **Descrição:** Cria um novo usuário.
    *   **Exemplo de Requisição:**
        ```json
        {
            "nome": "João Silva",
            "email": "joao.silva@example.com"
        }
        ```
*   **PUT /usuarios/:id**
    *   **Descrição:** Atualiza um usuário existente pelo ID.
    *   **Exemplo de Requisição:**
        ```json
        {
            "nome": "João Silva Atualizado",
            "email": "joao.silva.atualizado@example.com"
        }
        ```
*   **DELETE /usuarios/:id**
    *   **Descrição:** Deleta um usuário pelo ID.
 
### Projetos
 
*   **GET /projetos**
    *   **Descrição:** Retorna todos os projetos.
*   **GET /projetos/:id**
    *   **Descrição:** Retorna um projeto específico pelo ID.
*   **POST /projetos**
    *   **Descrição:** Cria um novo projeto.
    *   **Exemplo de Requisição:**
        ```json
        {
            "nome": "Projeto Alpha",
            "descricao": "Primeiro projeto de desenvolvimento."
        }
        ```
*   **PUT /projetos/:id**
    *   **Descrição:** Atualiza um projeto existente pelo ID.
    *   **Exemplo de Requisição:**
        ```json
        {
            "nome": "Projeto Alpha (Atualizado)",
            "descricao": "Primeiro projeto de desenvolvimento, agora com novas funcionalidades."
        }
        ```
*   **DELETE /projetos/:id**
    *   **Descrição:** Deleta um projeto pelo ID.
 
### Categorias
 
*   **GET /categorias**
    *   **Descrição:** Retorna todas as categorias.
*   **GET /categorias/:id**
    *   **Descrição:** Retorna uma categoria específica pelo ID.
*   **POST /categorias**
    *   **Descrição:** Cria uma nova categoria.
    *   **Exemplo de Requisição:**
        ```json
        {
            "nome": "Estudos"
        }
        ```
*   **PUT /categorias/:id**
    *   **Descrição:** Atualiza uma categoria existente pelo ID.
    *   **Exemplo de Requisição:**
        ```json
        {
            "nome": "Trabalho"
        }
        ```
*   **DELETE /categorias/:id**
    *   **Descrição:** Deleta uma categoria pelo ID.
 
### Comentários
 
*   **GET /comentarios**
    *   **Descrição:** Retorna todos os comentários.
*   **GET /comentarios/:id**
    *   **Descrição:** Retorna um comentário específico pelo ID.
*   **POST /comentarios**
    *   **Descrição:** Cria um novo comentário.
    *   **Exemplo de Requisição:**
        ```json
        {
            "texto": "Este é um comentário sobre a tarefa.",
            "usuarioId": 1,
            "tarefaId": 1
        }
        ```
*   **PUT /comentarios/:id**
    *   **Descrição:** Atualiza um comentário existente pelo ID.
    *   **Exemplo de Requisição:**
        ```json
        {
            "texto": "Este é um comentário atualizado sobre a tarefa.",
            "usuarioId": 1,
            "tarefaId": 1
        }
        ```
*   **DELETE /comentarios/:id**
    *   **Descrição:** Deleta um comentário pelo ID.
 
## Contribuições
 
| Nome do Integrante | Usuário GitHub |
| :----------------- | :------------- |
| [Fabrício Felippi de Loiola - 24114290058]         | [fabricioloi]
| [Mirela Lucena - 24114290052]   | [mihlucee] |
