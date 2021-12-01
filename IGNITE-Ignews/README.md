<h1 align="center">
    Ignews
</h1>

<p align="center">
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

  <img src="https://img.shields.io/github/forks/gonribeiro/NLW-Rocketseat?label=forks&message=MIT&color=5965E0&labelColor=121214" alt="Forks">

  <img src="https://img.shields.io/github/stars/gonribeiro/NLW-Rocketseat?label=stars&message=MIT&color=5965E0&labelColor=121214" alt="Stars">
</p>

<h1 align="center">
  <a href="https://ignews-gonribeiro.vercel.app/">https://ignews-gonribeiro.vercel.app/</a>
  <br /><br />
  <img alt="Letmeask" title="Letmeask" src=".github/logo.jpg" />
</h1>

# 🎮 O Projeto
Site de notícias criado com o objetivo de estudar as tecnologias aqui utilizadas.

# 🧪 Tecnologias

Tecnologias utilizadas para construção da aplicação:

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Next-Auth](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

# 🚀 Iniciando o projeto:

## Requisitos

Acesse servicesConfig.md para saber mais sobre como configurar este projeto.

Necessário realizar as instalações:

- [Stripe CLI](https://stripe.com/docs/stripe-cli)

Criar conta e configurar os serviços externos:

- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

Clone do projeto:

```bash
$ git clone https://github.com/gonribeiro/Rocketseat
$ cd Rocketseat\IGNITE-Ignews
```

Iniciando o projeto:

```bash
# Instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções

# Baixe o stripe-cli: https://stripe.com/docs/stripe-cli
# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks

# Inicie o projeto
$ yarn dev

```

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.