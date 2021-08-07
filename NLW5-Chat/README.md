<div align="center">
  <h1> Chat! </h1>
</div>

<p align="center">
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

  <img src="https://img.shields.io/github/forks/gonribeiro/NLW-Rocketseat?label=forks&message=MIT&color=5965E0&labelColor=121214" alt="Forks">     

  <img src="https://img.shields.io/github/stars/gonribeiro/NLW-Rocketseat?label=stars&message=MIT&color=5965E0&labelColor=121214" alt="Stars">

  <img alt="Chat" title="Letmeask" src=".github/chat.png" />
</p>

## 🧪 Technologies

This project was developed using the following technologies:

- [NodeJS](https://nodejs.org/)
- [WebSocket](https://socket.io/)
- [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting started

Clone the project and access the folder.

```bash
$ git clone https://github.com/gonribeiro/NLW-Rocketseat
$ cd NLW-Rocketseat\NLW5-Chat
```

Follow the steps below:
```bash
# Install the dependencies
$ yarn install
# Start the project
$ yarn dev
```
The app will be available for access on your browser at http://localhost:3333/pages/client and http://localhost:3333/pages/admin

## Notes:

- yarn add express
- yarn add @types/express -D
- yarn add typescript -D
- yarn tsc --init
- tsconfig.json:
```
strict: false
...
# descomentar:
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```
- yarn add ts-node-dev -D
- package.json:
```
"license": "MIT",
"scripts": {
    "dev": "ts-node-dev src/server.ts",
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
},
```
- yarn add typeorm reflect-metadata sqlite3
- Crie ormconfig.json e pasta database (veja conteúdo do arquivo e pasta)

<img alt="develop" src=".github/bd.png">

- yarn typeorm migration:create -n CreateSettings
- yarn typeorm migration:run
- Instalar extensão SQLite vscode > control + shift + p > open database > selecionar o banco e assim fica disponível no explorer do vscode o sqlite explorer (ou use o beekeper studio)
- Crie as entidades
- yarn add uuid
- yarn add @types/uuid -D
- yarn add socket.io
- yarn add @types/socket.io -D
- yarn add ejs
- yarn add socket.io-client