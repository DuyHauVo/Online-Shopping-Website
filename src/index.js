import express from 'express';
import { engine } from 'express-handlebars'; // 1. import handlebars engine
import route from './routes/index.route.js';
import connection from './config/db/index.js'; // for testing
import Post from './app/models/Post.js'; // for testing
import cookieParser from 'cookie-parser'; // import cookie-parser to use req.cookies
import cors from 'cors'
const app = express();

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // use cookie-parser to read cookies
app.use(cors({
    origin : "http://localhost:4200",
    credentials : true
}))

app.engine('handlebars', engine(
    {
        // extname: '.ha' // config the extension name of the views
    }
)); // 2. register handlebars engine
app.set('view engine', 'handlebars'); // 3. set handlebars as the view engine
app.set('views', './src/resources/views'); // 4. set the views directory

// init routes
route(app);


app.listen(3000);