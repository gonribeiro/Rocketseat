<div align="center">
  <img src=".github/podcastr-logo.svg" alt="Podcastr logo">
</div>

## Podcastr

<h4 align="center">
  Podcastr is a platform built for podcast broadcasting.
</h4>

![Podcastr preview](.github/app-preview.png)

## Tecnologies

<div align="center">
  <br />
  <img src=".github/tech-logos.png" alt="Technologies used">
</div>

This project was developed using cutting edge front-end technologies.


- [ReactJS](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)

## 💻 Getting started

### Requirements

- You need to install both [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) to run this project.

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Run the backend fake server
$ yarn server

# Run the web server
$ yarn dev
```

The app will be available for access on your browser at `http://localhost:3000`

## Annotations

- yarn create next-app Podcast
- yarn add typescript @types/react @types/node -D
- yarn add sass
- yarn add date-fns
- yarn add json-server -D
- yarn add axios
```
// package.json
"scripts": {
    ...
    "server": "json-server db.json -w -d 750 -p 3333"
},
```