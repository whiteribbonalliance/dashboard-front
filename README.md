# Dashboard

This project can display dashboards for campaigns defined in the back-end.

## Environment variables

- `NEXT_PUBLIC_DASHBOARD_API_URL=` Required - The url to the API.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS=` Optional - Google Analytics ID.

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

The title and subtext are retrieved as part of translated texts based on the current language. Translations can be
generated in the back-end script, `title` and `subtext` should be added to `front_translations/to_translate.json` e.g.
to translate the `title` for campaign with code `example` include the key `"example-title": "Example title"` or for the
`subtext` include `"example-subtext": "Example subtext"`. Read the `Translations` section in the back-end `README.md`
for more information.

*Note: The above should be done even if translations is disabled, this is because with translations disabled, the
default language is English and the output of the translations function will contain only the language English which is
used in the front.*

## Other

### Favicon

To add a favicon to a dashboard, add `favicon.ico` to `public/dashboards/{DASHBOARD_PATH_NAME}`.

### Logo

To add a top left logo to a dashboard, add `logo.png` to `public/dashboards/{DASHBOARD_PATH_NAME}`.

## Deployment to Google App Engine

This repo has continuous deployment/continuous integration set up.

There is a GitHub action defined in `.github/workflows/default-google-app-engine.yml` which deploys to Google App Engine
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

For deployment of legacy campaigns.

Legacy campaigns are campaigns that were used to run this dashboard originally.

For development, on the local machine map `127.0.0.1` to the following domain names:

```text
127.0.0.1   explore.my-example-dashboards.local
```

Additional environment variables for legacy dashboards:

- `LEGACY_CAMPAIGNS=` True.
- `DEV_DOMAIN=` Optional - The domain used in development e.g. `.whiteribbonalliance.local`.
- `PROD_DOMAINS_ALLOWED=` The domains allowed in production e.g. `.whiteribbonalliance.org`.
- `MAIN_SUBDOMAIN=` Subdomain used for displaying dashboards e.g. using `explore` as subdomain will allow
  accessing the dashboard `healthwellbeing` at `explore.whiteribbonalliance.local:3000/healthwellbeing`.

For the dashboard at `whatyoungpeoplewant`, also include the environment variables:

- `PMNCH=` True.
- `MAIN_SUBDOMAIN=` Set to `wypw`.