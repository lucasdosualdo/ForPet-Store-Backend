import db from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
//schemas

export async function signUpUser(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signInUser(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}
