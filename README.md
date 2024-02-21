# Backend
## Prerequisites
- Move to the backend directory
```bash
cd back
```
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
- Run the tests
```bash
node ace test --watch
```

- Swagger available at http://localhost:3333/docs
- Project available at http://localhost:3333

# Frontend


## Prerequisites
### Move to the frontend directory
```bash
cd front
```
- Create a `.env` file with the following content inside the `front` directory:
`NEXT_PUBLIC_API_URL=http://localhost:3333`

## Install the dependencies
```bash
yarn install
```



## To run all the tests, run the following command:
```bash
 yarn run test
```