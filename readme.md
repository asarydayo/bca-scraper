Configure the .env accordingly.

# Dev

For development

1. `yarn` or `npm install`
2. `sequelize db:create --env=DEVELOPMENT`
3. `sequelize db:migrate --env=DEVELOPMENT`
4. `yarn dev` or `npm run dev`

# Production

For Production purposes

1. `sequelize db:create --env=PRODUCTION`
2. `sequelize db:migrate --env=PRODUCTION`
3. `yarn build` or `npm run build` to build the project
4. `yarn serve` to run the built project

# Test

Tests will always drop and recreate test database for testing

1. `yarn test`
