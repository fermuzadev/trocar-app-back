/**
 * Este archivo se creó para tener un lugar centralizando donde esté la
 * conexión a la base de datos. Este es el único lugar donde se debería
 * llamar a `mongoose.connect`.
 *
 * De forma arbitraria se lo nombró `db.js`.
 *
 * Los modelos deberán requerir a este archivo haciendo:
 * const { mongoose, Schema } = require("../db");
 *
 */

import mongoose from "mongoose";

const connectionString = process.env.DB_CONNECTION_STRING
console.log(connectionString);
if (!connectionString) {
  console.error("DB_CONNECTION_STRING is not defined in the environment variables.");
  process.exit(1);
}

mongoose.connect(connectionString);

export { mongoose };