import express from "express";
import http from "http";
import pg from "pg";

const config = {
  host: "localhost",
  port: 5432,
  database: "hotel",
  user: "postgres",
  password: "admin",
};

const client = new pg.Pool(config);

export default client;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//room_id,name
app.get("/rooms/:id([0-9]+)", async (req, res) => {
  let { fields } = req.query;
  const { id } = req.params;

  if (!fields) fields = "*";
  else fields = fields.split(",").join(", ");
  const data = await client.query(
    `SELECT ${fields} FROM rooms WHERE room_id = ${id}`
  );
  res.json({ data: data.rows });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server listening"));
