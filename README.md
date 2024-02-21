# Backend
- Create a new `.env`by duplicating the `.env.example` file and renaming it to `.env`.
```bash
cp .env.example .env
```
- Fill in the `.env` file with the necessary information.
- Install the dependencies
```bash
yarn install
```
- Run the migrations (It's not necessary to run the migrations, cause it's already done, but if you want to run it again, you can do it by running the following command):
```bash
node ace migration:run
```
- Start the server
```bash
yarn run dev
```

# Frontend


## Prerequisites
- Create a `.env` file with the following content inside the `front` directory:
`NEXT_PUBLIC_API_URL=http://localhost:3333`

## Install the dependencies
```bash
yarn install
```

## Move to the frontend directory
```bash
cd front
```

## To run all the tests, run the following command:
```bash
 yarn run test
```