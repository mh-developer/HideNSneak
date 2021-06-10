# HideNSneak

[![Pipeline status](https://gitlab.com/mh-developer/hidensneak/badges/master/pipeline.svg)](https://gitlab.com/mh-developer/hidensneak/-/commits/master) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=ncloc)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=bugs)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=code_smells)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=coverage)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=alert_status)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=security_rating)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=sqale_index)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=mh-developer_hidensneak&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=mh-developer_hidensneak)

## Main idea

Our goal is create game for real world and give opportunity to fans of old game "Hide and Seek" to try themself in real world.

## Links

- https://hidensneak.web.app/
- https://hide-n-sneak-api.herokuapp.com/

Demo video:
- https://youtu.be/wJQgLktkWJA

## System architecture

In our app we used following technologies:
- Ionic (Angular + Cordova)
- Node.js (Express)
- Pusher
- MongoDB

At the end we were deployed our app on Firebase and Heroku.

![HideNSneak System architecture](./images/HideNSneak-system-architecture.png)

## Installation and running

So you need first clone this repo.

We separated app on backend part and frontend part.

On the backend you can locally run API with the following commands:

1. `cd HideNSneak.Api`
2. (Optional) you need setup .env file
3. `npm install`
4. `npm start`

On the frontend you can locally run UI with the following commands:

1. `cd HideNSneak.UI`
2. (optional) you need setup `./src/environments/evironment.ts`
3. `npm install`
4. `npm run ionic:add:android`
5. (optional) `npm run ionic:prepare:android`
6. `npm run ionic:run:android`

If you want to run app in browser, you can run `npm start` or `npm run dev`.

