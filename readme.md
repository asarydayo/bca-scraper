Configure the .env accordingly.

# Dev

For development

1. `yarn` or `npm install`
2. skip step 3 and 4 if importing from `kurs_dev.sql`
3. `sequelize db:create --env=DEVELOPMENT`
4. `sequelize db:migrate --env=DEVELOPMENT`
5. `yarn dev` or `npm run dev`

# Production

For Production purposes

1. skip step 2 and 3 if importing from `kurs.sql`
2. `sequelize db:create --env=PRODUCTION`
3. `sequelize db:migrate --env=PRODUCTION`
4. `yarn build` or `npm run build` to build the project
5. `yarn serve` to run the built project

# Test

Tests will always drop and recreate test database for testing

1. `yarn test`
