import { Router } from "express";

const router = new Router();
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";

// router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post("/", userController.store);
router.put("/", loginRequired, userController.update);
router.delete("/", loginRequired, userController.delete);

export default router;
