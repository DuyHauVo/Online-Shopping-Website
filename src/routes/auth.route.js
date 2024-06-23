import express from "express";
import authController from "../app/controllers/AuthController.js";
import Check from "../app/helpers/Check_beetween.js";
import Admin from "../app/helpers/Admin_author.js";

const router = express.Router();


router.post('/register', authController.register); // localhost:3000/auth/register
router.post('/login', authController.login)//Check,; // localhost:3000/auth/login
router.get('/register', authController.registerForm);  // show register form
router.get('/logout', authController.logout);     // log out user
router.get('/list', Admin, authController.list);
router.get('/list/:id', Admin, authController.list_delete);
router.get('/', authController.index)
export default router;