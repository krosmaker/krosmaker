![Krosmaker](.github/images/banner.png)

# Krosmaker

**Krosmaker** is an online card creator tool for the **Krosmaster: Blast** board game.
Create custom cards for your Krosmasters!

![Sample](.github/images/screenshot.png)

You can find some of the cards created with **Krosmaker** on
[Twitter](https://twitter.com/krosmaker).

## Running from sources

![build](https://github.com/krosmaker/krosmaker/workflows/build/badge.svg)

### Docker

The default [`Dockerfile`](Dockerfile) builds the application and serves the generated
static resources with Nginx. It is recommended to run the application via Docker Compose:

```bash
$ docker-compose build
$ docker-compose up
# The application should be available at localhost.
```

### Node.js

The supported Node.js version is stored in [`.nvmrc`](.nvmrc).
You can run the following commands after cloning the repository:

```bash
# Install dependencies:
$ npm install

# Serve the application at localhost:3000 with hot reload:
$ npm run dev

# Build for deployment and launch a local server:
$ npm run build
$ npm run start

# Generate a static project:
$ npm run generate

# Run the formatter on the entire project:
$ npm run format
```

For a detailed explanation of the project setup, check out
[the Nuxt.js documentation](https://nuxtjs.org).

## Contributors

- [@czyzby](https://github.com/czyzby/) - development, Polish translation.
- [Jesús Martínez](https://krosarchive.es/) - Spanish translation.
