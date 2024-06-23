import authRouter from './auth.route.js';
import postRouter from './post.route.js';
import siteRouter from './site.route.js';
import productRouter from './products.route.js'
import Auth from '../app/helpers/Auth.js';
import RequestRouter from './Request.route.js'

const route = (app) => {
    app.use('/auth', authRouter);
    // app.use('/posts', Auth.verifyJWTToken, postRouter); 
    app.use('/Request', RequestRouter);
    app.use('/posts', postRouter);
    app.use('/products', productRouter)
    app.use('/', siteRouter);
}

export default route;