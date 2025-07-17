import { Router } from "express";
import { appUserLogin } from "../../controller/app/user.auth.controller";

const router = Router();

router.post("/login", appUserLogin);

export default router;
