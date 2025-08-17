import { Router } from "express";
import listCtrl from "../controllers/list";
import isAuthenticated from "../middleware";

const router = Router();

router.get("/list", isAuthenticated, listCtrl.getAllList);

router.get("/list/:id", isAuthenticated, listCtrl.getOneItem);

router.post("/list", isAuthenticated, listCtrl.addTOList);

router.put("/list/:id", isAuthenticated, listCtrl.updateListItem);

router.delete("/list/:id", isAuthenticated, listCtrl.deleteListItem);

export default router;
