
# Teste Técnico Frontend

Este é o repositório do frontend da aplicação Teste Técnico, desenvolvido com Angular. Ele é complementar ao backend da aplicação, disponível em: [teste-tecnico-backend](https://github.com/lumarodrigues/teste-tecnico-backend).

---

## 🚀 Como começar

Para começar a trabalhar com o projeto, siga os passos abaixo.

### 1. Clonar o repositório

Clone o repositório para a sua máquina local:

```bash
git clone git@github.com:lumarodrigues/teste-tecnico-backend.git
```

### 2. Rodar o Backend

> **Importante:** O Backend deve estar rodando para que o Frontend funcione corretamente. Certifique-se de que o [Teste Técnico Backend](https://github.com/lumarodrigues/teste-tecnico-backend) esteja configurado e em execução.

---

## 🐳 Como rodar o projeto com Docker

O Docker facilita a configuração e execução do ambiente do frontend e backend.

### 1. Construir a imagem Docker

Construa a imagem Docker para o projeto com o seguinte comando:

```bash
sudo docker build -t angular-app .
```

### 2. Subir o container

Para subir o container, execute:

```bash
sudo docker-compose up --build
```

Isso irá inicializar o frontend e conectar com o backend.

---

## 🌐 Acesso ao Projeto

Uma vez que o container esteja em execução, o projeto estará disponível no seguinte endereço:

[http://localhost:4200/](http://localhost:4200/)

---

## 📝 Licença

Este projeto está licenciado sob a GNU GENERAL PUBLIC LICENSE. Consulte o arquivo LICENSE para mais detalhes.