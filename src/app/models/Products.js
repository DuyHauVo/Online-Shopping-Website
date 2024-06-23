class Products {
    constructor(_id, Name, Price, Description, Quantity, Img, List_Size, Color_Img, Current_Img, Current_Size, Current_Quantity) {
        this._id = _id;
        this.Name = Name;
        this.Price = Price;
        this.Description = Description;
        this.Quantity = Quantity
        this.Img = Img
        this.List_Size = List_Size
        this.Color_Img = Color_Img
        this.Current_Img = Current_Img
        this.Current_Size = Current_Size
        this.Current_Quantity = Current_Quantity
    }
    static async findAll_Products(db) {
        try {
            const result_products = await db.collection('Products').find({}).toArray();
            return result_products.map(product => new Products(product._id, product.Name, product.Price, product.Description, product.Quantity, product.Img, product.List_Size, product.Color_Img, product.Current_Img, product.Current_Size, product.Current_Quantity))
        } catch (err) {
            console.log(err);
            throw (err)
        }
    }
     async SaveAddProduct(db) {
        try {
           const result = await db.collection('Products').insertOne(this)
           return result
        } catch (error) {
            console.log(err);
            throw (err)
        }
    }
    async SaveUpdateProduct(db,id){
        try {
            const result_update= await db.collection('Products').updateOne({_id: id }, {
                $set: {
                    Name: this.Name,
                    Price: this.Price,
                    Description: this.Description,
                    Quantity : this.Quantity,
                    Img : this.Img,
                    List_Size : this.List_Size,
                    Color_Img : this.Color_Img,
                    Current_Img : this.Current_Img,
                    Current_Size : this.Current_Size,
                    Current_Quantity : this.Current_Quantity
                }
            })
            console.log(result_update);
            return result_update
        } catch (err) {
            console.log(err);
            throw err
        }
    }
}
export default Products