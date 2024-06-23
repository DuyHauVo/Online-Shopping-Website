import { ObjectId } from "mongodb";
import Request from "../models/Request.js";
import connection  from "../../config/db/index.js";
class RequestRouter{
    getAllReq(req,res){
        connection.connect().then(async (db) => {
            try {
                const result = await Request.FindAll_Request(db);
                console.log(result);
                if (result) res.status(200).send(result);
                else res.status(200).send('result not exits');
                return result
            } catch (err) {
                console.error(err);
            }
        })
    }
    getDetail(req,res){
        const { id } = req.params
        connection.connect().then(async (db) => {
            try {
                const result_detail = await Request.Detail_byID(db, new ObjectId(id))
                if (result_detail) res.status(201).send(result_detail)
                else res.status(401).send(error)
            return result_detail
            } catch (error) {
                console.log(error);
            }
        })
    }
    Add_Request(req,res){
        let { title,description,created_by,created_at,categories} = req.body
        console.log(title,description,created_by,created_at,categories);
        connection.connect().then(async (db) => {
            try {
                const isAddRequest = new Request(undefined,title,description,created_by,created_at,categories)
                const result = await isAddRequest.Create_Request(db)
                console.log(result)
                if (!result) return res.status(400).send('cannot found')
                    else return res.status(200).send('Ok')
                // return result
            } catch (error) {
                res.status(400).send('cannot found')
            }
        })
    }
    // Add_Request(req, res) {
    //     let { title,description,created_by,created_at,categories} = req.body
    //     console.log(title,subtitle,content,author,publish_date,categories );
    //     connection.connect().then(async (db) => {
    //         try {
    //             const isAddRequest = new Post(undefined,title,description,created_by,created_at,categories)
    //             const result = await isAddRequest.Create_Request(db)
    //             console.log(result);
    //             if (!result) return res.status(400).send('cannot found')
    //             else return res.status(200).send('Ok')
    //         } catch (error) {
    //             res.status(400).send('cannot found')
    //         }
    //     })
    // }
}
export default new RequestRouter