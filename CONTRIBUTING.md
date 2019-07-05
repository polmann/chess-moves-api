# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

The best way to contribute is to add support for other chess pieces, as currently the api only supports the knight piece. You can also contribute by reporting bugs and writing tests.


## Getting Started

You will need to clone the repository and then install the dependencies to start developing.

### Global dependencies

* [Node](https://nodejs.org) ([n](https://github.com/tj/n) recommended)
* [Yarn](https://yarnpkg.com) (recommended)

### Clone repository

```bash
# clone the repository on your local machine
git clone git@github.com:polmann/chess-moves-api.git

# step into local repo
cd chess-moves-api
```

### Install project dependencies

```bash
yarn
```


## Running

### To run the application on development you will just need to execute the dev script:

```bash
yarn dev
```

## Running the tests

Your changes will not be commited unless it passes the tests. We are approaching 100% coverage, so please feel free to help the project reach that goal.

You can run the tests by executing the following command:
```bash
yarn test
```
You can also run the coverage report with the command below:
```bash
yarn coverage
```

## Scripts available

* `yarn lint` : Check for possible mistakes in the code.
* `yarn dev` : Start the development server and restart on changes.
* `yarn test` : Run the unit and integration tests.
* `yarn dev:test` : Run the unit and integration tests restarting on changes.
* `yarn coverage` : Run the test coverage report.
* `yarn build` : Build Node compatible server to the `dist` folder.
* `yarn serve` : Start the server built into the `dist` folder.
* `yarn start` : `build && serve`.
