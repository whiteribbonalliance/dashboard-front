# WRA Global Directory Dashboard

This project contains multiple dashboards for WRA. Each dashboard is made accessible by navigating to a specific
subdomain. `middleware.ts` is responsible for parsing the subdomain that is calling the app and rewrite the hostname
as a parameter of `_dashboards`.

The file at `_dashboards/[dashboard]/index.ts` contains the logic that decides which dashboard to load.

### Dependencies

- [Node.js 16](https://nodejs.org/en/)

## Development

### Install

Configure .env.local.

On the local machine, map `127.0.0.1` to the following domain names:

```text
127.0.0.1   whatyoungpeoplewant.localhost
127.0.0.1   whatwomenwant.localhost
127.0.0.1   midwivesvoices.localhost
```

Then

```bash
npm install
```

### Run

```bash
npm run dev
```

On the local machine visit `http://whatyoungpeoplewant.localhost:3000`.

### Lint project

```bash
npm run lint
```

### Format project

```bash
npm run format
```

## Deployment

TODO

## Docker

Build container:

```bash
docker build -t wra-dashboards .
```

Run container:

```bash
docker run -p 3000:3000 wra-dashboards
```