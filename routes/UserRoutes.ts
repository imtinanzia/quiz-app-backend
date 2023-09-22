import express from 'express';
import { login, register, getAll, getAllCountries } from '../controllers/UserController';
import { isAuth } from '../middlewares/isAuth';
const router = express.Router();

router.route("/").get(getAll).post(login);
router.post("/register", register);
router.post("/login", login);
router.get("/countries",isAuth, getAllCountries);

export default router;