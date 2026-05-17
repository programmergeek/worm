import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

app.post(`/`, async (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`),
);
