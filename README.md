# MOM-KIOSK 👶

A community web app for new mothers: connect with other moms nearby,
give away used baby items, and organise events like playdates.

> Development Status: Personal project, actively in development.
> Frontend is functional with product(give-aways) Page and product details page working; the Node.js backend is currently being built.
> Right now, the Give Aways and Products are considered the same. But in future, there is a type included in every product which determines if it's a GiveAway or is sold for a price. 
## Features

- [x] Tabbed View of Products, Polls and Events 
- [x] Products Listed under Products tab
- [x] Product Details Page with Image Carousel on click on one Product
- [x] Polls and Events Tabs are just placeholders for now
- [ ] Event creation for playdates
- [ ] User accounts and authentication

## Tech Stack

| Layer    | Technology                          | Status      |
|----------|-------------------------------------|-------------|
| Frontend | React, TypeScript, Vite             | In progress |
| Backend  | Node.js, Express, TypeScript        | In progress |
| Database | planned: PostgreSQL or MongoDB      | Planned     |
| Testing  | planned: Vitest / Jest, Supertest   | Planned     |
| CI/CD    | GitHub Actions                      | Planned     |

## Project Structure

    mom-kiosk/
    ├── src/            # React frontend
    ├── public/         # Static assets
    ├── server/         # Node.js / Express REST API
    │   └── src/
    │       └── index.ts
    ├── vite.config.ts  # Includes /api proxy to the backend
    └── package.json

## REST API

Base URL (local): `http://localhost:3000/api`

| Method | Endpoint         | Description            | Status      |
|--------|------------------|------------------------|-------------|
| GET    | `/items`         | List all giveaway items | Done        |
| GET    | `/items/:id`     | Get one item            | In progress |
| POST   | `/items`         | Create a new item       | In progress |
| DELETE | `/items/:id`     | Delete an item          | In progress |

Responses use standard HTTP status codes (`201` Created, `204` No Content,
`400` Bad Request for invalid input, `404` Not Found).

## Getting Started

### Prerequisites
- Node.js 24.x and npm 11.x

### Run the backend

    cd server
    npm install
    npm run dev

The API runs on `http://localhost:3000`.

### Run the frontend

    npm install
    npm run dev

The app runs on `http://localhost:5173`. Requests to `/api` are proxied
to the backend via `vite.config.ts`.

## Roadmap

1. REST API for giveaway items (Express + TypeScript)
2. Persistent storage with a database
3. API tests and frontend tests
4. CI pipeline with GitHub Actions
5. Events and playdate organisation
6. Authentication

## Screenshots

http://localhost:3000/api/items 

<img width="797" height="569" alt="image" src="https://github.com/user-attachments/assets/bdb59ef2-5658-4755-9beb-5bd507a1201e" />

Products Listing

<img width="1438" height="900" alt="image" src="https://github.com/user-attachments/assets/7587b1a2-6ddb-45cb-b020-4ea12015f9dc" />

Products Details Listing

<img width="1438" height="900" alt="image" src="https://github.com/user-attachments/assets/3a17b68c-05fa-4fa0-9a8b-442322759f8c" />

