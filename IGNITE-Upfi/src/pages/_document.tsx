import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
