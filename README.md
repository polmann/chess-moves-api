# Valid Chess Moves API

This is an api that returns the valid moves of a chess piece given its position and the depth of play (number of steps). Currently there's only support for the knight piece, anyone is welcome to [contribute](/CONTRIBUTING.md).

## Installing

For instructions on how to install the api, please read the Getting Started section of the [Contributors Guide](/CONTRIBUTING.md).

## Using the API

Since currently there's only support for the knight piece, this is the only end point (depth is optional and it defaults to 1 step):
```
http://localhost:3000/chess/knight/:position/[:depth]
```
This is an example of return for that end point, using the default depth:
```
GET http://localhost:3000/chess/knight/D1

RETURN ["E3","C3","F2","B2"]
```
Another example, now specifying a depth:
```
GET http://localhost:3000/chess/knight/D1/2

RETURN ["A2","A4","B1","B5","C2","C4","D1","D3","D5","E2","E4","F1","F5","G2","G4","H1","H3"]
```

## Built With

* [Node](https://nodejs.org/en/about/) - The javascript runtime engine
* [Express](https://github.com/expressjs/express) - The web framework used as the base for the rest api

## Contributing

See the [Contributors Guide](/CONTRIBUTING.md)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
