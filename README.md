[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

# Importateurs SemApps pour les Jardiniers du Nous

Permet de synchroniser les données des Jardiniers du Nous (situés sur HumHub et YesWiki) avec une base de donnée 
sémantique SemApps. Ces importateurs sont configurés pour fonctionner avec une instance de [OrganiGraph](https://github.com/assemblee-virtuelle/organigraph).

## Usage

```
cd /organigraph/backend
git clone https://github.com/nouvel-air/jdn-importers.git importers
yarn add --exact @semapps/importer@0.4.0-alpha.43
yarn add moleculer-bull@0.2.8 emoji-dictionary@1.0.11 speakingurl@14.0.1
```

Add the HumHub token in your `.env.local` file:

```
SEMAPPS_HUMHUB_TOKEN=
```
