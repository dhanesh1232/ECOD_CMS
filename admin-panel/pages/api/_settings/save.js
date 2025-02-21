const { default: connectToDatabase } = require("../lib/mongodb");
const { default: ThemeSettings } = require("../models/themeSettings");

export default async function handler(req, res) {
  res.json({ message: "Hello ECOD" }).status(200);
}
