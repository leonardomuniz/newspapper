# Sobre este projeto!

Este é um projeto full stack de um portal de notícias do mundo tack que integra técnicas de raspagem de dados em Python para coletar artigos.

Para saber mais aqui tem um vídeo explicando um pouco mais do sistema:
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Ki1_XglMLmc/0.jpg)](https://www.youtube.com/watch?v=Ki1_XglMLmc)

## Funcionalidades

- Função de login.
- Criação, alteração e deletar artigos.
- Cadastro de usuário.
- Sistema de autenticação JWT Front e Back End.
- Sistema de criptografia e descriptografia de senhas.
- Sistema de envio de arquivos.
- Lazy loading.
- Sistema de raspagem de dados.
- Sistema com responsividade em diferentes telas

## Tecnologias usadas

- Next.js
- TypeScrypt
- Node.js
- Python
- MongoDB
- Prisma
- Express

## Instalação

**Instalação do front**

Para instalar o front end basta dentro da pasta inicial entrar na pasta newspapper-frontend e rodar o npm install

```bash
  cd newspapper-frontend
  npm i
```

Após a instalação para rodar sua aplicação na porta http://localhost:3000/

```bash
  npm run start

  ou

  npm run dev
```

**Instalação do back**

Para instalar o back end basta dentro da pasta inicial entrar na pasta newspapper-backend e rodar o npm install

```bash
  cd newspapper-backend
  npm i
```

Nessa parte você pode decidir se quer utilizar a venv ou instalar as dependencias do python na sua própria máquina.

Utilizando venv primeiro você cria sua venv:

```bash
  No Windows (CMD ou PowerShell):
  python -m venv venv

  No Linux/macOS:
  python3 -m venv venv
```

Depois você ativa ela:

```bash
  Windows (CMD):
  venv\Scripts\activate

  Windows (PowerShell):
  .\venv\Scripts\Activate.ps1

  No Linux/macOS:
  source venv/bin/activate
```

Agora para a ultima parte pode ser feito na venv ou fora dela, a parte de instalar tudo:

```bash
  pip install -r requirements.txt
```

Depois de todo o ambiente instalado basta roda npm run dev e seu projeto vai estar disponível na porta http://localhost:3030/

```bash
  npm run dev
```
