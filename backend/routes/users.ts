import { Router } from "express";
import userCtrl from "../controllers/users";
import isAuthenticated from "../middleware";

const router = Router();

router.get("/users", isAuthenticated, userCtrl.getUser);

router.post("/users/signup", userCtrl.addUser);

router.post("/users/signin", userCtrl.loginUser);

router.post("/users/logout", isAuthenticated, userCtrl.logout);

router.delete("/users", isAuthenticated, userCtrl.deleteUser);

export default router;
