# WRA Global Directory Dashboard

This project contains multiple dashboards for WRA. Each dashboard is made accessible by navigating to a specific
subdomain. `middleware.ts` is responsible for parsing the subdomain that is calling the app and rewrite the hostname
as a parameter of route `dashboards_use_subdomain` or `dashboards_use_path`.

The file at `app/dashboards_use_subdomain/[dashboard]/[lang]/page.tsx` will generate each dashboard page.

## Development

### Install

Configure .env.local.

- `NEXT_PUBLIC_PROD_DOMAINS=` The domains allowed in production.
- `NEXT_PUBLIC_MAIN_SUBDOMAIN=` The subdomain used in production.
- `NEXT_PUBLIC_DEV_DOMAIN=` The subdomain used in development.
- `NEXT_PUBLIC_WRA_DASHBOARD_API_URL=` The url to What Women Want Dashboard API.

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

## Deployment to Google App Engine

This repo has continuous deployment/continuous integration set up.

There is a GitHub action defined in `.github/workflows/deploy_google_app_engine.yaml` which deploys to Google App Engine
when you push or merge to `main`, except `README.md`. The app will deploy
to https://dashboard-frontend-dot-deft-stratum-290216.uc.r.appspot.com plus any other domains that are pointing there.

This script builds a Docker image and pushes to Google Container Registry and then deploys. In the future we may change
to a direct Dockerless deployment which would use `app.yaml`. No authentication is needed because authentication is
provided
via the Google App Engine service account, whose credentials are stored in the GitHub secret `GOOGLE_CREDENTIALS` (to
change this, go to the GitHub web interface and got o Settings -> Secrets and variables -> Actions. You will need to be
an administrator on the GitHub repo to modify these credentials).

There is also a manual Google App Engine deployment file set up in `app.yaml`. You can deploy manually from the command
line using `gcloud app deploy app.yaml`. You need to install Google Cloud CLI (Command Line Interface) and be
authenticated on the WRA Google Cloud Platform service account for this to work.

## Docker

Build container:

```bash
docker build -t wra-dashboards .
```

Run container:

```bash
docker run -p 3000:3000 wra-dashboards
```

## Translations

Check `README.md` inside the back-end project for translations.

## Hot to add a new campaign

1. At `src/enums/dashboard-name.ts` add the new dashboard name, this is the name of the dashboard that will be used as
   the path or subdomain.
2. At `src/configurations` create a new configuration file for the new dashboard and export it
   from `src/configurations/index.ts`.
3. At `src/utils/index.ts` map the dashboard to its config at the function `getDashboardConfig`.
4. Add new translations e.g. the title and subtext.
5. Modify switch statements in components to reflect changes if necessary.