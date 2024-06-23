import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";
import Auth from "../helpers/Auth.js";
let id_post
class PostController {

    // GET /posts
    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findAll(db);
                // if(req.cookies.value.role === 'Admin'){
                //     res.render('post/post', { posts: result });
                // }else if(req.cookies.value.role === 'user' || 'User'){
                //      res.redirect('/posts/post_by_user')
                // }
                if (result) res.status(200).send(result);
                else res.status(200).send('result not exits');
                return result
            } catch (err) {
                console.error(err)
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/:id
    detail(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findById(db, new ObjectId(req.params.id));
                // res.render('post/detail', { post: result });
                if (result) res.status(200).send(result);
                else res.status(200).send('result not exits');
                return result
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/create
    create(req, res) {
        res.render('post/create');
    }
    
    // POST /posts/store
    store(req, res) {
        // console.log(req.body);
        connection.connect().then(async (db) => {
            try {
                // const id_user = req.cookies.value._id
                let {undefined, title, subtitle, content, author, publish_date, categories } = req.body
                const post = new Post(undefined, title, subtitle, content, author, publish_date, categories);
                const result = await post.save(db);
                console.log(result);
                // res.redirect('/posts');
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }
    delete(req, res) {
        connection.connect()
            .then(async (db) => {
                try {
                    const result = await Post.remove(db, new ObjectId(req.params.id))
                    console.log(result);
                    res.redirect('/posts')
                } catch (err) {
                    console.log(err);
                } finally {
                    connection.close()
                }
            })
    }
    post_by_users(req, res) {
        connection.connect().then(async (db) => {
            // const id_user = await req.cookies.value._id
            const result_post_byId = await Post.show_byID(db, req.cookies.value._id)
            // console.log(result_post_byId);
            res.render('post/post_byUser', { posts_byIdUser: result_post_byId });
        })
    }
    Del_post_by_users(req, res) {
        //  res.send('delete')
        connection.connect().then(async (db) => {
            const delete_post_by_user = await Post.Delete_post_by_User(db, new ObjectId(req.params.id))
            console.log(delete_post_by_user);
            res.redirect('/posts/post_by_user')
            // res.status(302).redirect('post/post_byUser');
        })
    }
    Upd_post_by_users(req, res) {
        res.render('post/update')
        // console.log(req.params.id);
        id_post = req.params.id

    }
    Handle_update(req, res) {
        // console.log(id_post);
        connection.connect().then(async (db) => {
            const result_updatae = new Post(undefined, req.body.Up_title, req.body.Up_content, req.body.Up_author)
            if(id_post){
                const result_kq = await result_updatae.Update_Post(db, new ObjectId(id_post))

            }
            // console.log(result_kq);
            // res.redirect('/posts/post_by_user')
            res.redirect('/posts/post_by_user')
        })
    }   
}

export default new PostController();