# Dashboard

This project contains multiple dashboards. Each dashboard is made accessible by navigating to a specific
subdomain or path. `middleware.ts` is responsible for parsing the subdomain or path that is calling the app and rewrite
the hostname as a parameter of route `dashboards_use_subdomain` or `dashboards_use_path`.

The file at `app/dashboards_use_subdomain/[dashboard]/[lang]/page.tsx` will generate the dashboards to be accessible
from the path.

The file at `app/dashboards_use_path/[lang]/[dashboard]/page.tsx` will generate the dashboards to be accessible from the
subdomain.

## Environment variables

- `PROD_DOMAINS_ALLOWED=` The domains allowed in production e.g. `.my-dashboards.org`.
- `DEV_DOMAIN=` The domain used in development e.g. `.my-dashboards.local`.
- `MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS=` The subdomain used for displaying dashboards using paths e.g.
  using `explore` will allow accessing the dashboard `healthwellbeing`
  at `explore.my-dashboards.org/healthwellbeing`.
- `NEXT_PUBLIC_DASHBOARD_API_URL=` The url to the API.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS=` Google Analytics ID.

## Install

Configure `.env.local.` with the environment variables.

On the local machine, map `127.0.0.1` to the following domain name:

```text
127.0.0.1   explore.my-dashboards.local
```

Then:

```bash
npm install
```

### Run

```bash
npm run dev
```

On the local machine visit `http://explore.dashboards.local:3000/en/healthwellbeing` to access the
dashboard `healthwellbeing`.

### Lint project

```bash
npm run lint
```

### Format project

```bash
npm run format
```

## Translations

If translations is enabled in the back-end, the `title` and `subtext` should be added
to `front_translations/to_translate.json` e.g. to translate the `title` for campaign with code `example` include the
key `"example-title": "Example title"` or for the `subtext` include `"example-subtext": "Example subtext"`. Then
run `python translate_front.py`. Once translations have been applied, a new folder called `languages` should have
been created inside `front_translations`. Copy the `languages` folder to this project at `src/app/i18n`.

Check `README.md` inside the back-end project for more details about translations.

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

## Environment variables

- `ONLY_PMNCH=` True.

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
docker build -t wra-dashboards .
```

Run container:

```bash
docker run -p 3000:3000 wra-dashboards
```