import { Router } from "express";
import { AuthController } from "../controllers/auth";

const router = Router();
const controller = new AuthController();

router.post("/api/signup", (req, res) => {
  controller.signup(req, res);
});

export default router;
