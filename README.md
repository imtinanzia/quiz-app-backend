## Default urls:

- Login User : POST METHOD <br/>
  localhost:5000/api/auth
- Register User : POST METHOD <br/>
  localhost:5000/api/auth/register
- Get All Users : GET METHOD <br/>
  localhost:5000/api/auth/
- Get All Countries : GET METHOD <br/>
  localhost:5000/api/auth/countries

## Usage

### Env Variables

Create a .env file in then root and add the following

```
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
listCountriesApi = url here...

```

## Install Dependencies

```
npm install

```

## Run App

```

# Run in dev mode

npm run server

