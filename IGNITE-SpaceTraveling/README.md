<h2 align="center">
  <img alt="Logo" src="./public/logo.svg" alt="SpaceTraveling">
  <br />
  Blog de notícias
</h2>

# Tecnologias

Abaixo as tecnologias utilizadas para construção da aplicação

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Prismic CMS](https://prismic.io/)
- [Utterances](https://utteranc.es/)

# Configurações necessárias

## Prismic CMS: https://prismic.io/

Após criar o seu repositório vá até a aba de "Custom Types", adicione um novo com as seguintes configurações

Tipo: Repeatable Type

Name: posts

Campos:

 - UID - slug
 - KeyText - title
 - KeyText - subtitle
 - KeyText - author
 - Image - banner
 - Group - content
 - Group - content - KeyText - heading
 - Group - content - RichText - body

Na aba "Documents" adicione no mínimo três posts.

Para configurar os previews será necessário acessar settings>Previews e adicionar uma configuração de Previews:

Site Name: Nome do seu site
Domain for your application: http://localhost:3000 (em caso de utilização em localhost/desenvolvimento)
Link Resolver: /api/preview

## Utterances: https://utteranc.es/

Para utilizar o Utterances é necessário ter um repositório público no Github com o [Utteranc app](https://github.com/apps/utterances) instalado e adicionar o script com as configurações desejadas.

Para implementações com ReactJS está Issue pode ajudar: [Utteranc com ReactJS](https://github.com/utterance/utterances/issues/161)


# **Clone do projeto**

```bash
# Execute o comando git clone para realizar o clone do repositório
$ git clone https://github.com/gonribeiro/Rocketseat.git
# Entre na pasta do repositório clonado
$ cd Rocketseat\IGNITE-SpaceTraveling
```

# **Iniciando o projeto**

```bash
# Execute yarn para instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções

# Para iniciar a aplicação
$ yarn dev
```
