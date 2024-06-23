import express from "express"; 
import postController from "../app/controllers/PostController.js";
import Admin from "../app/helpers/Admin_author.js";
import User from "../app/helpers/User_author.js";
const router = express.Router(); 


router.post('/store', postController.store); //User,
router.get('/post_by_user',User, postController.post_by_users); 
router.get('/post_by_user/del_post_by_user/:id',User, postController.Del_post_by_users); 
router.get('/post_by_user/upd_post_by_user/:id',User, postController.Upd_post_by_users); 
router.post('/post_by_user/upd_post_by_user/handle_update',User, postController.Handle_update); 
// router.get('/post_by_user/upd_post_by_user/handle_update', postController.Handle_update);
router.get('/create', postController.create); //User,
router.get('/delete/:id',Admin, postController.delete);     
router.get('/:id', postController.detail); //User,
router.get('/', postController.index); 
export default router;