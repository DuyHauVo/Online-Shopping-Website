import connection from "../../config/db/index.js";
// import { result_kq } from "./User_author.js";
async function Check(req, res, next) {
    connection.connect().then(async (db) => {
        let result = await db.collection('users').find({}).toArray()
        let email = req.body.email
        let result_role = result.filter(find => find.email === email)
        console.log('result_role', result_role);
        if (result_role[0].role === 'Admin') {
            console.log();
            res.cookie('value', result_role)
            console.log('you have permisson access');
            setTimeout(() => {
                next()
            })
        } else {
            res.cookie('value', result_role)
            console.log('User');
            setTimeout(() => {
                next()
            })
        }
    })
}

export default Check;