# Serviços

## GtHub

O projeto exige que o usuário que for logar na plataforma, tenha um e-mail público pelo GitHub.

Acesse: github>settings>emails e desmarque Keep my email addresses private.

Em github>settings>profile>Public email escolha um e-mail qualquer.

Ao criar o New OAuth App no GitHub para a sua aplicação, em Authorization callback URL obrigatoriamente insira ao final da sua URL "/api/auth/callback". Exemplo, caso ela esteja rodando em localhost:3000, informe: http://localhost:3000/api/auth/callback

## Stripe

Após criar seu estabelecimento crie o produto "subscription" com pelo menos nome e valor.

Acesse: https://dashboard.stripe.com/account e informe um nome qualquer para a sua conta (caso não faça isso nesse momento, na última etapa para ouvir o stripe, você será exigido essa nomeação).

Para estar o Stripe em ambiente local (desenvolvimento), instale o Stripe CLI de acordo com o seu OS: https://stripe.com/docs/stripe-cli.

OS Windows:

Provavelmente você terá feito o download de um zip. Descompacte o zipe e mova o stripe.exe para dentro da pasta raiz do seu projeto ignews.

A partir de um terminal qualquer (cmd, powershell ou outros), acessa a pasta onde encontra-se o stripe.exe e execute: ``` .\stripe.exe login ```. Ele irá perguntar se você quer ser redirecionado para um endereço na web, informe sim e na página que abre permita o acesso (esta permissão será válida por 90 dias).

Ainda na pasta onde encontra-se o stripe.exe, execute: ``` .\stripe listen --forward-to http://localhost:3000/api/webhooks ```

Após executar o comando, você receberá uma nova chave, exemplo:
"Ready! You are using Stripe API Version [2020-08-27]. Your webhook signing secret is whsec_XXXXXXXXXXXXXXXXXXXXXXXXX (^C to quit)". Copie a chave "whsec_XXXXXXXXXXXXXXXXXXXXXXXXX" e informe no seu env.local>STRIPE_WEBHOOK_SECRET (neste momento, não se esqueça de reiniciar a sua aplicação. Só após esse momento a chave informada no ENV será atualizada no projeto).

Após configurar todo o projeto e executá-lo, quando clicar no botão "inscreva-se agora", você será redirecionado para a página de pagamento do Stripe.

---

## FaunaDB

Após criar a DataBase será necessário criar as Collections e Indexes

### **Collections**

```js
  {
    name: "subscriptions",
    history_days: 30,
    ttl_days: null
  }

  {
    name: "users",
    history_days: 30,
    ttl_days: null
  }
```

### **Indexes**

```js
  {
    name: "subscription_by_id",
    unique: false,
    serialized: true,
    source: "subscriptions",
    terms: "data.id"
  }

  {
    name: "subscription_by_status",
    unique: false,
    serialized: true,
    source: "subscriptions",
    terms: "data.status"
  }

  {
    name: "subscription_by_user_ref",
    unique: false,
    serialized: true,
    source: "subscriptions",
    terms: "data.userId"
  }

  {
    name: "user_by_email",
    unique: true,
    serialized: true,
    source: "users",
    terms: "data.email"
  }

  {
    name: "user_by_stripe_customer_id",
    unique: false,
    serialized: true,
    source: "users",
    terms: "data.stripe_customer_id"
  }
```

### **FaunaDB Troubleshootings**

Após um tempo, recebi alguns erros no FaunaDB. Os erros foram corrigidos no projeto e as soluções utilizadas estão listadas abaixo caso seja necessário revisitá-las:

- Erro: ERR_HTTP2_GOAWAY_SESSION
  - Solução: Atualize o FaunaDB para a última versão: ``` yarn add faunadb ```

- Erro: 401 Unauthorized
  - Solução: Ao criar um novo banco de dados, após informar o nome, o FaunaDB pergunta a região onde o seu banco estará hospedado. Em seu projeto src>services>fauna.ts, informe corretamente o domínio de conexão. O exemplo abaixo é caso você tenha escolhido os Estados Unidos (para outros exemplos, consulte as fontes utilizadas na solução desse problema):

  ```
  import { Client } from 'faunadb';

  export const fauna = new Client({
    secret: process.env.FAUNADB_KEY,
    domain: 'db.us.fauna.com',
    scheme: 'https',
  })
  ```

Fontes:
- https://stackoverflow.com/questions/68484082/faunadb-application-returns-401-but-credentials-are-fine
- https://docs.fauna.com/fauna/current/learn/understanding/region_groups

---

## Prismic CMS

Após criar o seu repositório vá até a aba de "Custom Types", adicione um novo com as seguintes configurações

Tipo: Repeatable Type

Name: publication

Campos:

 - UID
 - Title como H1
 - RichText permitindo múltiplos parágrafos e blank for links com Field name: Content

Na aba "Documents" será possível adicionar os posts.
