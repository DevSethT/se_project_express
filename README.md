## WTWR API (Back End)

REST API for the WTWR (What To Wear) application. Provides endpoints for managing users and clothing items, including liking/unliking items. Data is stored in MongoDB.

### Features

- Create and fetch users
- Create, fetch, and delete clothing items
- Like and unlike clothing items

### API Endpoints

**Users**

- `GET /users` — return all users
- `GET /users/:userId` — return a user by id
- `POST /users` — create a new user `{ name, avatar }`

**Items**

- `GET /items` — return all clothing items
- `POST /items` — create a new item `{ name, weather, imageUrl }`
- `DELETE /items/:itemId` — delete an item by id
- `PUT /items/:itemId/likes` — like an item
- `DELETE /items/:itemId/likes` — unlike an item

### Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- ESLint (Airbnb style guide)
- Nodemon (dev hot reload)
