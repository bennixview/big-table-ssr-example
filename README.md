This is an example for a big sortable and filterable table
implemented in a regular web app way from the somewhere between today and the year 2000.

The main content is rendered in a simple SSR (server side rendered) approach
and is displayed as a regular MPA (Multi Page App) if you want it so.
(It just has one page, but trust me, it would be an MPA if more follow ^^)

**Demo:**: https://big-table-ssr-example.herokuapp.com/

### Prerequisites

To run this project you need a working nodejs working environment
in at least the last LTE version installed. So `npm`, `node`, `npx` are available.
Also this Readme references the use of `wget`, but you can also download the files
in any other fashion if you want to.

### Usage (locally)

Download the default data set. I used https://github.com/json-iterator/test-data/blob/master/large-file.json
to have a large enough set to play with.

```
cd big-table-ssr-example
npm install
npm run build
```

Start and prepare database

```
docker compose up database
cp .env.example .env # includes the connection strings for the DB
npm run db:seed:download
npm run db:migrate
npm run db:seed
```

Now you should be able to start the application

```
npm start
# (or npm run start:watch) if you want to adjust files, while playing around with the code.
```
