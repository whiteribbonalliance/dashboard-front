# Dashboard

This project can display dashboards for campaigns defined in the back-end.

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

Fork this repository and add the required environment variables to `Repository secrets` in GitHub. Add optional
environment variables if needed. These variables will be loaded into `app.yaml`.

For deployment, it is also required to add the following environment variables to `Repository secrets`:

- `SERVICE_NAME=` The service name in App Engine.
- `GOOGLE_CREDENTIALS=` credentials.json file.
- `SERVICE_ACCOUNT=` The Google Cloud service account.
- `PROJECT_ID=` The Google Cloud project id.

Add/Modify `resources` in `app.yaml` as needed.

The GitHub action at `.github/workflows/prod-deploy-google-app-engine.yaml` will trigger a deployment to Google App
Engine on push or merge.

This script builds a Docker image and pushes to Google Container Registry and then deploys. In the future we may change
to a direct Dockerless deployment which would use `app.yaml`. No authentication is needed because authentication is
provided via the Google App Engine service account, whose credentials are stored in the GitHub
secret `GOOGLE_CREDENTIALS` (to change this, go to the GitHub web interface and got o Settings -> Secrets and
variables -> Actions. You will need to be an administrator on the GitHub repo to modify these credentials).

There is also a manual Google App Engine deployment file set up in `app.yaml`. You can deploy manually from the command
line using `gcloud app deploy app.yaml` (you must directly include the env variables in `app.yaml`). You need to install
Google Cloud CLI (Command Line Interface) and be authenticated on the Google Cloud Platform service account

## PMNCH - Azure deployment

Because of organization policies, the dashboard at `https://whatyoungpeoplewant.whiteribbonalliance.org` should be
deployed on `Azure` and make use of its services instead of `Google`. To solve this issue, two new repositories are
created, these repositories should always stay in sync with the original repositories.

For development locally regarding any of the campaigns, please work on the original repositories:

- Back-end: https://github.com/whiteribbonalliance/wwwdashboardapi
- Front-end: https://github.com/whiteribbonalliance/global_directory_dashboard

`PMNCH` Will use the following repositories for deployment:

- Back-end: https://github.com/pmnch/pmnch-dashboard-api
- Front-end: https://github.com/pmnch/pmnch-dashboard

These `PMNCH` repositories are exact copies of the original repositories, but they will be deployed on `Azure`.
When a change has been pushed to the original repositories, keep the `PMNCH` repositories in sync by pulling from
the original repository and pushing into the `PMNCH` repository.

#### Remotes

After cloning the `PMNCH` repositories locally, change the remote urls.

On the back-end repository:

```bash
git remote set-url origin https://github.com/whiteribbonalliance/wwwdashboardapi.git
git remote set-url --push origin https://github.com/pmnch/pmnch-dashboard-api.git
```

On the front-end repository:

```bash
git remote set-url origin https://github.com/whiteribbonalliance/global_directory_dashboard.git
git remote set-url --push origin https://github.com/pmnch/pmnch-dashboard.git
```

`git pull origin main` will pull from the original repository, and `git push origin main` will push into the repository
for `PMNCH`.

`git remote -v` to check the remotes.

#### Workflows

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

For development, on the local machine map `127.0.0.1` to the following domain names:

```text
127.0.0.1   explore.my-example-dashboards.local
```

Additional environment variables:

- `LEGACY_CAMPAIGNS_DEPLOYMENT=` True.
- `LEGACY_CAMPAIGNS_PROD_DOMAINS=` The domains allowed in production e.g. `.whiteribbonalliance.org`.
- `LEGACY_CAMPAIGNS_MAIN_SUBDOMAIN=` Subdomain used for displaying dashboards e.g. using `explore` as subdomain will
  allow accessing the dashboard `healthwellbeing` at `explore.whiteribbonalliance.local:3000/healthwellbeing`.

For the dashboard at `whatyoungpeoplewant`, also include the environment variables:

- `PMNCH=` True.
- `LEGACY_CAMPAIGNS_MAIN_SUBDOMAIN=` wypw.

## License

MIT License.