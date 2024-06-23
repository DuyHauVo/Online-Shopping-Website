import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";
import Products from "../models/Products.js";

class Products_Controller {
    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Products.findAll_Products(db);
                // console.log(result);
                if (result) res.status(200).send(result);
                else res.status(200).send('result not exits');
            } catch (err) {
                console.error(err);
            }
        })
    }
    Add_Product(req, res) {
        let { Name, Price, Quantity, Description, Img, Color_Img, List_Size, Current_Img, Current_Size, Current_Quantity } = req.body
        List_Size = [
            {
                id: 1,
                value: 'M'
            },
            {
                id: 2,
                value: 'L'
            },
            {
                id: 3,
                value: 'S'
            },
            // {
            //     id: 4,
            //     value: 'XM'
            // },
            // {
            //     id: 5,
            //     value: 'XS'
            // },
        ]
        Color_Img = [
            {
                id: 1,
                img: 'https://file.hstatic.net/1000078439/file/1_dd59186256074bce8806a3e315b189d9.jpg',
                style: 'width: 20px; height: 20px; border-radius: 50%; background-color : red'
            },
            {
                id: 2,
                img: 'https://dongianladep.vn/wp-content/uploads/2023/10/ke-sach-treo-tuong-chu-nhat-KT171-3.jpg',
                style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : blue;'
            },
            {
                id: 3,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIrhGeYw4WIe-6KuUyhWGdQvPkAxaXI7gVg&s',
                style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : pink'
            },
            // {
            //     id: 4,
            //     img: 'https://homeoffice.com.vn/images/companies/1/SEO/%C3%9D%20t%C6%B0%E1%BB%9Fng/50%20m%E1%BA%ABu%20k%E1%BB%87%20s%C3%A1ch%20%C4%91%E1%BA%B9p/2.1.4.he-ke-sach-treo-tuong-bang-go-dep.jpg?1555123478769',
            //     style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : yellow'
            // },
            // {
            //     id: 5,
            //     img: 'https://fivo.vn/wp-content/uploads/2022/04/O1CN01S7MOP01tVuYx0VxEW_3231475908-505x400.jpg',
            //     style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : black'
            // }
        ]
        console.log(Name);
        connection.connect().then(async (db) => {
            try {
                const isAddProduct = new Products(undefined, Name, Number(Price), Description, Number(Quantity), Img, List_Size, Color_Img, Current_Img, Current_Size, Current_Quantity)
                const result = await isAddProduct.SaveAddProduct(db)
                console.log(result);
                if (!result) return res.status(400).send('cannot found')
                else return res.status(200).send('Ok')
            } catch (error) {
                res.status(400).send('cannot found')
            }
        })
    }
    Update_Product(req, res) {
        let { Name, Price, Quantity, Description, Img, Color_Img, List_Size, Current_Img, Current_Size, Current_Quantity, id } = req.body
        List_Size = [
            {
                id: 1,
                value: 'M'
            },
            {
                id: 2,
                value: 'L'
            },
            {
                id: 3,
                value: 'S'
            },
            // {
            //     id: 4,
            //     value: 'XM'
            // },
            // {
            //     id: 5,
            //     value: 'XS'
            // },
        ]
        Color_Img = [
            {
                id: 1,
                img: 'https://file.hstatic.net/1000078439/file/1_dd59186256074bce8806a3e315b189d9.jpg',
                style: 'width: 20px; height: 20px; border-radius: 50%; background-color : red'
            },
            {
                id: 2,
                img: 'https://dongianladep.vn/wp-content/uploads/2023/10/ke-sach-treo-tuong-chu-nhat-KT171-3.jpg',
                style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : blue;'
            },
            {
                id: 3,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIrhGeYw4WIe-6KuUyhWGdQvPkAxaXI7gVg&s',
                style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : pink'
            },
            // {
            //     id: 4,
            //     img: 'https://homeoffice.com.vn/images/companies/1/SEO/%C3%9D%20t%C6%B0%E1%BB%9Fng/50%20m%E1%BA%ABu%20k%E1%BB%87%20s%C3%A1ch%20%C4%91%E1%BA%B9p/2.1.4.he-ke-sach-treo-tuong-bang-go-dep.jpg?1555123478769',
            //     style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : yellow'
            // },
            // {
            //     id: 5,
            //     img: 'https://fivo.vn/wp-content/uploads/2022/04/O1CN01S7MOP01tVuYx0VxEW_3231475908-505x400.jpg',
            //     style: 'width: 20px; margin-left : 5px ; height: 20px; border-radius: 50% ;background-color : black'
            // }
        ]
        connection.connect().then(async (db) => {
            try {
                const isUpdateProduct = new Products(undefined, Name, Number(Price), Description, Number(Quantity), Img, List_Size, Color_Img, Current_Img, Current_Size, Current_Quantity)
                const result_update = await isUpdateProduct.SaveUpdateProduct(db, new ObjectId(id))
                if (!result_update) return res.status(400).send('cannot update')
                else return res.status(200).send('Ok')
            } catch (error) {
                console.log(error);
                throw (error)
            }
        })

    }
}
export default new Products_Controller()