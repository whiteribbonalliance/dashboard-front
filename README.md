# WRA Global Directory Dashboard

This project contains multiple dashboards for WRA. Each dashboard is made accessible by navigating to a specific
subdomain. `middleware.ts` is responsible for parsing the subdomain that is calling the app and rewrite the hostname
as a parameter of route `dashboards_use_subdomain` or `dashboards_use_path`.

The file at `app/dashboards_use_subdomain/[dashboard]/[lang]/page.tsx` will generate each dashboard page.

## Development

### Install

Configure .env.local.

- `PROD_DOMAINS_ALLOWED=` The domains allowed in production e.g. `.whiteribbonalliance.org`.
- `DEV_DOMAIN=` The domain used in development e.g. `.whiteribbonalliance.local`.
- `MAIN_SUBDOMAIN_FOR_DASHBOARDS_PATH_ACCESS=` The subdomain used for displaying dashboards using paths e.g. `explore`
  from `explore.whiteribbonalliance.org/healthwellbeing`.
- `ONLY_PMNCH=` `PMNCH` exclusive. Accepts `True` or `False`.
- `NEXT_PUBLIC_DASHBOARD_API_URL=` The url to the API.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS=` Google Analytics ID.

On the local machine, map `127.0.0.1` to the following domain names:

```text
127.0.0.1   explore.whiteribbonalliance.local
127.0.0.1   whatyoungpeoplewant.whiteribbonalliance.local
```

Then

```bash
npm install
```

### Run

```bash
npm run dev
```

On the local machine visit `http://explore.whiteribbonalliance.local:3000/en/whatwomenwant`.

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
4. Add new translations e.g. the title and subtext (check the back-end README).
5. Modify switch statements in components to reflect changes if necessary.

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