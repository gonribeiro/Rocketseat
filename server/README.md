# Instalação
- yarn init -y
- yarn add express
- yarn add @types/express -D
- yarn add typescript -D
- yarn tsc --init
    - Em tsconfig.json 
        - trocar "target": "es5" para "target": "es2017"
        - Criar
            ```
            "scripts": {
                "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
                "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
            }
            ```
        - Descomentar e alterar: ``` "strictPropertyInitialization": false, ```
        - descomentar:
            ```
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true, 
            ```
- yarn add ts-node-dev -D
- yarn add typeorm sqlite3
- Criar: ormconfig.json (ver arquivo de exemplo existente no projeto)
- Criar: pasta "database" e dentro "database.sqlite" e "connection.ts"
- yarn add multer
- yarn add @types/multer -D
- yarn add express-async-errors
- yarn add yup
- yarn add @types/yup -D
- yarn add cors
- yarn add @types/cors -D

# Migrations
- yarn typeorm migration:create -n create_orphanage
- yarn typeorm migration:create -n create_images
    - Alterar migration criada conforme o exemplo existente no projeto
- yarn typeorm migration:run
    - yarn typeorm migration:revert
- Beekeeper Studio (software visual de design de banco de dados compatível com sqlite)

# Executar
- yarn dev