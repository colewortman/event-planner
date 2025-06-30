# eventp-api

# Quick Start

`npm install`
`node App.js`

You should be able to navigate the api in your browser with the different URLs
Here are the routing files: `routes/eventRoutes.js` `routes/userRoutes.js`
The routes are prefixed with api, so to get all events in your browser it will be `localhost:3000/api/events/`

# DB Setup

Install PostgreSQL and create a database with the name `eventp`
`https://www.postgresql.org/download/`

In the event-api/resources/ directory you will need to run the following to get your db up and running:
`db-create.sql`

Update the db.js config to your username and password for postgres that you set on install of postgres.

# API Setup

Run the following within the eventp-api directory:
`npm install`
`node App.js`

You may have to install additional packages:
`npm install express`
`npm install cors`
`npm install pg`