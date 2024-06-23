import User from "../models/User.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import Auth from "../helpers/Auth.js";
class AuthController {

    index(req, res) {
        res.render('user/login');
    }

    /* REGISTER
    ** path: /auth/resgister
    ** method: POST
    */
    registerForm(req, res) {
        res.render('user/register');
    }

    logout(req, res) {
        // Clear the cookie named "your-cookie-name"
        res.cookie('token');
        res.cookie('value');
        res.redirect('/');
    }

    async register(req, res) {
        // check if email is available
        // const email = req.body.email; 
        const { name, email, password } = req.body;
        const role = 'user' || 'User'
        if (!name || !email || !password) {
            return res
                .status(400)
                .send({ error: 'Vui Lòng Nhập đầy đủ thông tin' });
        }
        console.log(`Email: ${email}`);
        connection.connect().then(async (db) => {
            try {
                // check if email is already taken
                const result = await User.isAvailable(db, email);
                console.log(`Result: ${result}`);
                if (result) {
                    // console.log('Email is already taken');
                    return res.status(400).send({ error: 'Email is already taken' })
                } else {
                    // hashing password - saltRound = 10
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) {
                            console.error(`Error: ${err}`);
                        } else {
                            console.log(`Hash: ${hash}`);
                            // create new user
                            connection.connect().then(async (db) => {
                                console.log('Creating new user');
                                const user = new User(undefined, name, email, hash, role);
                                const savedata = user.save(db).then((result) => {
                                    // res.redirect('/auth');
                                    if (savedata) return res.status(200).send({ message: 'Register success' })
                                    console.log(`User created with ID: ${result.insertedId}`);
                                    // res.json(result);
                                });
                            });
                        }
                    });
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

    /* LOGIN
    ** path: /auth/login
    ** method: POST
    */
    async login(req, res) {
        const password = req.body.password;
        const email = req.body.email;
        console.log(email, password);
        connection.connect().then(async (db) => {
            try {
                const user = await User.findByEmail(db, email);
                // console.log(user);
                if (!user) {
                    return res.status(401).send({ auth: false, message: 'Tài khoản Không tồn tại' });
                }

                // console.log(typeof user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (result) {
                            // console.log(result);
                            // create token
                            const token = Auth.createJWTToken(email);
                            if (token) {
                                res.cookie('token', token, {
                                    httpOnly: true,
                                    secure: false, // false if not using https | true if using https
                                    sameSite: 'strict', // use 'strict', 'lax', or 'none'
                                    maxAge: 3600000, // expired time, should set to match token expiry (1h)
                                });
                                // console.log('Login successful');
                                // res.redirect('/posts');
                                res.json({ message: 'Login successful', token: token });
                            }
                        } else {
                            console.log('Login failed');
                            res.json({ message: 'Login failed' });
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        });
    }
    async list(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result_list = await User.list_user(db)
                // console.log(result_list);
                res.render('user/list_users', { List_user: result_list })
            } catch (err) {
                console.log(err);
            } finally {
                connection.close()
            }
        })
    }
    async list_delete(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result_list_user = await User.Check_user(db, new ObjectId(req.params.id))
                if (result_list_user[0].role === 'Admin') {
                    console.log('You cannot delete Admin');
                    setTimeout(() => {
                        res.send('You cannot delete Admin')
                    }, 1000)
                } else {
                    const result = await User.delete_user(db, new ObjectId(req.params.id))
                    console.log(result);
                    res.redirect('/auth/list')
                }

            } catch (err) {
                console.log(err);
            } finally {
                connection.close()
            }
        })
    }

}

export default new AuthController();