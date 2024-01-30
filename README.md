# Dashboard

Front-end for displaying dashboards for campaigns defined in the back-end. You can find the back-end repo
at https://github.com/whiteribbonalliance/dashboard-api.

There's currently six dashboards deployed with this project, you can visit them at:

- https://explore.whiteribbonalliance.org/en/whatwomenwant
- https://explore.whiteribbonalliance.org/en/midwivesvoices
- https://explore.whiteribbonalliance.org/en/wwwpakistan
- https://explore.whiteribbonalliance.org/en/healthwellbeing
- https://explore.whiteribbonalliance.org/en/giz
- https://wypw.1point8b.org/en

## Environment variables

### Required:

- `NEXT_PUBLIC_DASHBOARD_API_URL=` The url to the API.

### Optional:

- `NEXT_PUBLIC_GOOGLE_ANALYTICS=` Google Analytics ID.

## System requirements

- Node.js 18 or above.

## Install

Configure `.env.local.` with the environment variables.

Then:

```bash
npm install
npm run build
```

### Run

```bash
npm run start
```

Visit for example `http://localhost:3000/en/healthwellbeing` to access a dashboard with path name `healthwellbeing`.

### Lint project

```bash
npm run lint
```

### Format project

```bash
npm run format
```

## Translations

Read the `Translations` section in the back-end `README.md` for more information.

## Other

### Favicon

To add a favicon to a dashboard, add `favicon.ico` to `public/dashboards/{DASHBOARD_PATH_NAME}`.

### Logo

To add a top left logo to a dashboard, add `logo.png` to `public/dashboards/{DASHBOARD_PATH_NAME}`.

## Deployment to Google App Engine

Add the required environment variables to `Repository secrets` in GitHub. Add optional
environment variables if needed. These variables will be loaded into `app.yaml`.

Inside `app.yaml` change `service` to your service name on App Engine.

For deployment, it is also required to add the following environment variables to `Repository secrets`:

- `SERVICE_NAME=` The service name in App Engine.
- `GOOGLE_CREDENTIALS_JSON_B64=` Content of credentials.json file in `Base64` format.
- `SERVICE_ACCOUNT=` The Google Cloud service account.
- `PROJECT_ID=` The Google Cloud project id.

Add/Modify `resources` in `app.yaml` as needed.

The GitHub action at `.github/workflows/prod-deploy-google-app-engine.yaml` will trigger a deployment to Google App
Engine on push or merge.

This script builds a Docker image and pushes to Google Container Registry and then deploys. In the future we may change
to a direct Dockerless deployment which would use `app.yaml`. No authentication is needed because authentication is
provided via the Google App Engine service account, whose credentials are stored in the GitHub
secret `GOOGLE_CREDENTIALS_JSON_B64` (to change this, go to the GitHub web interface and got o Settings -> Secrets and
variables -> Actions. You will need to be an administrator on the GitHub repo to modify these credentials).

There is also a manual Google App Engine deployment file set up in `app.yaml`. You can deploy manually from the command
line using `gcloud app deploy app.yaml` (you must directly include the env variables in `app.yaml`). You need to install
Google Cloud CLI (Command Line Interface) and be authenticated on the Google Cloud Platform service account.

## Deployment to Azure Web Apps

Add the following environment variables to `Repository secrets` in GitHub:

- `AZURE_WEBAPP_PUBLISH_PROFILE=` The publish profile of your web app.
- `AZURE_WEBAPP_NAME=` The web app name.
- `NEXT_PUBLIC_DASHBOARD_API_URL=` The url to the API.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS=` Optional - The Google Analytics ID.

At `Configurations` -> `General settings` -> `Startup command` add `node server.js`.

The GitHub action at `.github/workflows/prod-deploy-azure-webapps.yaml` will trigger a deployment to Azure Web
App on push or merge.

## Workflows

In each repository there's two workflows (To deploy to `Google` or `Azure`), make sure to only enable the correct
workflow in
the repository on GitHub: `https://docs.github.com/en/actions/using-workflows/disabling-and-enabling-a-workflow`.

## Docker

Build container:

```bash
docker build -t dashboards .
```

Run container:

```bash
docker run -p 3000:3000 dashboards
```

## Legacy campaigns

This section can be ignored as it details some information of dashboards used with this project originally.

For development, on the local machine map `127.0.0.1` to the following domain name:

```text
127.0.0.1   explore.whiteribbonalliance.local
```

Additional environment variables:

- `LEGACY_CAMPAIGNS_DEPLOYMENT=` True.
- `LEGACY_CAMPAIGNS_PROD_DOMAINS=` The domains allowed in production e.g. `.whiteribbonalliance.org`.
- `LEGACY_CAMPAIGNS_MAIN_SUBDOMAIN=` Subdomain used for displaying dashboards e.g. using `explore` as subdomain will
  allow accessing the dashboard `healthwellbeing` at `explore.whiteribbonalliance.local:3000/healthwellbeing`.

For the dashboard at `whatyoungpeoplewant`, also include the environment variables:

- `PMNCH=` True.
- `LEGACY_CAMPAIGNS_MAIN_SUBDOMAIN=` wypw.

For deployment to Google App Engine, create the file `dispatch.yaml`:

```yaml
dispatch:
  # Original What Women Want
  - url: "*whatwomenwant.whiteribbonalliance.org/*"
    service: dashboardfrontend

  # Midwives
  - url: "*midwivesvoices.whiteribbonalliance.org/*"
    service: dashboardfrontend

  # PMNCH
  - url: "*whatyoungpeoplewant.whiteribbonalliance.org/*"
    service: dashboardfrontend

  # All new clients which don't have their own subdomain
  - url: "*explore.whiteribbonalliance.org/*"
    service: dashboardfrontend

  # The admin dashboard
  - url: "*admin.whiteribbonalliance.org/*"
    service: admindashboard

  # The API
  - url: "*api.whiteribbonalliance.org/*"
    service: www-dashboard-api
```

Deploy dispatch:

```bash
gcloud app deploy dispatch.yaml
```

## License

MIT License.