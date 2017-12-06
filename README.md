# React.js boilerplate with Blockstack

This was based originally off this repo: [MERN-Boilerplate](https://github.com/keithweaver/MERN-boilerplate). 
It's a basic React.js app for a starting point. For more information about [Blockstack](https://blockstack.org/) and [Blockstack.js](https://github.com/blockstack/blockstack.js).

## Setup

```
npm install
```


## Running

```
npm run start:dev
```

It will be running at http://localhost:3000


## Docker

To build:
```
docker build -t blockstack/coinfort .
```

To run:
```
docker run -p 80:3000 blockstack/coinfort
```

