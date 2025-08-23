import { Request, Response } from "express";
// import { ctrlWrapper } from "../helper";
import { ListItem, RequestUser } from "../types";
const pool = require("../lib/db.ts");
const { ctrlWrapper } = require("../helper");

const getAllList = async (req: Request, res: Response) => {
  const { id } = (req as unknown as RequestUser).user;
  const data = await pool.query(
    "SELECT * FROM shopping_list WHERE owner_id=$1 ORDER BY id ASC ",
    [id]
  );
  return res.status(200).json(data.rows);
};

const getOneItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = (req as unknown as RequestUser).user;
  const data = await pool.query(`SELECT * FROM shopping_list
      WHERE id=${id} AND owner_id=${userId}
      `);
  if (data.rows.length == 0) {
    return res.status(404).json({ message: "That item is not exist!" });
  }
  return res.status(200).json(data.rows[0]);
};

const addTOList = async (req: Request<{}, {}, ListItem>, res: Response) => {
  const { nameOfGood, description, store } = req.body;
  const { id } = (req as unknown as RequestUser).user;

  if (!nameOfGood || !store) {
    return res.status(400).json({ message: "Fill all necessary fields!" });
  }

  const data = await pool.query(
    `INSERT INTO shopping_list (good, description, store, owner_id) 
    VALUES($1, $2, $3, ${id}) RETURNING * `,
    [nameOfGood, description, store]
  );
  return res.status(201).json(data.rows[0]);
};

const updateListItem = async (
  req: Request<{ id: string }, {}, ListItem>,
  res: Response
) => {
  const { id } = req.params;
  const { id: userId } = (req as unknown as RequestUser).user;
  const { nameOfGood, description, store } = req.body;
  if (!nameOfGood || !store) {
    return res.status(400).json({ message: "Fill all necessary fields!" });
  }

  const data = await pool.query(
    `UPDATE shopping_list SET good = $1, description = $2, store = $3 WHERE id = ${id} AND owner_id=$4 RETURNING * `,
    [nameOfGood, description, store, userId]
  );
  return res.status(200).json(data.rows[0]);
};

const deleteListItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = (req as unknown as RequestUser).user;
  const data = await pool.query(
    `DELETE FROM shopping_list WHERE id=${id} AND owner_id=${userId} RETURNING *`
  );

  if (!data.rows[0]) {
    return res.status(404).json({ message: "That item is not exist!" });
  }

  return res.status(200).json(data.rows[0]);
};

export default {
  getAllList: ctrlWrapper(getAllList),
  getOneItem: ctrlWrapper(getOneItem),
  addTOList: ctrlWrapper(addTOList),
  updateListItem: ctrlWrapper(updateListItem),
  deleteListItem: ctrlWrapper(deleteListItem),
};
