# AngularRover

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.

## Development server

NodeJs 12 is needed to run the server in development mode;

1. Run `npm run start` for a dev server. 
2. Node will install dependencies on project's folder and will start the mars rover project.
3. Navigate to `http://localhost:4200/`.

Also you can run the tests with `npm run test`.

## Live demo
You can also see a [demo working](https://perlaweb.es/)

## Why this app exists

As a technical process demands: 

```
It´s needed a program to validate instructions that will be used by a new Rover in Mars. Each Rover are included in a square and can receive the next commands: Advance (A), Turn left (L), Turn Right (R). The program must validate that the Rover be included into the edges of the square and must indicate the final orientation.
The program will receive the dimensions of the square (width x height) and it assumes that the coordinate (0,0) is the bottom left corner. Additionally, will receive initial coordinates of the Rover and it’s initial orientation (N, S, E, W).
Also it will receive a set of commands like the next one; “AALAARALA”.  There is not fixed limit of number of input commands. It can be assumed that there is not obstacles into the square.
The program must validate that all the commands can be executed without be out of pre-defined initial limits and also must return True or False indicating if the commands are valid. Moreover, also must return the orientation and final coordinates of the Rover
As example: True, N, (4,5).

```
