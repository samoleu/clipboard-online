## Description

Clipboard Online is a web application that allows users to quickly share text content between devices through a unique access code. Users can copy and paste text to a virtual clipboard accessible from any device, making it easy to transfer information without the need for accounts or complex setups. The project consists of a backend API and a frontend interface for seamless and secure clipboard sharing.

## Project Structure

```
clipboard-online
├── api
│   ├── src
│   ├── package.json
│   └── dockerfile
├── frontend
│   ├── src
│   ├── package.json
│   └── dockerfile
├── docker-compose.yml
├── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Running the Application

### Using Docker

To build and start all services (API, frontend, and MongoDB), run:

```bash
docker-compose up -d
```

- The **backend** will be available at [http://localhost:3000](http://localhost:3000)
- The **frontend** will be available at [http://localhost:5173](http://localhost:5173)

### Running Locally

You need a `.env` file with the required environment variables. Use `.env.example` as a reference.

To start only MongoDB locally using Docker Compose:

```bash
docker-compose up mongo -d
```

Then, in the project root, install all dependencies for both backend and frontend:

```bash
npm install
```

In separate terminals, start the backend and frontend:

**Start the backend:**

```bash
cd api
npm run start:dev
```

**Start the frontend:**

```bash
cd frontend
npm run dev
```

- The **backend** will be available at [http://localhost:3000](http://localhost:3000)
- The **frontend** will be available at [http://localhost:5173](http://localhost:5173)
