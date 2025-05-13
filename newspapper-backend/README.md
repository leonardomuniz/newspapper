# Newspapper Backend

Este é o backend do projeto **newspapper-backend**, desenvolvido com Node.js, Express, TypeScript e Prisma, que integra um scraper em Python para coletar artigos. O sistema utiliza agendamento por meio do `node-cron` para executar periodicamente o script Python, normalizar os dados e armazená-los no banco de dados.

## Sumário

- [Visão Geral](#visão-geral)
- [Características](#características)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
  - [1. Clonando o Repositório](#1-clonando-o-repositório)
  - [2. Dependências Node.js](#2-dependências-nodejs)
  - [3. Dependências Python](#3-dependências-python)
- [Uso](#uso)

## Visão Geral

O **newspapper-backend** é um backend para um sistema de agregação de artigos que:

- Utiliza um scraper em Python (via Selenium e webdriver-manager) para buscar artigos.
- Normaliza os dados (através do use case `CreateManyArticlesUseCase`) para o formato necessário.
- Persiste os dados utilizando Prisma e um banco de dados relacional.
- Agenda a execução do scraper a cada 6 horas usando `node-cron`.
- Expõe APIs e outras funcionalidades via Express.

## Características

- **Scraping Automatizado:** Coleta de artigos de fontes externas utilizando Selenium.
- **Normalização dos Dados:** Mapeia os dados do scraper para o modelo interno esperado.
- **Bulk Insert:** Criação em massa dos artigos através do método `createMany` do Prisma.
- **Agendamento:** Execução periódica do scraper via node-cron.
- **Integração de Tecnologias:** Combina Node.js/TypeScript no backend com um módulo Python para scraping.

## Pré-requisitos

- **Node.js** (v14.x ou superior)
- **NPM** (geralmente instalado com o Node.js)
- **Python** (v3.8 ou superior)
- **Pip** (gerenciador de pacotes Python)
- **Banco de Dados:** (conforme configurado no seu Prisma - PostgreSQL, MySQL, SQLite, etc.)
- **Git** para clonar o repositório

## Instalação

### 1. Clonando o Repositório

Abra um terminal e execute:

```bash
git clone https://github.com/seuusuario/newspapper-backend.git
cd newspapper-backend
```

### 2. Dependências Node.js

Instale as dependências do projeto:

```bash
npm install
```

### 3. Dependências Python

No diretório raiz do projeto, você encontrará um arquivo requirements.txt com as dependências necessárias para o scraper.

## 1. Crie um ambiente virtual (caso ainda não exista):

No Bash (Linux/Mac/Windows Git Bash):

```bash
python -m venv venv
source venv/bin/activate
```

No PowerShell (Windows):

```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

- (Caso receba erro com execução de script, rode: Set-ExecutionPolicy ExecutionPolicy RemoteSigned -Scope Process)

## 2. Instale as dependências Python:

```bash
pip install -r requirements.txt
```

O requirements.txt inclui bibliotecas como:

- selenium
- webdriver-manager
- python-dotenv
- Entre outras.

### Uso

No seu terminal rode o script de dev e pronto seu servidor está rodando

```bash
npm run dev
```
