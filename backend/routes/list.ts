import { Router } from "express";
import listCtrl from "../controllers/list";

const router = Router();

router.get("/list", listCtrl.getAllList);

router.get("/list/:id", listCtrl.getOneItem);

router.post("/list", listCtrl.addTOList);

router.put("/list/:id", listCtrl.updateListItem);

router.delete("/list/:id", listCtrl.deleteListItem);

export default router;
