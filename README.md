# HarmonieWeb

## Description

HarmonieWeb is a web application built for the Epitech Area project. It is a web application that allows users to connect their services together and to create automations between them. For example, you can create an automation that will send you a discord message when there is a new commit on your github repository.

This project is built with the following technologies:
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MariaDB](https://mariadb.org/)
- [Docker](https://www.docker.com/)

## Usage

The project is publicly available [here](https://area.mazettt.fr/). You can create an account and start using the application.

## Documentation

A documentation is available [here](https://github.com/RedBoardDev/epitech-area/wiki).

<!-- TODO -->

## Self-hosting

### Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### 1. Clone the repository

```bash
git clone git@github.com:RedBoardDev/epitech-area.git
cd epitech-area
```

### 2. Create the .env file

```bash
cp .env.example .env
```

Then edit the .env file and fill the variables with your own values.

### 3. Launch the application

```bash
docker compose up
```
