import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./model/Words";

const PORT = process.env.PORT || 2000;

const handleListening = () => {
  console.log(`Listening on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
