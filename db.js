import pg from "pg";

const config = {
  host: "",
  port: 5432,
  database: "",
  user: "",
  password: "",
};

const client = new pg.Client(config);

export default client;
